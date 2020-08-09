import { initialState, reducer } from "shared/util"
import * as actions from "./action"

const initialObj = {
  dashboardData: initialState,
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
    default:
      return state
  }
}

export default userReducer
