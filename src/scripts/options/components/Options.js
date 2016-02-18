import React, { Component, PropTypes } from 'react';
import { createAsteroid } from '../../shared/helpers/createMeteorConnect'

const Asteroid = createAsteroid({
  platform: 'browser',
  endpoint: 'ws://localhost:8080/websocket'
})

class Options extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: props.state.chromeExtension.persistent.options
    }
  }

  handleChangeInitCount(e) {
    this.setState({
      options: { initCount: e.target.value }
    });
  }

  //TODO: setOptions
  //TODO: debug component render functinon
  render() {
    const { setOptions, state } = this.props;
    console.log(setOptions);
    console.log('%cRender ' + this.constructor.displayName + ' component', 'background: #FFF; color: #2aa198 ', 'state', this.state, 'props', this.props);
    return (
      <div>
        Initial value <br/> <input type="text" value={this.state.options.initCount} onChange={this.handleChangeInitCount.bind(this)} id="initCount"/>
        <br/> <br/>
        <div id="status" style={{color: "#32B432",fontSize:"80%"}}></div>
        <button id="save" onClick={e => setOptions(this.state.options)}>Save</button>
        <button onClick={this.handleLogin.bind(this)}>Sign In</button>
      </div>
    );
  }

  handleLogin(e) {
    console.log('Process Login');
    Asteroid.loginWith('facebook').then(() => {
      console.log('login success');
      console.log(arguments);
    }, () => {
      console.log('login fail');
      console.log(arguments);
    })
  }
}

export default Options;
