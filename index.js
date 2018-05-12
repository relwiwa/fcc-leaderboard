import es6Promise from 'es6-promise';
es6Promise.polyfill();

import React from 'react';
import { render } from 'react-dom';

import '../../../styles/global-styles.scss';
import '../../../config/font-awesome';

import Leaderboard from './components/leaderboard';

render(
  <Leaderboard />,
  document.getElementById('root')
);
