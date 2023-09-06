import React from 'react';
import './TicketBack.css';
export const TicketBack = ({
  originBack,
  destinationBack,
  takeOffTimeBack,
  landingTameBack,
  durationBack,
  stopsBack,
}) => {
  return (
    <div className="ticketBack">
      <div className="itemTicket">
        <div className="itemTitleTicket">{`${originBack} – ${destinationBack}`}</div>
        <div className="itemValueTicket">{`${takeOffTimeBack} - ${landingTameBack}`}</div>
      </div>
      <div className="itemTicket">
        <div className="itemTitleTicket">В пути</div>
        <div className="itemValueTicket">{durationBack}</div>
      </div>
      <div className="itemTicket">
        <div className="itemTitleTicket">
          {!stopsBack.length
            ? 'Без пересадок'
            : `${stopsBack.length} пересадки` && stopsBack.length === 1
            ? `${stopsBack.length} пересадка`
            : `${stopsBack.length} пересадки`}
        </div>
        <div className="itemValueTicket">{`${stopsBack}`}</div>
      </div>
    </div>
  );
};
