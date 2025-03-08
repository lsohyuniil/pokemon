import React from 'react';
import "./css/PokemonStatsBar.css"

const calculateStatPercentages = (stats) => {
    const totalStats = Object.values(stats).reduce((acc, stat) => acc + stat, 0);
    const percentages = {};

    for (let stat in stats) {
      percentages[stat] = (stats[stat] / totalStats) * 100;
    }

    return { percentages, totalStats };
};

const PokemonStatsBar = ({ stats }) => {
    const { percentages, totalStats } = calculateStatPercentages(stats);

    return (
        <div>
            {Object.keys(percentages).map((stat) => (
                <div className='percentages-list' key={stat}>
                    <strong className='stat-name'>{stat}</strong>
                    <div className='bar-default'>
                        <span className='stat-value'>{stats[stat]}</span>
                        <div className='stat-percentage' style={{ width: `${percentages[stat]}%` }}/>
                    </div>
                </div>
            ))}
            <div className='total-stats'><strong>종합 스탯 {totalStats}</strong></div>
        </div>
    );
};

export default PokemonStatsBar;
