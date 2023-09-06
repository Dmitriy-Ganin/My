import classes from './ButtonAdd.module.css'

export const Button = ({ onClick }) => {
  const { add5Tickets } = classes
  return (
    <button className={add5Tickets} onClick={() => onClick()}>
      Еще 5 билетов!
    </button>
  )
}
