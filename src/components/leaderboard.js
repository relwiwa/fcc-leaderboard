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
      sortedBy: 'alltime',
      dataAllTime: null,
      dataRecent: null,
      currentPage: null
    }

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeSortedBy = this.handleChangeSortedBy.bind(this);
  }

  componentWillMount() {
    this.getData(dataAllTimeUrl, 'AllTime');
    this.getData(dataRecentUrl, 'Recent');
  }

  calculateNumPages() {
    if (this.state.sortedBy === 'alltime') {
      return Math.ceil(this.state.dataAllTime.length / 20);
    }
    else {
      return Math.ceil(this.state.dataRecent.length / 20);
    }
  }

  getData(url, type) {
    let newStateObject = {};
    const dataRequest = axios.get(url)
      // no sanitazion of external data as dangerouslySetInnerHTML will not be used
      .then((data) => {
        newStateObject['data' + type] = this.prepareData(data.data, type);
        newStateObject['currentPage'] = 1;
        // if alltime data is not here yet or there was an error fetching it, show recent data
        if (type === 'Recent' && (this.state.dataAllTime === null || this.state.dataAllTime.length === 0)) {
          newStateObject['sortedBy'] = 'recent';
        }
        this.setState(newStateObject);
      }, (error) => {
        newStateObject['data' + type] = [];
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
    if (this.state.sortedBy === 'alltime') {
      if (this.state.dataAllTime === null || this.state.dataAllTime.length === 0) {
        return this.state.dataAllTime;
      }
      else {
        return this.state.dataAllTime.slice(start, start + 20);
      }
    }
    else {
      if (this.state.dataRecent === null || this.state.dataRecent.length === 0) {
        return this.state.dataRecent;
      }
      else {
        return this.state.dataRecent.slice(start, start + 20);
      }
    }
  }

  render() {
    const { currentPage, dataRecent, dataAllTime, sortedBy } = this.state;

    const currentData = this.sliceCurrentData();
    
    return (
      <div className="leaderboard">
        <h1 className="text-center my-4">freeCodeCamp Leaderboard</h1>
        {currentData !== null && currentData.length > 0 &&
          <LeaderboardControls
            currentPage={currentPage}
            numPages={this.calculateNumPages()}
            placement="top"
            sortedBy={sortedBy}
            onChangePage={this.handleChangePage}
            onChangeSortedBy={this.handleChangeSortedBy}
          />
        }
        <LeaderboardContainer
          sortedBy={sortedBy}
          leaderboardData={currentData}
        />
        {currentData !== null && currentData.length > 0 &&
          <LeaderboardControls
            currentPage={currentPage}
            numPages={this.calculateNumPages()}
            placement="bottom"
            sortedBy={sortedBy}
            onChangePage={this.handleChangePage}
            onChangeSortedBy={this.handleChangeSortedBy}
          />
        }
      </div>
    );
  }
};

export default Leaderboard;
