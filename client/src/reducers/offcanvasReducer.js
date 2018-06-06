
import { CLOSE_OFFCANVAS, OPEN_OFFCANVAS, TOGGLE_OFFCANVAS} from '../constants';

const initialState = {
  offcanvasOpened: false
}

function offcanvasReducer(state = initialState, action) {
  switch (action.type) {
    case CLOSE_OFFCANVAS:
      return Object.assign({}, state, {
        offcanvasOpened: false
      });
    case OPEN_OFFCANVAS:
      return Object.assign({}, state, {
        offcanvasOpened: true
      });
    case TOGGLE_OFFCANVAS:
      return Object.assign({}, state, {
        offcanvasOpened: !state.offcanvasOpened
      });
    default:
      return state;
  }
}

export default offcanvasReducer;