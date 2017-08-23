import React from 'react';

import leaderboardElementStyles from '../styles/leaderboard-element.scss';

const LeaderboardElement = (props) => {
  const { leaderboardDatum: { alltime, img, rank, recent, username }, sortedBy } = props;
  const shortUsername = username.length > 13
    ? username.substr(0, 10) + '...'
    : username;

  return (
    <tr className="leaderboard-element">
      <td className="align-middle">{rank}</td>
      <td className="text-left align-middle">
        <img className="rounded" width="50" height="50" src={img} />
        <a
          href={`https://www.freecodecamp.com/${username}`}
          title={`${username}'s FreeCodeCamp profile`}>
          <nobr className="hide-for-small-only">{username}</nobr>
          <nobr className="hide-for-medium">{shortUsername}</nobr>
        </a>
      </td>

      <td
        className={'align-middle ' + (sortedBy === 'dataRecent' ? '' : 'hide-for-small-only')}
      >{recent}</td>
      <td
        className={'align-middle ' + (sortedBy === 'dataAllTime' ? '' : 'hide-for-small-only')}
      >{alltime}</td>
    </tr>
  );
}

export default LeaderboardElement;
