import React,{useState} from "react";
import ReactApexChart from "react-apexcharts";

//import { lineChartData, lineChartOptions } from "variables/charts";

const LineChart = (props) =>{
  
  const {chartData,chartOptions,key} = props


  return (
    <ReactApexChart
        key={key}
        options={chartOptions}
        series={chartData}
        type="area"
        width="100%"
        height="100%"
    />
  )
  
}

export default LineChart;


/*class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: props.chartData || [],
      chartOptions: props.chartOptions || {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData || prevProps.chartOptions !== this.props.chartOptions) {
      this.setState({
        chartData: this.props.chartData,
        chartOptions: this.props.chartOptions,
      });
    }
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type="area"
        width="100%"
        height="100%"
      />
    );
  }
}

export default LineChart;*/
