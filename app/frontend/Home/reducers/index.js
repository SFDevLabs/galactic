import { combineReducers } from 'redux';
import userResult from '../../lib/userReducer'


const urlResult = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_URL_SEARCH':
      return action.result
    default:
      return state
  }
}

const homeApp = combineReducers({
  urlResult,
  userResult
})

export default homeApp
