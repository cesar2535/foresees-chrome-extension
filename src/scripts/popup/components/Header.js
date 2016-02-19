import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import styles from './Header.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMoreOpen: 'false'
    }
  }

  render() {
    const { persistent } = this.props
    return (
      <AppBar
        title="4Cs"
        onLeftIconButtonTouchTap={this.props.toggleDrawer}
        iconElementRight={
          <div>
            <IconButton tooltip="Add to Favorite">
              <FontIcon className="material-icons" color="#fff">favorite_border</FontIcon>
            </IconButton>
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon color="#fff" /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem primaryText="Refresh" onClick={this.props.getCurrentTab} />
              <MenuItem primaryText="Help" />
              {persistent.userId ? <MenuItem primaryText="Sign out" onClick={this.props.handleLogout} /> : null}
            </IconMenu>
          </div>
        }

      />
    )
  }
}
