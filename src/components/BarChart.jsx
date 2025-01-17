import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { fetchActiveUsers } from "../api/userApi";

const BarChart = ({ canvasRef }) => {
  const [activeUsers, setActiveUsers] = useState([]);

  const salesData = activeUsers.map((user) => user.age * 10).slice(0, 9);

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
      chartInstance = new Chart(ctx, {
        type: "bar",
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
              label: "Sales",
              tension: 0.4,
              borderWidth: 0,
              borderRadius: 4,
              borderSkipped: false,
              backgroundColor: "#fff",
              data: salesData,
              //  data: 450, 200, 100, 220, 500, 100, 400, 230, 500],
              maxBarThikness: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 15,
                font: {
                  size: 14,
                  family: "Inter",
                  style: "normal",
                  lineHeight: 2,
                },
                color: "#fff",
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
              },
              ticks: { display: false },
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
  }, [canvasRef, salesData]);

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <canvas ref={canvasRef} width="400" height="170"></canvas>
    </div>
  );
};

export default BarChart;
