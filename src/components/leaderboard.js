import React, { Component } from 'react';

import LeaderboardContainer from './leaderboard-container';

import dataAllTime from '../data/dataAllTime.json';
import dataRecent from '../data/dataRecent.json';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: 'recent',
      dataAllTime: [],
      dataRecent: [],
    }
  }

  componentWillMount() {
    this.setState({
      dataAllTime: this.prepareData(dataAllTime, 'alltime'),
      dataRecent: this.prepareData(dataRecent, 'recent'),
    });
  }

  prepareData(data, criterium) {
    // this most probably is not the right way, mutability
    data = this.sortData(data, criterium);
    data.map((datum, index) => {
      datum['rank'] = index + 1;
    });
    return data;
  }

  sortData(data, criterium) {
    // this most probably is not the right way, mutability
    data.sort((a, b) => {
      return b[criterium] - a[criterium];
    });
    return data;
  }

  render() {
    const { dataRecent, dataLastMonth, sortedBy } = this.state;

    return (
      <div className="leaderboard">
        <h1 className="text-center my-4">freeCodeCamp Leaderboard</h1>
        <LeaderboardContainer
          sortedBy={this.state.sortedBy}
          leaderboardData={this.state.sortedBy === 'alltime'
            ? dataAllTime
            : dataRecent}
        />
      </div>
    );
  }
};

export default Leaderboard;
