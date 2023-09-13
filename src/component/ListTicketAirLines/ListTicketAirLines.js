import { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { sortTickets } from '../../utils/sortTickets'
import { filterTickets } from '../../utils/filterTickets'
import { TicketAirLines } from '../TicketAirLines/TicketAirLines'
import { Button } from '../ButtonAdd/ButtonAdd'
//сервисные элементы
import Loader from '../Loader/Loader'
import { Warning } from '../../Service/Warning/Warning'

export const ListTicketAirLines = () => {
  // получение состояний из reduce
  const tickets = useSelector((state) => state.ticketAPIReducer.tickets)
  const error = useSelector((state) => state.ticketAPIReducer.error)
  const filters = useSelector((state) => state.filterReducer.filters)
  const sorting = useSelector((state) => state.sortReducer.sorting)
  const stop = useSelector((state) => state.ticketAPIReducer.stop)
  // показано 5 билетов
  const [ticketsToShow, setTicketsToShow] = useState(5)

  // функция показать ещё 5 билетов
  const showMoreTickets = () => {
    setTicketsToShow(ticketsToShow + 5)
  }

  // формат цены-------------------------------------------------------------------------цена и время билета
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU')
  }
  //в фильтр
  const setTakeOffTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
  }

  const setLandingTame = (dateString, minutes) => {
    const takeOff = new Date(dateString).getTime()
    const landing = new Date(takeOff + minutes * 60000)
    return landing.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  //фильтрация и сортировка ( в utils)
  const typeTickets = useMemo(() => sortTickets(tickets, sorting), [tickets, sorting])
  const filteringTickets = useMemo(() => filterTickets(typeTickets, filters), [typeTickets, filters])
  // -----------------------------------------------------------------------------------1.1 собрать фильтрованное и показать билеты
  // отфильтрованное и сортированное - собрать в массив...первые 5 элементов
  const visibleTickets = filteringTickets.slice(0, ticketsToShow)

  // из этих 5 - получить свойства, пройдя по массиву...как в movieapp
  const components = visibleTickets.map((item) => {
    // получение свойств из билетов в API
    // цена, код авиакомпании, массив перелётов
    const { price, carrier, segments } = item
    const {
      origin: originIn,
      destination: destinationIn,
      duration: durationIn,
      date: dateIn,
      stops: stopsIn,
    } = segments[0]
    const {
      origin: originBack,
      destination: destinationBack,
      duration: durationBack,
      date: dateBack,
      stops: stopsBack,
    } = segments[1]

    return (
      // выдать в рендер билет из массива...5 шт
      <TicketAirLines
        priceValue={formatPrice(price)}
        codeIATA={carrier}
        key={`${item.price}${item.carrier}${item.segments[0].date}${item.segments[1].date}`}
        originIn={originIn}
        destinationIn={destinationIn}
        durationIn={formatDuration(durationIn)}
        stopsIn={stopsIn}
        takeOffTimeIn={setTakeOffTime(dateIn)}
        landingTameIn={setLandingTame(dateIn, durationIn)}
        originBack={originBack}
        destinationBack={destinationBack}
        durationBack={formatDuration(durationBack)}
        stopsBack={stopsBack}
        takeOffTimeBack={setTakeOffTime(dateBack)}
        landingTameBack={setLandingTame(dateIn, durationBack)}
      />
    )
  })

  // ------------------------------------------------------------------------------------------сервисные элементы
  // ошибка / лоадер / кнопка +5
  if (error !== null && !stop) {
    return (
      <>
        {!components.length ? <Warning text={'Nothing found, try to change the search settings'} /> : components}
        {!components.length ? null : <Button onClick={showMoreTickets} />}
      </>
    )
  }

  if (!stop) {
    return (
      <>
        <Loader />
        {components}
        {!components.length ? null : <Button onClick={showMoreTickets} />}
      </>
    )
  }
  if (!components.length) {
    return <Warning text={'Nothing found, try to change the search settings'} />
  }

  return (
    <>
      {components}
      {!components.length ? null : <Button onClick={showMoreTickets} />}
    </>
  )
}
