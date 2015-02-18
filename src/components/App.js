'use strict';

import React, {PropTypes} from 'react';
import Bacon from 'baconjs';
import Input from './Input';
import List from './List';
import ItemsStore from '../stores/ItemsStore';

export default React.createClass({

  componentWillMount() {
    ItemsStore.inputStream.push([
      {text: 'おはようございます！', time: Date.now() - 60 * 60 * 6 * 1000},
      {text: 'こんにちは！', time: Date.now() - 60 * 60 * 3 * 1000},
      {text: 'こんばんは！', time: Date.now()}
    ].reverse());
  },

  render() {
    return (
      <div>
        <h1>Sample</h1>
        <Input />
        <List />
      </div>
    );
  }

});
