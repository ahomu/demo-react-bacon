'use strict';

import Bacon from 'baconjs';

/**
 * @returns {Bacon.Bus}
 */
function create() {

  function handleBus() {
    handleBus.push.apply(handleBus, arguments);
  }

  for (let key in Bacon.Bus.prototype) {
    // Function#name は readonly なので、Bacon.Bus#name() をコピーできません...
    if (key !== 'name') {
      handleBus[key] = Bacon.Bus.prototype[key];
    }
  }

  Bacon.Bus.call(handleBus);

  return handleBus;
}

export default {
  create: create
};
