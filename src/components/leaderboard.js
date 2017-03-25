import axios from 'axios';
import es6Promise from 'es6-promise';
import React, { Component } from 'react';

import LeaderboardContainer from './leaderboard-container';
import LeaderboardControls from './leaderboard-controls';

const dataAllTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const dataRecentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

es6Promise.polyfill();
const axiosConfig = axios.create({
  timeout: 1000
});

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: 'dataAllTime',
      dataAllTime: null,
      dataRecent: null,
      currentPage: null
    }
  }

  // Lifecycle Methods

  componentWillMount() {
    this.getData(dataAllTimeUrl, 'dataAllTime');
    this.getData(dataRecentUrl, 'dataRecent');
  }

  // Class Methods

  calculateNumPages() {
    return Math.ceil(this.state[this.state.sortedBy].length / 20);
  }

  getData(url, type) {
    let newStateObject = {};
    const dataRequest = axios.get(url)
      // no sanitazion of external data as dangerouslySetInnerHTML will not be used
      .then((data) => {
        newStateObject[type] = this.prepareData(data.data, type);
        newStateObject['currentPage'] = 1;
        // if alltime data is not here yet or there was an error fetching it, show recent data
        if (type === 'dataRecent' && (this.state.dataAllTime === null || this.state.dataAllTime.length === 0)) {
          newStateObject['sortedBy'] = 'dataRecent';
        }
        this.setState(newStateObject);
      }, (error) => {
        newStateObject[type] = [];
        this.setState(newStateObject);
      });
  }

  handleChangePage(page) {
    this.setState({ currentPage: page });
  }

  handleChangeSortedBy(criterium) {
    this.setState({ sortedBy: criterium });
  }

  prepareData(data, criterium) {
    // this most probably is not the right way, mutability
    data = this.sortData(data, criterium.toLowerCase());
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

  sliceCurrentData() {
    const start = (this.state.currentPage - 1) * 20;
    if (this.state[this.state.sortedBy] === null || this.state[this.state.sortedBy].length === 0) {
        return this.state[this.state.sortedBy];
    }
    else {
      return this.state[this.state.sortedBy].slice(start, start + 20);
    }
  }

  // Render Methods

  renderLeaderboardControls(currentData, placement) {
    if (currentData !== null && currentData.length > 0) {
      return (
        <LeaderboardControls
          currentPage={this.state.currentPage}
          numPages={this.calculateNumPages()}
          placement={placement}
          sortedBy={this.state.sortedBy}
          onChangePage={(page) => this.setState({ currentPage: page })}
          onChangeSortedBy={(criterium) => this.setState({ sortedBy: criterium })}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { currentPage, dataRecent, dataAllTime, sortedBy } = this.state;

    const currentData = this.sliceCurrentData();
    
    return (
      <div className="leaderboard">
        <h1 className="text-center my-4">freeCodeCamp Leaderboard</h1>
        {this.renderLeaderboardControls(currentData, 'top')}
        <LeaderboardContainer
          sortedBy={sortedBy}
          leaderboardData={currentData}
        />
        {this.renderLeaderboardControls(currentData, 'bottom')}
      </div>
    );
  }
};

export default Leaderboard;
