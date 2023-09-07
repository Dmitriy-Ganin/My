// события сортировка
export const SET_SORTING = 'SET_SORTING'

// данные в переменной sorting, передаются в reducer - а тот отдаст в Store
export const setSorting = (sorting) => ({
  type: SET_SORTING,
  payload: sorting,
})
