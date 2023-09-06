import { TicketIn } from '../TicketIn/TicketIn'
import { TicketBack } from '../TicketBack/TicketBack'

import classes from './TicketAirLines.module.css'

// данные из
export const TicketAirLines = ({
  priceValue,
  codeIATA,
  originIn,
  destinationIn,
  durationIn,
  stopsIn,
  takeOffTimeIn,
  landingTameIn,
  originBack,
  destinationBack,
  durationBack,
  stopsBack,
  takeOffTimeBack,
  landingTameBack,
}) => {
  const { ticketAirLines, titleTicket, priceTicket, logoAir } = classes

  return (
    <div className={ticketAirLines}>
      <div className={titleTicket}>
        <div className={priceTicket}>{priceValue}</div>
        <img className={logoAir} src={`http://pics.avs.io/99/36/${codeIATA}.png`} alt="logo"></img>
      </div>
      <TicketIn
        originIn={originIn}
        destinationIn={destinationIn}
        durationIn={durationIn}
        stopsIn={stopsIn}
        takeOffTimeIn={takeOffTimeIn}
        landingTameIn={landingTameIn}
      />
      <TicketBack
        originBack={originBack}
        destinationBack={destinationBack}
        durationBack={durationBack}
        stopsBack={stopsBack}
        takeOffTimeBack={takeOffTimeBack}
        landingTameBack={landingTameBack}
      />
    </div>
  )
}
