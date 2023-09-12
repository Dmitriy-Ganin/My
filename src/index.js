import { createRoot } from 'react-dom/client'
// хранит данные Store в открытом доступе для react компонентов
// приложение будет рендерить именно Provider
// connect - получить доступ к экземпляру
import { Provider } from 'react-redux'
// функция, которая создаёт задержку операции...направляет Экшены в стор порциями асинхронно
// помогает сделать несколько изменений за одно действие с помощью Middleware
import reduxThunk from 'redux-thunk'
// Middleware - функция, обёртка метода отправки экшена dispatch
// добавляет асинхронный функционал(делать несколько вещей одновременно)...пока не получен запрос - делать элемент неактивным и т.д
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

// Reducer - логика обновления Стор
import { ticketAPIReducer } from './Reducer/ticketAPIReducer'
import { filterReducer } from './Reducer/filterReducer'
import { sortReducer } from './Reducer/sortReducer'
import { App } from './component/App/App'

const rootReducer = combineReducers({
  ticketAPIReducer,
  filterReducer,
  sortReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(reduxThunk)))

// получаю элемент разметки и гружу приложение в него
const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
  //передаю Store в Provider, чтобы он был доступен всем
  <Provider store={store}>
    <App />
  </Provider>
)
