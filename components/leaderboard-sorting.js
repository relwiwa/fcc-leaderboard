import React from 'react';

import '../styles/leaderboard-sorting.scss';

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
      <a
        href="#"
        className={'button ' + (criterium === sortedBy ? '' : 'clear')}
        onClick={(event) => onClick(event, criterium)}
      >
        {title}
      </a>
    );
  }

  return (
    <div
      className="leaderboard-sorting"
      role="navigation"
      aria-label="Leaderboard Sorting: Show Top 100 Of Last Month Or Of All-Time"
    >
      {renderSortedByItem('dataRecent', 'Last Month')}
      {renderSortedByItem('dataAllTime', 'All-Time')}
    </div>
  );
}

export default LeaderboardSorting;
