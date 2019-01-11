/**
 * TYPES
 */
export const Types = {
  ADD_REQUEST: 'users@ADD_REQUEST',
  ADD_SUCCESS: 'users@ADD_SUCCESS',
  ADD_FAILURE: 'users@ADD_FAILURE',
  REMOVE_USER: 'users@REMOVE_USER',
};

/**
 * REDUCERS
 */
const INITIAL_STATE = {
  loading: false,
  data: [],
};

export default function users(state = INITIAL_STATE, action) {
  // ...
  switch (action.type) {
    case Types.ADD_REQUEST:
      return { ...state, loading: true };
    case Types.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload.data],
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false };
    case Types.REMOVE_USER:
      return { ...state, data: state.data.filter(user => user.id !== action.payload.id) };
    default:
      return state;
  }
}

/**
 * ACTIONS
 */

export const Creators = {
  addUserRequest: (latitude, longitude, username) => ({
    type: Types.ADD_REQUEST,
    payload: { username, latitude, longitude },
  }),

  addUserSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),

  addUserFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),

  removeUser: id => ({
    type: Types.REMOVE_USER,
    payload: { id },
  }),
};
