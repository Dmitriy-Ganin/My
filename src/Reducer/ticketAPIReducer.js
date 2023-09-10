import {
  FETCH_SEARCH_ID_REQUEST,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_SEARCH_ID_FAILURE,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  SET_STOP_FETCHING,
} from '../Action/ticket-actions'
const initialState = {
  searchId: null,
  tickets: [],
  loadingSearchId: false,
  loadingTickets: false,
  error: null,
  stop: false,
}

export const ticketAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_ID_REQUEST:
      return { ...state, loadingSearchId: true, error: null }
    case FETCH_SEARCH_ID_SUCCESS:
      return { ...state, loadingSearchId: false, searchId: action.payload, error: null }
    case FETCH_SEARCH_ID_FAILURE:
      return { ...state, loadingSearchId: false, error: action.payload }
    case FETCH_TICKETS_REQUEST:
      return { ...state, loadingTickets: true, error: null }
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        loadingTickets: false,
        tickets: [...state.tickets, ...action.payload],
        error: null,
      }
    case FETCH_TICKETS_FAILURE:
      return { ...state, loadingTickets: false, error: action.payload }
    case SET_STOP_FETCHING:
      return { ...state, stop: true }

    default:
      return state
  }
}
