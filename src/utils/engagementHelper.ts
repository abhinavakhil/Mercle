import Highcharts from "highcharts";
import { Channel, MessageCount } from "../model/dataModel";
import dayjs from "dayjs";

export function engagementMessageOverTimeChartOptions(
  messageCountList: MessageCount[],
  channels: Channel[]
): Highcharts.Options {
  /**
   * @description
   * Grouping messages by their channel and creating a list
   * where each channel has an array of its associated messages.
   */
  const messagesList = messageCountList.reduce(
    (acc: any, message: any): any => {
      const channelId = message.channelId;

      if (!acc[channelId]) {
        acc[channelId] = [];
      }

      acc[channelId].push(message);
      return acc;
    },
    {}
  );

  /**
   * @description
   * Filtering and selecting channels from a list
   * where the channels have more than one associated message.
   */
  const filterChannels = channels.filter(
    (channel: Channel) => messagesList[channel?.id]?.length > 1
  );

  /**
   * @description
   * Preparing data for creating a chart series, where each series
   * represents a channel and contains a list of points (x, y) for
   * displaying message counts over time.
   */
  const seriesData = filterChannels.map((channel) => {
    const channelId = channel?.id;
    const chartData = messagesList[channelId].map((item: any) => {
      console.log(item);
      return {
        x: new Date(item.timeBucket),
        y: parseInt(item.count),
      };
    });

    console.log(chartData);

    return {
      name: channel?.name,
      data: chartData,
    };
  });

  /**
   * @description
   * Configuring Highcharts spline chart
   */
  return {
    chart: {
      type: "spline",
      backgroundColor: "#22222c",
      style: {
        fontFamily: "monospace",
      },
    },
    title: {
      text: "Engagement Messages Over Time",
      style: { color: "white", fontSize: "16px" },
    },
    xAxis: {
      crosshair: true,
      type: "datetime",
      alignTicks: true,
      labels: {
        formatter: function () {
          return dayjs(this.value).format("MMM DD");
        },
        style: {
          color: "#5d636d",
        },
      },
      tickColor: "#5d636d",
      lineColor: "#5d636d",
    },
    yAxis: {
      gridLineWidth: 0,
      labels: {
        style: {
          color: "#5d636d",
        },
      },
      title: {
        text: "Message Count",
        style: { color: "white" },
      },
      tickColor: "#5d636d",
      lineColor: "#5d636d",
      tickWidth: 1,
    },
    plotOptions: {
      series: {
        color: "#008f8d",
      },
    },
    tooltip: {
      backgroundColor: "#0c0c0f",
      borderColor: "#008f8d",
      borderRadius: 4,
      borderWidth: 1,
      style: { color: "white" },
      formatter: function () {
        return `<strong>${this.series.name.toLowerCase()}</strong><br />${
          this.y
        } messages on ${dayjs(this.x).format("MMM DD")}`;
      },
    },
    legend: {
      itemStyle: {
        color: "white",
        cursor: "pointer",
        fontSize: "0.75em",
        fontWeight: "bold",
        textOverflow: "ellipsis",
      },
      itemHoverStyle: {
        color: "white",
      },
    },
    series: seriesData as any,
  };
}
