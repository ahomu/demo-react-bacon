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
      currentLength : 0,
      isLengthOver  : false
    }
  },

  componentWillMount() {

    this.inputKey  = HandleBus.create();
    this.submitBtn = HandleBus.create();

    let currentLength = this.inputKey
      .map((e) => e.target.value.length)
      .skipDuplicates()
      .toProperty();

    let isLengthOver = currentLength
      .map((v) => v > this.props.maxLength)
      .skipDuplicates()
      .toProperty();

    currentLength.onValue((v) => this.setState({currentLength: v}));
    isLengthOver.onValue((v) => this.setState({isLengthOver: v}));

    let sendTextStream = this.submitBtn
      .map((_) => this.refs.input.getDOMNode().value)
      .filter(isLengthOver.not());

    sendTextStream.onValue((v) => {
      ItemsStore.inputStream.push({text: v, time: Date.now()});
      this.refs.input.getDOMNode().value = '';
      this.setState(this.getInitialState());
    });

    let shiftEnterStream = this.inputKey
      .filter((e) => e.shiftKey && e.keyCode === 13);

    this.submitBtn.plug(shiftEnterStream);
  },

  render() {
    return (
      <div>
        <textarea ref="input" onKeyUp={this.inputKey} rows="5" cols="30"></textarea>
        <span style={this.state.isLengthOver ? {color: 'red'} : {}}>{this.state.currentLength}</span> / {this.props.maxLength}
        <button onClick={this.submitBtn}>Submit</button>
      </div>
    );
  }

});
