'use strict';

import Bacon from 'baconjs';

// input
let inputBus = new Bacon.Bus();

// initial values
setTimeout(function() {
  inputBus.push([
    {text: 'おはようございます！', time: Date.now() - 60 * 60 * 6 * 1000},
    {text: 'こんにちは！', time: Date.now() - 60 * 60 * 3 * 1000},
    {text: 'こんばんは！', time: Date.now()}
  ].reverse());
}, 500);

// TODO 初期化でPropertyをonValue的な処理で有効にしたい
// いまはtimeout処理のあとにしてる

// output
let outputProp = inputBus
  .map((v) => v)
  .scan([], (acc, v) => {
    Array.isArray(v) || (v = [v]);
    return v.concat(acc);
  });

export default {
  /**
   * @property {Bacon.Bus} inputStream
   */
  inputStream    : inputBus,

  /**
   * @property {Bacon.Property} outputProperty
   */
  outputProperty : outputProp
};
