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
      <div id="Input">
        <style>{this.styles}</style>
        <textarea ref="input" onKeyUp={this.inputKey}></textarea>
        <span className="count">
        <span style={{color: this.state.isLengthOver ? 'red' : 'black'}}>{this.state.currentLength}</span> / {this.props.maxLength}
        </span>
        <button onClick={this.submitBtn}>Submit</button>
      </div>
    );
  },

  styles: (`
    #Input {
      position: relative;
    }
    #Input textarea {
      width: 330px;
      height: 100px;
      border: 1px solid #aaa;
      border-radius: 5px;
    }
    #Input .count {
      position: absolute;
      bottom: 10px;
      left: 200px;
      text-align: right;
      display: inline-block;
      width: 100px;
      padding: 0 20px;
      font-size: 0.8em;
    }
    #Input button {
      float: right;
      border: none;
      width: 70px;
      height: 100px;
      font-weight: bold;
      color: #333;
      background-color: lightblue;
    }
  `)
});
