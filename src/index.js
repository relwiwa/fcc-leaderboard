import React from 'react';
import { render } from 'react-dom';

import './global-styles.scss';
import Leaderboard from './components/leaderboard';

render(
  <Leaderboard />,
  document.getElementById('root')
);