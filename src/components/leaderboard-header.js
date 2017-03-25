import React from 'react';

const LeaderboardHeader = (props) => {
  return (
    <thead className="leaderboard-header">
      <tr>
        <th className="text-center" width="10%">Rank</th>
        <th className="text-left">Camper</th>
        <th className="text-center" width="15%">Last Month</th>
        <th className="text-center" width="15%">All time</th>
      </tr>
    </thead>
  );
};

export default LeaderboardHeader;
