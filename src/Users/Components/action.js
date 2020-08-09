import { createSignalAction, createActionCreator } from "shared/util"

export const USER = "USER"
export const GET_USER_DATA = "GET_DASHBOARD_DATA"

export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY"

export const SELECTED_DATE = "SELECTED_DATE"

export const START_TIME = "START_TIME"

export const END_TIME = "END_TIME"

export const TIME_RANGE = "TIME_RANGE"

export const getDashboardData = createSignalAction(USER, GET_USER_DATA)

export const setModalVisibility = createActionCreator(SET_MODAL_VISIBILITY)

export const setSelectedDate = createActionCreator(SELECTED_DATE)

export const setStartTime = createActionCreator(START_TIME)

export const setEndTime = createActionCreator(END_TIME)

export const setTimeRange = createActionCreator(TIME_RANGE)
