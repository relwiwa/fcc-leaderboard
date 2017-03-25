import React from 'react';

const LeaderboardSorting = (props) => {
  const { onChangeSortedBy, sortedBy } = props;

  const onClick = (event, criterium) => {
    event.preventDefault();
    if (sortedBy !== criterium) {
      onChangeSortedBy(criterium);
    }
  }

  const renderSortedByItem = (criterium, title) => {
    return (
      <li className="nav-item">
        <a
          className={'nav-link' + (criterium === sortedBy ? ' active' : '')}
          href="#"
          onClick={(event) => onClick(event, criterium)}
        >
          {title}
        </a>
      </li>
    );
  }

  return (
    <div
      className="leaderboard-sorting"
      role="navigation"
      aria-label="Leaderboard Sorting: Show Top 100 Of Last Month Or Of All-Time"
    >
      <ul className="nav nav-pills justify-content-center justify-content-md-end">
        {renderSortedByItem('dataRecent', 'Last Month')}
        {renderSortedByItem('dataAllTime', 'All-Time')}
      </ul>
    </div>
  );
}

export default LeaderboardSorting;