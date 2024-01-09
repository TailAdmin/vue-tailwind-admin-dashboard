import ApexCharts from "apexcharts";

// ===== chartSix
const chart06 = () => {
  const chartOneOptions = {
    series: [
      {
        name: "Product One",
        data: [168, 285, 131, 248, 187, 295, 191, 269, 201, 185, 252, 151],
      },

      {
        name: "Product Two",
        data: [268, 185, 251, 198, 287, 205, 281, 199, 259, 185, 150, 111],
      },
    ],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#13C296", "#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 200,
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
      width: [2, 2],
      curve: "smooth",
    },

    markers: {
      size: 0,
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
      strokeDashArray: 7,
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

  const chartSelector = document.querySelectorAll("#chartSix");

  if (chartSelector.length) {
    const chartOne = new ApexCharts(
      document.querySelector("#chartSix"),
      chartOneOptions
    );
    chartOne.render();
  }
};

export default chart06;
