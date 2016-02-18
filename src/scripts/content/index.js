import configureStore from '../shared/store/configureStore';
import getState from '../shared/helpers/getState';

var store = {};

getState().then(function (initialStore) {
  console.log(`%cInitial Store:`, 'color: #6638F0; font-weight: bold;', initialStore)
  store = configureStore(initialStore);

  console.log(`%cInitial State`, 'color: #C600D7; font-weight: bold;', store.getState())
  store.subscribe(() => {
      let message = {
        action: 'updateState',
        state: store.getState()
      };
      //Dispatching updates to Background Page
      chrome.runtime.sendMessage(message);
      //Dispatching updates to the rest of Content Scripts
      /*chrome.tabs.query({}, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
          chrome.tabs.sendMessage(tabs[i].id, message);
        }
      });*/
    }
  );
});


//Receiving updates from Popup window
chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
  console.log('%conMessage recieved', 'color: #B0F566; font-weight: bold;');
  if (req.action === 'updateState') {
    store.dispatch({
      type: 'UPDATE_STATE',
      state: req.state
    });
  }

  if (req.method === 'getHTML') {
    const config = document.getElementById('config')

    sendResponse(Object.assign({}, { method: 'getHTML' }, JSON.parse(config.innerText)))
  }

});
