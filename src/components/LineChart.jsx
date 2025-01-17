import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { fetchActiveUsers } from "../api/userApi";

const LineChart = ({ canvasRef }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  const mobileData = activeUsers.map((user) => user.age + Math.random()* 30).slice(0, 9);
  const websiteData = activeUsers.map((user) => user.weight).slice(0, 9);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchActiveUsers();
        setActiveUsers(usersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    let chartInstance = null;

    if (ctx) {
      const gradientStroke1 = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke1.addColorStop(1, "rgba(203,12,159,0.2)");
      gradientStroke1.addColorStop(0.2, "rgba(72,72,176,0.0)");
      gradientStroke1.addColorStop(0, "rgba(203,12,159,0)");

      const gradientStroke2 = ctx.createLinearGradient(0, 230, 0, 50);
      gradientStroke2.addColorStop(1, "rgba(20,23,39,0.2)");
      gradientStroke2.addColorStop(0.2, "rgba(72,72,176,0.0)");
      gradientStroke2.addColorStop(0, "rgba(20,23,39,0)");

      chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Mobile apps",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#cb0c9f",
              borderWidth: 3,
              backgroundColor: gradientStroke1,
              fill: true,
              data: mobileData,
              maxBarThickness: 6,
            },
            {
              label: "Websites",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#3A416F",
              borderWidth: 3,
              backgroundColor: gradientStroke2,
              fill: true,
              data: websiteData,
              maxBarThickness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#b2b9bf",
                font: {
                  size: 11,
                  family: "Inter",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#b2b9bf",
                padding: 20,
                font: {
                  size: 11,
                  family: "Inter",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [canvasRef, mobileData, websiteData]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <canvas ref={canvasRef} id="chart-line"></canvas>
    </div>
  );
};

export default LineChart;
