import React from 'react';

import leaderboardElementStyles from '../styles/leaderboard-element.scss';

const LeaderboardElement = (props) => {
  const { alltime, img, rank, recent, username } = props.leaderboardDatum;

  return (
    <tr className="leaderboard-element">
      <td className="align-middle">{rank}</td>
      <td className="text-left align-middle">
        <img className="rounded" width="50" height="50" src={img} />
        <a
          href={`https://www.freecodecamp.com/${username}`}
          title={`${username}'s FreeCodeCamp profile`}>
          <nobr>{username}</nobr>
        </a>
      </td>
      <td className="align-middle">{recent}</td>
      <td className="align-middle">{alltime}</td>
    </tr>
  );
}

export default LeaderboardElement;
