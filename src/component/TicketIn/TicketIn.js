import React from 'react';
import './TicketIn.css';

export const TicketIn = ({ originIn, destinationIn, durationIn, takeOffTimeIn, landingTameIn, stopsIn }) => {
  return (
    <div className="ticketIn">
      <div className="itemTicket">
        <div className="itemTitleTicket">{`${originIn} – ${destinationIn}`}</div>
        <div className="itemValueTicket">{`${takeOffTimeIn} - ${landingTameIn}`}</div>
      </div>
      <div className="itemTicket">
        <div className="itemTitleTicket">В пути</div>
        <div className="itemValueTicket">{durationIn}</div>
      </div>
      <div className="itemTicket">
        <div className="itemTitleTicket">
          {!stopsIn.length
            ? 'Без пересадок'
            : `${stopsIn.length} пересадки` && stopsIn.length === 1
            ? `${stopsIn.length} пересадка`
            : `${stopsIn.length} пересадки`}
        </div>
        <div className="itemValueTicket">{`${stopsIn}`}</div>
      </div>
    </div>
  );
};
