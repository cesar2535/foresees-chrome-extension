import React, { Component } from 'react'
import styles from './App.css'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'
import { createAsteroid } from '../../shared/helpers/createMeteorConnect'
import { getCurrentTab } from '../../shared/helpers/getTab'
import { checkProjectUrl } from '../../shared/helpers/regexTest'
import { login } from '../../shared/helpers/account'
import Header from './Header'
import PlayerPage from './PlayerPage'
import ProfilePage from './ProfilePage'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDrawerOpen: false,
      isDialogOpen: false,
      location: 'HOME',
      currentWeb: {}
    }
    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.getCurrentTab = this.getCurrentTab.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount() {
    // Meteor Connection
    this.asteroid = createAsteroid({
      platform: 'chrome',
      endpoint: 'ws://localhost:8080/websocket'
    })
  }

  componentDidMount() {
    const { state: { persistent }, updateProfile } = this.props
    this.getCurrentTab()
    this.asteroid.ddp.on("added", ({collection, id, fields}) => {
      console.groupCollapsed(`Collection ${collection} with a element added`)
      console.log(`%cDocument's ID:`, 'color: #604B55; font-weight: bold;', id);
      console.log(`%cDocument's fields:`, 'color: #BB4A51; font-weight: bold;', fields);
      console.groupEnd()

      if (collection === 'users' && id === persistent.userId) {
        console.log('UPDATE PROFILE', fields.profile)
        updateProfile(fields.profile)
      }
    });
  }

  render() {
    const { state: { persistent, profile } } = this.props
    const { currentWeb } = this.state
    return (
      <div className={styles.root}>
        <Header
          toggleDrawer={this.toggleDrawer}
          getCurrentTab={this.getCurrentTab}
          persistent={persistent}
          handleLogout={this.handleLogout}
        />
        <LeftNav
          docked={false}
          open={this.state.isDrawerOpen}
          onRequestChange={ open => this.setState({ isDrawerOpen: open }) }
        >
          {persistent.userId ? <MenuItem onClick={ e => this.changeLocation(e, 'PROFILE') }>{profile.name}</MenuItem> : null}
          <MenuItem onClick={ e => this.changeLocation(e, 'HOME') }>Home</MenuItem>
          <MenuItem>Scratch</MenuItem>
          <MenuItem>CS First</MenuItem>
          <MenuItem onClick={ e => this.changeLocation(e, 'SCRATCH_PLAYER') } disabled={!checkProjectUrl(currentWeb.url)}>Scratch Player</MenuItem>
          <MenuItem>About</MenuItem>
        </LeftNav>
        {this.renderContent()}
      </div>
    )
  }

  renderContent() {
    const { state: { persistent, profile } } = this.props
    const { location, currentWeb } = this.state

    if (!persistent.userId) {
      return (
        <div className={styles.nologin}>
          <h3>Please Sign In</h3>
          <RaisedButton
            backgroundColor="#3b5998"
            labelColor="#fff"
            label="Sign In with Facebook"
            onClick={this.handleLogin}
          />
        </div>
      )
    }

    switch (this.state.location) {
      case 'HOME':
        return (
          <div className={styles.home}>
          </div>
        )
      case 'SCRATCH_PLAYER':
        return (
          <PlayerPage currentWeb={currentWeb} />
        )
      case 'PROFILE':
        return <ProfilePage persistent={persistent} profile={profile} />
      default:
        return
    }
  }

  changeLocation(e, location) {
    this.setState({
      location,
      isDrawerOpen: false
    })
  }

  toggleDrawer(e) {
    const { isDrawerOpen } = this.state

    this.setState({
      isDrawerOpen: !isDrawerOpen
    })
  }

  getCurrentTab(e) {
    getCurrentTab().then( res => {
      console.log(res);
      this.setState({
        currentWeb: res
      })
    })
  }

  handleLogin(e) {
    login('facebook')
  }

  handleLogout(e) {
    this.props.logout()
  }
}
