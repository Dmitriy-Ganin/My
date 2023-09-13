export const filterTickets = (tickets, filter) => {
  let filterArray = [...tickets]
  if (!filter.withoutStop) {
    filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 0)
  }
  if (!filter.oneStop) {
    filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 1)
  }
  if (!filter.twoStop) {
    filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 2)
  }
  if (!filter.threeStop) {
    filterArray = filterArray.filter((ticket) => ticket.segments[0].stops.length !== 3)
  }
  return filterArray
}
