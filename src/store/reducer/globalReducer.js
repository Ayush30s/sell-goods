import { CHANGE_THEME } from "../actions/global";

export const initialState = {
  theme: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: state.theme ? false : true,
      };

    default:
      return state;
  }
};

export default globalReducer;
