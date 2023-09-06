import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { TicketAirLines } from '../TicketAirLines/TicketAirLines';
import { Button } from '../ButtonAdd/ButtonAdd';
//сервисные элементы
import { Loader } from '../Loader/Loader';
import { Warning } from '../../Service/Warning/Warning';

export const ListTicketAirLines = () => {
  let id = 1;
  //
  const tickets = useSelector((state) => state.ticketReducer.tickets);
  const error = useSelector((state) => state.ticketReducer.error);
  const filters = useSelector((state) => state.ticketReducer.filters);
  const sorting = useSelector((state) => state.ticketReducer.sorting);
  const stop = useSelector((state) => state.ticketReducer.stop);
  // показано 5 билетов
  const [ticketsToShow, setTicketsToShow] = useState(5);

  // функция показать ещё 5 билетов
  const showMoreTickets = () => {
    setTicketsToShow(ticketsToShow + 5);
  };

  // формат цены-------------------------------------------------------------------------цена и время билета
  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU');
  };

  const setTakeOffTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const setLandingTame = (dateString, minutes) => {
    const takeOff = new Date(dateString).getTime();
    const landing = new Date(takeOff + minutes * 60000);
    return landing.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  // фильтр билетов...по количеству пересадок--------------------------------------------1 фильтр и сортировка билетов
  const filterTickets = tickets.filter((elem) => {
    if (filters.all) {
      return true;
    }
    const stopsCount = elem.segments[0].stops.length;

    return (
      (filters.withoutStop && stopsCount === 0) ||
      (filters.oneStop && stopsCount === 1) ||
      (filters.twoStop && stopsCount === 2) ||
      (filters.threeStop && stopsCount === 3)
    );
  });

  // сортировка билетов...дешёвый, быстрый, оптимальный
  const filterAndSortTickets = filterTickets.sort((a, b) => {
    if (sorting === 'cheapest') {
      return a.price - b.price;
    } else if (sorting === 'fastest') {
      return a.segments[0].duration - b.segments[0].duration;
    } else {
      return 0;
    }
  });

  // -----------------------------------------------------------------------------------1.1 собрать фильтрованное и показать билеты
  // отфильтрованное и сортированное - собрать в массив...первые 5 элементов
  const visibleTickets = filterAndSortTickets.slice(0, ticketsToShow);

  // из этих 5 - получить свойства, пройдя по массиву...как в movieapp
  const components = visibleTickets.map((item) => {
    // получение свойств из билетов в API
    // цена, код авиакомпании, массив перелётов
    const { price, carrier, segments } = item;
    const {
      origin: originIn,
      destination: destinationIn,
      duration: durationIn,
      date: dateIn,
      stops: stopsIn,
    } = segments[0];
    const {
      origin: originBack,
      destination: destinationBack,
      duration: durationBack,
      date: dateBack,
      stops: stopsBack,
    } = segments[1];

    return (
      // выдать в рендер билет из массива...5 шт
      <TicketAirLines
        priceValue={formatPrice(price)}
        codeIATA={carrier}
        key={id++}
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
    );
  });

  // ------------------------------------------------------------------------------------------сервисные элементы
  // ошибка / лоадер / кнопка +5
  if (error !== null && !stop) {
    return (
      <>
        {!components.length ? <Warning text={'Please, look for tickets to << Peggie the piper.com >>'} /> : components}
        {!components.length ? null : <Button onClick={showMoreTickets} />}
      </>
    );
  }

  if (!stop) {
    return (
      <>
        <Loader />
        {components}
        {!components.length ? null : <Button onClick={showMoreTickets} />}
      </>
    );
  }
  if (!components.length) {
    return <Warning text={'Nothing found, try to change the search settings'} />;
  }

  return (
    <>
      {components}
      {!components.length ? null : <Button onClick={showMoreTickets} />}
    </>
  );
};
