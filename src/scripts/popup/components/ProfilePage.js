import React, { Component, PropTypes } from 'react'
import styles from './ProfilePage.css'
const AVATAR = {
  male: require('../../../assets/images/male.png'),
  female: require('../../../assets/images/female.png')
}

export default class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { profile } = this.props
    return (
      <div className={styles.root}>
        <div className={styles.head}>
          <div className={styles.avatar}>
            <img src={AVATAR[profile.gender]} alt={profile.name} />
          </div>
          <div className={styles.name}>
            <h3>{profile.name}</h3>
          </div>
        </div>
      </div>
    )
  }
}
