import { TOGGLE_FILTER, SET_ALL_FILTERS, CLEAR_ALL_FILTERS } from '../Action/checkbox-actions'

const initialState = {
  filters: {
    all: true,
    withoutStop: true,
    oneStop: true,
    twoStop: true,
    threeStop: true,
  },
}

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        ...state,
        filters: { ...state.filters, [action.payload]: !state.filters[action.payload] },
      }
    case SET_ALL_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, all: true, withoutStop: true, oneStop: true, twoStop: true, threeStop: true },
      }
    case CLEAR_ALL_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          all: false,
          withoutStop: false,
          oneStop: false,
          twoStop: false,
          threeStop: false,
        },
      }

    default:
      return state
  }
}
