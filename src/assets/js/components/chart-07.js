import ApexCharts from "apexcharts";

// ===== chartSeven
const chart07 = () => {
  const chartOneOptions = {
    series: [
      {
        name: "Received Amount",
        data: [0, 20, 35, 45, 35, 55, 65, 50, 65, 75, 60, 75],
      },
      {
        name: "Due Amount",
        data: [15, 9, 17, 32, 25, 68, 80, 68, 84, 94, 74, 62],
      },
    ],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3C50E0", "#C7D2E2"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        enabled: true,
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
      width: ["3.5", "3.5"],
    },

    markers: {
      size: 0,
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const chartSelector = document.querySelectorAll("#chartSeven");

  if (chartSelector.length) {
    const chartOne = new ApexCharts(
      document.querySelector("#chartSeven"),
      chartOneOptions
    );
    chartOne.render();
  }
};

export default chart07;
