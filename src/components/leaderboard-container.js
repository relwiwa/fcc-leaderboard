import React from 'react';

import LeaderboardElement from './leaderboard-element';
import LeaderboardHeader from './leaderboard-header';

const LeaderboardContainer = (props) => {
  const { sortedBy, leaderboardData } = props;

  return (
    <div className="leaderboard-component">
      <table className="table table-bordered table-striped table-sm text-center">
        <LeaderboardHeader />
        <tbody>
          {leaderboardData.map((datum) => (
            <LeaderboardElement
              key={datum.username}
              leaderboardDatum={datum} />
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default LeaderboardContainer;
