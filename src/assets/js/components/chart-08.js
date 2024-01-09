import ApexCharts from "apexcharts";

// ===== chartEight
const chart08 = () => {
  const chartThreeOptions = {
    series: [70, 20, 10],
    chart: {
      type: "donut",
      width: 380,
    },
    colors: ["#0FADCF", "#80CAEE", "#3C50E0"],
    labels: ["Desktop", "Tablet", "Mobile"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
          },
        },
      },
    ],
  };

  const chartSelector = document.querySelectorAll("#chartEight");

  if (chartSelector.length) {
    const chartThree = new ApexCharts(
      document.querySelector("#chartEight"),
      chartThreeOptions
    );
    chartThree.render();
  }
};

export default chart08;
