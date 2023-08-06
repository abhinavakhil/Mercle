import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as engagementHelper from "../utils/engagementHelper";
import { messageCountList, channels } from "../data";

const EngagementMessagesOverTime: React.FC = () => {
  /**
   * @description
   * Generating Highcharts chart configuration options
   * for displaying engagement message counts over time using the provided data
   */
  const options: Highcharts.Options | undefined =
    engagementHelper.engagementMessageOverTimeChartOptions(
      messageCountList,
      channels
    );

  /**
   * @description
   * Rendering a Highcharts chart
   */
  return options ? (
    <HighchartsReact highcharts={Highcharts} options={options} />
  ) : null;
};

export default EngagementMessagesOverTime;
