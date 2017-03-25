import React from 'react';
import  ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import LeaderboardContainerStyles from '../styles/leaderboard-container.scss';

import LeaderboardElement from './leaderboard-element';
import LeaderboardHeader from './leaderboard-header';

const LeaderboardContainer = (props) => {
  const { sortedBy, leaderboardData } = props;
  
  const renderLeaderboard = () => {
    if (leaderboardData === null) {
      return (
        <div className="text-center">Getting leaderboard data...</div>
      )
    }
    else if (leaderboardData.length === 0) {
      return (
        <div className="text-center">No leaderboard data available</div>
      )
    }

    return (
      <table className="leaderboard-container table table-bordered table-striped table-sm text-center">
        <LeaderboardHeader />
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeave={false}
            transitionAppear={true}
            transitionAppearTimeout={500}
            component="tbody"
          >
            {leaderboardData.map((datum) => (
              <LeaderboardElement
                key={datum.username}
                leaderboardDatum={datum} />
            ))}
          </ReactCSSTransitionGroup>
      </table>
    );
  }


  return (
    <div className="leaderboard-component">
      {renderLeaderboard()}
    </div>
  )
};

export default LeaderboardContainer;
