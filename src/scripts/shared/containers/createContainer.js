import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as persistentActions from '../actions/persistent';
import * as Actions from '../actions'
import * as profileActions from '../actions/profile'

function mapStateToProps(state) {
  console.log(state)
  return {
    state: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(Actions, dispatch),
    ...bindActionCreators(persistentActions, dispatch),
    ...bindActionCreators(profileActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps);
