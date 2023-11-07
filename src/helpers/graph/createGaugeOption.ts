export const createGaugeOption = (data: object[]) => {
  return {
    series: [
      {
        type: "gauge",
        center: ["50%", "65%"],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 6,
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 10,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: -20,
          color: "#999",
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 60,
          fontWeight: "bolder",
          formatter: "{value} %",
          color: "inherit",
        },
        data,
      },
    ],
  };
};
