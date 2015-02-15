'use strict';

import React, {PropTypes} from 'react';
import Bacon from 'baconjs';
import ItemsStore from '../stores/ItemsStore';
import ViewHelper from '../utils/view-helper';

export default React.createClass({

  propTypes: {
  },

  getInitialState() {
    return {
      items: []
    }
  },

  componentWillMount() {
    ItemsStore.outputProperty.onValue((items) => this.setState({items: items}));
  },

  render() {
    return (
      <ul>
        {this.state.items.map((item) => (
          <li>{item.text} / {ViewHelper.relativeTime(item.time)}</li>
        ))}
      </ul>
    );
  }

});
