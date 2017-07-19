import React from 'react';

import '../styles/leaderboard-container.scss';

import LeaderboardElement from './leaderboard-element';
import LeaderboardHeader from './leaderboard-header';

const LeaderboardContainer = (props) => {
  const { sortedBy, leaderboardData } = props;
  
  const renderLeaderboard = () => {
    if (leaderboardData === null) {
      return (
        <div className="text-center">Getting leaderboard data...</div>
      )
    }
    else if (leaderboardData.length === 0) {
      return (
        <div className="text-center">No leaderboard data available</div>
      )
    }

    return (
      <table className="leaderboard-container text-center">
        <LeaderboardHeader />
          <tbody>
            {leaderboardData.map((datum) => (
              <LeaderboardElement
                key={datum.username}
                leaderboardDatum={datum} />
            ))}
          </tbody>
      </table>
    );
  }


  return (
    <div className="leaderboard-component">
      {renderLeaderboard()}
    </div>
  )
};

export default LeaderboardContainer;
