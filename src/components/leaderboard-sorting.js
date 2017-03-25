import React from 'react';

const LeaderboardSorting = (props) => {
  const { onChangeSortedBy, sortedBy } = props;

  const onClick = (event, criterium) => {
    event.preventDefault();
    if (sortedBy !== criterium) {
      onChangeSortedBy(criterium);
    }
  }

  return (
    <div className="leaderboard-sorting">
      <ul className="nav nav-pills justify-content-center justify-content-md-end">
        <li className="nav-item">
          <a
            className={'nav-link' + (sortedBy === 'recent' ? ' active' : '')}
            href="#"
            onClick={(event) => onClick(event, 'recent')}
          >
            Last Month
          </a>
        </li>
        <li className="nav-item">
          <a
            className={'nav-link' + (sortedBy === 'alltime' ? ' active' : '')}
            href="#"
            onClick={(event) => onClick(event, 'alltime')}
          >
            All-Time
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LeaderboardSorting;