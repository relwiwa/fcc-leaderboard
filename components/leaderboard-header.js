import React from 'react';

const LeaderboardHeader = (props) => {
  const { sortedBy } = props;

  return (
    <thead className="leaderboard-header">
      <tr>
        <th className="text-center" width="10%">Rank</th>
        <th className="text-left">Camper</th>
        <th
          className={'text-center ' + (sortedBy === 'dataRecent' ? '' : 'hide-for-small-only')}
          width="15%">Last Month</th>
        <th
          className={'text-center ' + (sortedBy === 'dataAllTime' ? '' : 'hide-for-small-only')}
          width="15%">All time</th>
      </tr>
    </thead>
  );
};

export default LeaderboardHeader;
