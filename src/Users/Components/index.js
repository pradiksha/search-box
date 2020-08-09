import { connect } from 'react-redux'
import get from "lodash/get"

import * as actions from "./action"

const mapStateToProps = (state) => {
  const { usersData } = state
  const {  dashboardData } =  usersData
  const dataList = get(dashboardData, "data.members", []) || []
  const dashboardFetching = get(dashboardData, "isFetching", false)

  return {
    dataList,
    dashboardFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardDataRequest: () => dispatch(actions.getDashboardData.request()),
    getAllDataReq: () => dispatch(actions.getDashboardData.request()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)