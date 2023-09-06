// REDUCE - функция, которая получает Action(объект где написано Что обновить) и обновляет State
//1 пришёл Action - событие
import {
  FETCH_SEARCH_ID_REQUEST,
  FETCH_SEARCH_ID_SUCCESS,
  FETCH_SEARCH_ID_FAILURE,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  SET_STOP_FETCHING,
} from '../Action/ticket-actions'
// экшн изменения фильтров и сортировки
import { TOGGLE_FILTER, SET_ALL_FILTERS, CLEAR_ALL_FILTERS } from '../Action/checkbox-actions'
import { SET_SORTING } from '../Action/sorting-actions'

//3 Action указывает Reduce что изменить в State
const initialState = {
  searchId: null,
  tickets: [],
  loadingSearchId: false,
  loadingTickets: false,
  error: null,
  stop: false,
  filters: {
    all: true,
    withoutStop: true,
    oneStop: true,
    twoStop: true,
    threeStop: true,
  },
  sorting: 'cheapest',
}

//2 когда Action указал ЧТО изменить - Reducer решает КАК...это просто логика, отвечающая за обновления, собраная из компонентов в одном месте
export const ticketReducer = (state = initialState, action) => {
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
    case SET_SORTING:
      return { ...state, sorting: action.payload }
    default:
      return state
  }
}
