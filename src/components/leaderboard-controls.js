import React from 'react';

import LeaderboardPagination from './leaderboard-pagination';
import LeaderboardSorting from './leaderboard-sorting';

import '../styles/leaderboard-controls.scss';

const LeaderboardControls = (props) => {
  const { currentPage, onChangePage, onChangeSortedBy, numPages, placement, sortedBy } = props;

  return (
    <div className="leaderboard-controls row align-middle collapse">
      {placement === 'top' && (
        <div className="column small-12 medium-4 small-order-1 medium-order-2 text-center medium-text-right">
          <LeaderboardSorting
            sortedBy={sortedBy}
            onChangeSortedBy={onChangeSortedBy}
          />
        </div>
      )}
      <div className="pagination-container column small-12 medium-8 small-order-2 medium-order-1 text-center medium-text-right">
        <LeaderboardPagination
          currentPage={currentPage}
          numPages={numPages}
          onChangePage={onChangePage}
        />
      </div>
      {placement === 'bottom' && (
        <div className="column small-12 medium-4 small-order-2 medium-order-1 text-center medium-text-right">
          <LeaderboardSorting
            sortedBy={sortedBy}
            onChangeSortedBy={onChangeSortedBy}
          />
        </div>
      )}
    </div>
  );
}

export default LeaderboardControls;
