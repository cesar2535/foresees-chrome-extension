import React, { Component } from 'react'
import styles from './PlayerPage.css'

import { checkProjectUrl } from '../../shared/helpers/regexTest'

export default class PlayerPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
    const { currentWeb } = this.props
    if (!checkProjectUrl(currentWeb.url)) {
      return (
        <div className={styles.error}>
          <h1>Error: this web is not a scratch project</h1>
        </div>
      )
    }

    const id = currentWeb.url.match(/\d+/g)[0] || 0

    return (
      <div className={styles.root}>
        <a className={styles.link} href={currentWeb.url} target="4cs">
          <img src={currentWeb.favIconUrl} />
          {currentWeb.title}
        </a>
        <iframe
          allowFullScreen="true"
          allowTransparency="true"
          src={`http://phosphorus.github.io/embed.html?id=${id.toString()}&auto-start=true&light-content=false`}
          width="100%" height="393" className="phosphorus" style={{border: 0}}>
        </iframe>
      </div>
    )
  }
}
