import React, { useRef, useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';


const colors = ['#CBC3E3', '#CBC3E3', '#CBC3E3', '#CBC3E3', '#CBC3E3',
    '#CBC3E3', '#CBC3E3', '#CBC3E3', '#CBC3E3', '#CBC3E3'];




export default class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                data: props.prediction
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    }
                },
                colors: colors,
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                legend: {
                    show: false
                },
                xaxis: {
                    categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                    labels: {
                        style: {
                            colors: colors,
                            fontSize: '25px'
                        }
                    }
                },
                yaxis: {
                    min: 0,
                    max: 1,
                    tickAmount: 10,
                    labels: {
                        formatter: function (value) {
                            return value.toFixed(1); // format to 1 decimal place
                        },
                        style: {
                            fontSize: '12px'
                        }
                    }
                }
            },
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.prediction !== this.props.prediction) {
            this.setState({
                series: [{
                    data: this.props.prediction
                }]
            });
        }
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

// The following lines are not needed if you're using this component inside another React component
// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);