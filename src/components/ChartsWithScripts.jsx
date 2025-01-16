import React, { useEffect } from "react";

const ChartsWithScripts = () => {
  useEffect(() => {
    // Dynamically load external scripts
    const loadScript = (src, async = true, defer = true) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.defer = defer;
      document.body.appendChild(script);
    };

    // Load GitHub buttons script
    loadScript("https://buttons.github.io/buttons.js");

    // Load Soft UI Dashboard script
    loadScript("../assets/js/soft-ui-dashboard.min.js?v=1.1.0");

    // Clean up scripts when component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[src*="buttons.github.io"], script[src*="soft-ui-dashboard.min.js"]');
      scripts.forEach((script) => script.remove());
    };
  }, []);

  return (
    <div>
      <div style={{ height: "400px" }}>
        <canvas id="chart-bars"></canvas>
      </div>
      <div style={{ height: "400px" }}>
        <canvas id="chart-line"></canvas>
      </div>
    </div>
  );
};

export default ChartsWithScripts;
