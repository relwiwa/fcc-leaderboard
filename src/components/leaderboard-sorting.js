import React from 'react';

const LeaderboardSorting = (props) => {
  const { onClick, sortedBy } = props;

  const handleChangeSortedBy = (event, criterium) => {
    event.preventDefault();
    if (sortedBy !== criterium) {
      props.onClick(criterium);
    }
  }

  return (
    <div className="leaderboard-sorting my-4">
      <ul className="nav nav-pills justify-content-end">
        <li className="nav-item">
          <a
            className={'nav-link' + (sortedBy === 'recent' ? ' active' : '')}
            href="#"
            onClick={(event) => handleChangeSortedBy(event, 'recent')}
          >
            Last Month
          </a>
        </li>
        <li className="nav-item">
          <a
            className={'nav-link' + (sortedBy === 'alltime' ? ' active' : '')}
            href="#"
            onClick={(event) => handleChangeSortedBy(event, 'alltime')}
          >
            All-Time
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LeaderboardSorting;