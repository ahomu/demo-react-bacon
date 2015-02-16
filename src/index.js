'use strict';

import React from 'react';

// export for http://fb.me/react-devtools
window.React = React;

// bootstrap
import App from './components/App';

export default React.render(
  React.createFactory(App)(),
  document.getElementById('content')
);

