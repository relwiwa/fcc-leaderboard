import React from 'react';

const LeaderboardPagination = (props) => {
  const { currentPage, numPages, onChangePage } = props;

  const handleChangePage = (event, page) => {
    event.preventDefault();
    onChangePage(page);
  };

  const renderPaginationItems = (amount) => {
    let items = [];
    for (let i = 1; i <= amount; i++) {
      const item = <li
                     key={i}
                     className={'page-item' + (currentPage === i ? ' disabled' : '')}>
                      <a
                        className="page-link"
                        href="#"
                        onClick={(event) => handleChangePage(event, i)}>{i}
                      </a>
                    </li>
      items.push(item);
    }
    return items;
  };

  return (
    <nav aria-label="Leaderboard Navigation: 20 Scores Per Page">
      <ul className="pagination justify-content-md-end justify-content-center">
        <li className={'page-item' + (currentPage === 1 ? ' disabled' : '')}>
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={(event) => handleChangePage(event, currentPage - 1)}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {renderPaginationItems(numPages)}
        <li className={'page-item' + (currentPage === numPages ? ' disabled' : '')}>
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={(event) => handleChangePage(event, currentPage + 1)}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>    
  );
};

export default LeaderboardPagination;
