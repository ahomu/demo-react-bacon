'use strict';

import React, {PropTypes} from 'react';
import Bacon from 'baconjs';
import HandleBus from '../utils/handle-bus';
import ItemsStore from '../stores/ItemsStore';

export default React.createClass({

  propTypes: {
    maxLength: PropTypes.number.isRequired
  },

  getDefaultProps() {
    return {
      maxLength: 140
    }
  },

  getInitialState() {
    return {
      currentLength: 0
    }
  },

  componentWillMount() {

    this.inputKey = HandleBus.create();
    this.inputKey
      .map((e) => e.target.value.length)
      .skipDuplicates()
      .onValue((v) => this.setState({currentLength: v}));

    this.sendText = HandleBus.create();
    this.sendText
      .map((_) => this.refs.input.getDOMNode().value)
      .onValue((v) => {
        ItemsStore.inputStream.push({text: v, time: Date.now()})
        this.refs.input.getDOMNode().value = '';
      });

    let shiftEnter = this.inputKey.filter((e) => e.shiftKey && e.keyCode === 13)
    this.sendText.plug(shiftEnter);
  },

  render() {
    return (
      <div>
        <textarea ref="input" onKeyUp={this.inputKey} rows="5" cols="30"></textarea>
        <span>{this.state.currentLength}</span> / {this.props.maxLength}
        <button onClick={this.sendText}>Submit</button>
      </div>
    );
  }

});
