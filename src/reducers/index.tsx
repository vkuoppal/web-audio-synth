import { CHANGE_GAIN } from '../constants/action-types';
const initialState = {
  articles: [],
  gainValue: 50,
};

function rootReducer(state = initialState, action: any) {
  if (action.type === CHANGE_GAIN) {
    return Object.assign({}, state, {
      gainValue: action.payload,
    });
  }

  return state;
}

export default rootReducer;
