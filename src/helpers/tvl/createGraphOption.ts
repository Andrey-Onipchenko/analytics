export const createGraphOption = (labes: any, values: any) => {
  return {
    title: {
      textStyle: {
        color: "red",
      },
      text: "Total Value Locked ($)",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labes,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: values,
        type: "line",
        areaStyle: {},
      },
    ],
  };
};
