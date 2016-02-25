import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import FontIcon from 'material-ui/lib/font-icon'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import styles from './Header.css'
import { checkProjectUrl } from '../../shared/helpers/regexTest'

export default class Header extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isMoreOpen: 'false'
    }

    this.asteroid = context.asteroid
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this)
  }

  componentDidMount() {
  }

  render() {
    const { persistent } = this.props
    return (
      <AppBar
        title="4Cs"
        onLeftIconButtonTouchTap={this.props.toggleDrawer}
        iconElementRight={
          <div>
            {this.renderFavoriteBtn()}
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

  renderFavoriteBtn() {
    const { persistent, currentWeb: { url }, profile: { favorites } } = this.props

    if (checkProjectUrl(url) && persistent.userId) {
      const scratchId = url.match(/\d+/)[0]
      console.log(scratchId);
      return (
        <IconButton tooltip="Add to Favorite" onClick={this.handleFavoriteClick}>
          <FontIcon className="material-icons" color="#fff">{favorites.includes(scratchId) ? "favorite" : "favorite_border"}</FontIcon>
        </IconButton>
      )
    }

    return null
  }

  handleFavoriteClick(e) {
    const { persistent: { userId }, currentWeb: { url } } = this.props
    const scratchId = url.match(/\d+/)[0]
    this.asteroid.call('favoriteLists.project.update', {
      name: 'Favorite',
      userId,
      scratchId
    })
  }

}

Header.contextTypes = {
  asteroid: PropTypes.object
}
