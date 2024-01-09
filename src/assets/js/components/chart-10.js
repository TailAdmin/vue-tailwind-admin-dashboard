import ApexCharts from "apexcharts";

// ===== chartTen
const chart10 = () => {
  const chartFourOptions = {
    series: [
      {
        name: "Media",
        data: [268, 385, 201, 298, 187, 195, 291],
      },
      {
        name: "Photos",
        data: [345, 160, 291, 187, 195, 298, 201],
      },
      {
        name: "Docs",
        data: [195, 260, 191, 258, 265, 160, 213],
      },
    ],
    colors: ["#3C50E0", "#13C296", "#F2994A"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 318,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        endingShape: "rounded",
        borderRadius: 1,
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontSize: "16px",
      fontWeight: 500,
      offsetY: -5,

      markers: {
        radius: 99,
        width: 16,
        height: 16,
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

  const chartSelector = document.querySelectorAll("#chartTen");

  if (chartSelector.length) {
    const chartFour = new ApexCharts(
      document.querySelector("#chartTen"),
      chartFourOptions
    );
    chartFour.render();
  }
};

export default chart10;
