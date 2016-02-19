import React, { Component } from 'react'
import LeftNav from 'material-ui/lib/left-nav'

export default class FavoriteLists extends Component {
  constructor(props) {
    super(props)

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  render() {
    const { open, onRequestChange, lists } = this.props
    return (
      <LeftNav
        docked={false}
        openRight={true}
        open={open}
        onRequestChange={onRequestChange}
      >
        {lists.map( item =>
          <MenuItem onClick={this.handleItemClick}>{item.name}</MenuItem>
        )}
      </LeftNav>
    )
  }

  handleItemClick(e) {

  }
}
