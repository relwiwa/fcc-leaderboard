import axios from 'axios';
import React, { Component } from 'react';

import LeaderboardContainer from './leaderboard-container';
import LeaderboardControls from './leaderboard-controls';

import '../styles/leaderboard.scss';

const dataAllTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const dataRecentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

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
      <div className="leaderboard grid-container grid-container-padded">
        <div className="grid-x">
          <div className="cell">
            <h1 className="text-center">freeCodeCamp Leaderboard</h1>
            {this.renderLeaderboardControls(currentData, 'top')}
            <LeaderboardContainer
              sortedBy={sortedBy}
              leaderboardData={currentData}
            />
            {this.renderLeaderboardControls(currentData, 'bottom')}
          </div>
        </div>
      </div>
    );
  }
};

export default Leaderboard;
