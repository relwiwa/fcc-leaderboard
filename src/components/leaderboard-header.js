import React from 'react';

const LeaderboardHeader = (props) => {
  return (
    <thead className="leaderboard-header">
      <tr>
        <th className="text-center">Rank</th>
        <th className="text-left">Camper</th>
        <th className="text-center">Last Month</th>
        <th className="text-center">All time</th>
      </tr>
    </thead>
  );
};

export default LeaderboardHeader;
