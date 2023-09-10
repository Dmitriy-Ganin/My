// по аналогии с Фильтром
// useD - получает функцию dispatch из стор
// useS - получает из reducera данные нужного компонента
import { useDispatch, useSelector } from 'react-redux'

// событие сортировки...экшн
import { setSorting } from '../../Action/sorting-actions'

import classes from './TabsAirLines.module.css'

export const TabsAirLines = () => {
  const { tabsAirLines, active, itemTabs } = classes

  const dispatch = useDispatch()
  // получаю из reducera состояния сортировки по Tab
  const sorting = useSelector((state) => state.sortReducer.sorting)

  // сортировка билетов
  // setSorting передаст экшн sorting в reducer...а он обновит состояния в стор
  const changeTab = (sorting) => {
    dispatch(setSorting(sorting))
  }

  // сортировка меняет стили
  return (
    <div className={tabsAirLines}>
      <button
        className={sorting === 'cheapest' ? `${itemTabs} ${active}` : `${itemTabs}`}
        onClick={() => changeTab('cheapest')} //отправлю новое значение обновить свойство sorting в редукторе
      >
        Самый дешевый
      </button>
      <button
        className={sorting === 'fastest' ? `${itemTabs} ${active}` : `${itemTabs}`}
        onClick={() => changeTab('fastest')}
      >
        Самый быстрый
      </button>
      <button
        className={sorting === 'optimal' ? `${itemTabs} ${active}` : `${itemTabs}`}
        onClick={() => changeTab('optimal')}
      >
        Оптимальный
      </button>
    </div>
  )
}
