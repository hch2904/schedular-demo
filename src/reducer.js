export const ACTIONS = {
  CREATE_SCHEDULE: 'CREATE_SCHEDULE'
};

export const scheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_SCHEDULE:
      const { name, shift, day } = action.payload
      const newShift = {
        name: name,
        shift: shift,
        day: day
      }
      const existingShift = state.find((schedule) => schedule.shift === shift && schedule.day === day);
      if (existingShift) {
        return [
          ...state.filter((schedule) => !(schedule.shift === shift && schedule.day === day)),
          newShift
        ]
      }
      return [
        ...state,
        newShift
      ];
    default:
      return
  }
};