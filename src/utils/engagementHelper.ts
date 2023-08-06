import Highcharts from "highcharts";
import { Channel, MessageCount } from "../model/dataModel";
import dayjs from "dayjs";

export function engagementMessageOverTimeChartOptions(
  messageCountList: MessageCount[],
  channels: Channel[]
): Highcharts.Options {
  /**
   * @description
   * This function combines message counts &
   * channels from messageCountList and channels,
   * resulting in a filteredList that includes
   * valid message counts along with associated channels
   */
  const filteredList = messageCountList
    .map((messageCount) => {
      const matchingChannel = channels.find(
        (channel) => channel.id === messageCount.channelId
      );

      if (matchingChannel) {
        return {
          ...messageCount,
          channel: matchingChannel,
        };
      }

      return null;
    })
    .filter(Boolean);

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
    series: [
      {
        name: "General",
        type: "spline",
        data: filteredList.map((item: any) => {
          return {
            x: new Date(item.timeBucket),
            y: +item.count,
          };
        }) as any,
      },
    ],
  };
}
