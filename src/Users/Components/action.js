import { createSignalAction } from "shared/util"

export const USER = "USER"
export const GET_USER_DATA = "GET_DASHBOARD_DATA"

export const getDashboardData = createSignalAction(USER, GET_USER_DATA)

