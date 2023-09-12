import { SET_SORTING } from '../Action/sorting-actions'

const initialState = {
  sorting: 'cheapest',
}

export const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORTING:
      return { ...state, sorting: action.payload }

    default:
      return state
  }
}
