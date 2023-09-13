export const sortTickets = (tickets, typeValue) => {
  const sortedTickets = [...tickets]
  if (typeValue === 'cheapest') {
    sortedTickets.sort((a, b) => a.price - b.price)
  } else if (typeValue === 'fastest') {
    sortedTickets.sort((a, b) => {
      const first = a.segments[0].duration + a.segments[1].duration
      const second = b.segments[0].duration + b.segments[1].duration
      return first - second
    })
  }
  return sortedTickets
}
