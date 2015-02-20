'use strict';

import React, {PropTypes} from 'react';
import Bacon from 'baconjs';
import ItemsStore from '../stores/ItemsStore';
import ViewHelper from '../utils/view-helper';

export default React.createClass({

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
      <div>
        <style>{this.styles}</style>
        <ul id="List">
          {this.state.items.map((item) => (
            <li>
              {item.text}
              <time>{ViewHelper.relativeTime(item.time)}</time>
            </li>
          ))}
        </ul>
      </div>
    );
  },

  styles: (`
    #List {
      max-width: 400px;
      margin: 20px 0;
      padding: 0;
      list-style-type: none;
    }
    #List li {
      margin-bottom: 10px;
      word-break: break-all;
    }
    #List time {
      padding-left: 1em;
      font-size: 0.8em;
    }
  `)
});
