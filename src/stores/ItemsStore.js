'use strict';

import Bacon from 'baconjs';

// input
let inputBus = new Bacon.Bus();

// output
let outputProp = inputBus
  .map((v) => v)
  .scan([], (acc, v) => {
    Array.isArray(v) || (v = [v]);
    return v.concat(acc);
  });

// start subscribe inputBusStream
// https://github.com/baconjs/bacon.model を使うともうちょっとマシになる
// @see https://github.com/baconjs/bacon.js/wiki/FAQ#why-isnt-my-property-updated
outputProp.onValue(() => 'activate');

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
