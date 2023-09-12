// экшены по работе с API
export const FETCH_SEARCH_ID_REQUEST = 'FETCH_SEARCH_ID_REQUEST'
export const FETCH_SEARCH_ID_SUCCESS = 'FETCH_SEARCH_ID_SUCCESS'
export const FETCH_SEARCH_ID_FAILURE = 'FETCH_SEARCH_ID_FAILURE'

export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST'
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS'
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE'
export const SET_STOP_FETCHING = 'SET_STOP_FETCHING'

const url = 'https://aviasales-test-api.kata.academy'

// получение гостевой сессии
const getSessionID = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SEARCH_ID_REQUEST })

    fetch(`${url}/search`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then((data) => {
        const searchId = data.searchId
        dispatch({ type: FETCH_SEARCH_ID_SUCCESS, payload: searchId })
        dispatch(fetchTickets(searchId))
      })
      .catch((error) => {
        dispatch({ type: FETCH_SEARCH_ID_FAILURE, payload: error.message })
      })
  }
}

// получение билетов с сервера
export const fetchTickets = (searchId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_TICKETS_REQUEST })

    const fetchMoreTickets = () => {
      fetch(`${url}/tickets?searchId=${searchId}`) // запрос на сервер
        .then((response) => {
          if (!response.ok) {
            fetchMoreTickets()
            throw new Error(response.status)
          }
          return response.json() // если сеть стабильна - пришёл объект с билетами
        })
        .then((data) => {
          const tickets = data.tickets // разложил билеты...распаковал массив
          dispatch({ type: FETCH_TICKETS_SUCCESS, payload: tickets }) // отправил в store...reducer

          if (!data.stop) {
            fetchMoreTickets()
          } else dispatch({ type: SET_STOP_FETCHING, payload: data.stop })
        })
        .catch((error) => {
          dispatch({ type: FETCH_TICKETS_FAILURE, payload: error.message })
        })
    }
    fetchMoreTickets()
  }
}

export default getSessionID
