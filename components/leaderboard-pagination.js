import React from 'react';

import '../styles/leaderboard-pagination.scss';

const LeaderboardPagination = (props) => {
  const { currentPage, numPages, onChangePage } = props;

  const handleChangePage = (event, page) => {
    event.preventDefault();
    onChangePage(page);
  };

  const renderPaginationItems = (amount) => {
    let items = [];
    for (let i = 1; i <= amount; i++) {
      if (currentPage === i) {
        items.push(
          <li key={i} className="current">
            <span className="show-for-sr">You're on page</span> {i}
          </li> 
        );
      }
      else {
        items.push(
          <li key={i}>
            <a
              href="#"
              aria-label={'Page ' + i}
              onClick={(event) => handleChangePage(event, i)}
            >
              {i}
            </a>
          </li> 
        );
      }
    }
    return items;
  };

  const renderPaginationNext = () => {
    if (currentPage === numPages) {
      return (
        <li
          className="pagination-next disabled"
        >
          Next <span className="show-for-sr">page</span>
        </li>
      );
    }
    else {
      return (
        <li
          className="pagination-next"
        >
          <a
            href="#"
            aria-label="Next page"
            onClick={(event) => handleChangePage(event, currentPage + 1)}
          >Next <span className="show-for-sr">page</span>
          </a>
        </li>
      );
    }
  }

  const renderPaginationPrevious = () => {
    if (currentPage === 1) {
      return (
        <li
          className="pagination-previous disabled"
        >
          Previous <span className="show-for-sr">page</span>
        </li>
      );
    }
    else {
      return (
        <li
          className="pagination-previous"
        >
          <a
            href="#"
            aria-label="Previous page"
            onClick={(event) => handleChangePage(event, currentPage - 1)}
          >Previous <span className="show-for-sr">page</span>
          </a>
        </li>
      );
    }
  }


  return (
    <ul className="leaderboard-pagination pagination" aria-label="Leaderboard Navigation: 20 Scores Per Page" role="navigation">
      {renderPaginationPrevious()}
      {renderPaginationItems(numPages)}
      {renderPaginationNext()}
    </ul>
  );
};

export default LeaderboardPagination;
