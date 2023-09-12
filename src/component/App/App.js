import { useEffect } from 'react'
// хук редуктора на получение ссылки на dispatch из стор
import { useDispatch } from 'react-redux'

import getSessionID from '../../Action/ticket-actions'
import { Header } from '../Header/Header'
import { Filter } from '../Filter/Filter'
import { TabsAirLines } from '../TabsAirLines/TabsAirLines'
import { ListTicketAirLines } from '../ListTicketAirLines/ListTicketAirLines'

import './App.css'

export const App = () => {
  // получаю ссылку на функцию Dispatch в Store
  const dispatch = useDispatch()

  // срабатывает когда меняется []...здесь ничего, срабатывает один раз на старте
  // получаю гостевую сессию и отправляю её в стор

  useEffect(() => dispatch(getSessionID()), [])

  return (
    <div>
      <Header />
      <div className="main">
        <Filter />
        <div className="AirLines">
          <TabsAirLines />
          <ListTicketAirLines />
        </div>
      </div>
    </div>
  )
}
