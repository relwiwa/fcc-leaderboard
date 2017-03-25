import axios from 'axios';
import React, { Component } from 'react';

import LeaderboardContainer from './leaderboard-container';
import LeaderboardSorting from './leaderboard-sorting';

const dataAllTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const dataRecentUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

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
    }

    this.handleChangeSortedBy = this.handleChangeSortedBy.bind(this);
  }

  componentWillMount() {
    this.getData(dataAllTimeUrl, 'AllTime');
    this.getData(dataRecentUrl, 'Recent');
  }

  getData(url, type) {
    let newStateObject = {};
    const dataRequest = axios.get(url)
      // no sanitazion of external data as dangerouslySetInnerHTML will not be used
      .then((data) => {
        newStateObject['data' + type] = this.prepareData(data.data, type);
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

  render() {
    const { dataRecent, dataAllTime, sortedBy } = this.state;

    const dataHasArrived = (dataRecent !== null && dataRecent.length > 0)
                         || (dataAllTime !== null && dataAllTime.length > 0);

    return (
      <div className="leaderboard">
        <h1 className="text-center my-4">freeCodeCamp Leaderboard</h1>
        {dataHasArrived &&
          <LeaderboardSorting
            sortedBy={this.state.sortedBy}
            onClick={this.handleChangeSortedBy}
          />
        }
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
