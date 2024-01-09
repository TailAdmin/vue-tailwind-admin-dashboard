import ApexCharts from "apexcharts";

// ===== chartNine
const chart09 = () => {
  const chartFourOptions = {
    series: [
      {
        data: [268, 385, 201, 298, 187, 195, 291],
      },
      {
        data: [345, 160, 291, 187, 195, 298, 201],
      },
    ],
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",

      markers: {
        radius: 99,
      },
    },
    yaxis: {
      title: false,
    },
    grid: {
      strokeDashArray: 7,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartNine");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartNine"),
      chartFourOptions
    );
    chartFour.render();
  }
};

export default chart09;
