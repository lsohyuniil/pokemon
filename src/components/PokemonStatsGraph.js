import React from "react";
import ApexCharts from "react-apexcharts";
import "./css/PokemonStatsGraph.css"

const PokemonStatsGraph = ({stats}) => {
    const statNames = Object.keys(stats);
    const statValues = Object.values(stats);
    const totalStats = statValues.reduce((acc, stat) => acc + stat, 0);

    const chartOptions = {
        chart: {
            type: "donut",
            fontFamily: "../../fonts/Galmuri9.ttf",
        },
        legend: {
            show: true,
            position: "bottom",
        },
        labels: statNames,
        fill: {
            opacity: 1,
            colors: ["#ff5959", "#f5ac78", "#fae078", "#9db7f5", "#a7db8d", "#fa92b2"]
        },
        tooltip: {
            enabled: true,
            y: {
            formatter: function (val) {
                return `${val}점`;
            },
            },
        },
        stroke: {
            show: false,
        },
    };

    return (
        <div className="chart-container">
            <ApexCharts options={chartOptions} series={statValues} type="donut" width="350" height="350" />
            <div className="total-stats">
                최종 스탯 
                <div className="total-stats-value">{totalStats}</div>
            </div>
        </div>
    );
};

export default PokemonStatsGraph;
