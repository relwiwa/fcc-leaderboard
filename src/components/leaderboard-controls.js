import React from 'react';

import LeaderboardPagination from './leaderboard-pagination';
import LeaderboardSorting from './leaderboard-sorting';

const LeaderboardControls = (props) => {
  const { currentPage, onChangePage, onChangeSortedBy, numPages, placement, sortedBy } = props;

  return (
    <div className="leaderboard-controls row">
      {placement === 'top' && (
        <div className="col-12 col-md-4 my-3 my-md-0 flex-md-last">
          <LeaderboardSorting
            sortedBy={sortedBy}
            onChangeSortedBy={onChangeSortedBy}
          />
        </div>
      )}
      <div className="col-12 col-md-8 flex-md-first">
        <LeaderboardPagination
          currentPage={currentPage}
          numPages={numPages}
          onChangePage={onChangePage}
        />
      </div>
      {placement === 'bottom' && (
        <div className="col-12 col-md-4 my-3 my-md-0">
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
