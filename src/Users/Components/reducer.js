import { initialState, reducer } from "shared/util"
import * as actions from "./action"

const initialObj = {
  empData: initialState,
  dashboardData: initialState,
  updatedData: initialState,
  deletedData: initialState,
  isModalOpen: false,
  selectedFromDate: new Date(),
  startTime: "00:00",
  endTime: "00:00",
  value: {
    start: "00:00",
    end: "00:00",
  }
}

const userReducer = (state = initialObj, action) => {
  switch (action.type) {
    case actions.getDashboardData.REQUEST:
    case actions.getDashboardData.SUCCESS:
    case actions.getDashboardData.FAILURE:
    case actions.getDashboardData.CLEAR:
      return {
        ...state,
        dashboardData: reducer(state.dashboardData, action, actions.getDashboardData)
      }
    case actions.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalOpen: action.data,
      }
    case actions.SELECTED_DATE:
      return {
        ...state,
        selectedFromDate: action.data,
      }
    case actions.START_TIME:
      return {
        ...state,
        startTime: action.data,
      }
    case actions.END_TIME:
      return {
        ...state,
        endTime: action.data,
      }
    case actions.TIME_RANGE:
      return {
        ...state,
        value: { ...action.data },
      }
    default:
      return state
  }
}

export default userReducer
