import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin'
import createContainer from '../shared/containers/createContainer';
import configureStore from '../shared/store/configureStore';
import getState from '../shared/helpers/getState';
import Popup from './components/Popup';
import App from './components/App'

//document.getElementById('heading-version').innerHTML = chrome.app.getDetails().version;

var PopupApp = createContainer(App);

getState().then(function(initialStore) {
  console.log(`%cInitial Store:`, 'color: #6638F0; font-weight: bold;', initialStore)
  const store = configureStore(initialStore)

  /*
  todo: hot reload reducers (https://github.com/rackt/react-redux/releases/tag/v2.0.0)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../shared/reducers/chromeExtension.js', () => {
      const nextRootReducer = require('../shared/reducers/chromeExtension');
      store.replaceReducer(nextRootReducer);
    });
  }*/
  console.log(`%cInitial State`, 'color: #C600D7; font-weight: bold;', store.getState())
  store.subscribe(() => {
    let message = {
      action: 'updateState',
      state: store.getState()
    };
    //Dispatching updates to Background Page
    chrome.runtime.sendMessage(message);
    //Dispatching updates Content Scripts
    chrome.tabs.query({}, function(tabs) {
      for (var i = 0; i < tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, message);
      }
    });
  });

  injectTapEventPlugin()
  ReactDOM.render(
    <Provider store={store}>
      <PopupApp />
    </Provider>,
    document.getElementById('root')
  );

});
