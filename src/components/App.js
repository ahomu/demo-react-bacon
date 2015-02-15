'use strict';

import React, {PropTypes} from 'react';
import Bacon from 'baconjs';
import Input from './Input';
import List from './List';
import ItemsStore from '../stores/ItemsStore';

export default React.createClass({

  propTypes: {

  },

  componentWillMount() {

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
