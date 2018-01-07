import { CARDPOST } from '../actions/types'

export default function(state = null, action) {
    switch(action.type) {
      case CARDPOST:
      return Object.assign({}, state, {
          cardPost: action.payload
        });
      default:
          return state;
    }
}
