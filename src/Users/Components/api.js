import { fetchData } from "shared/fetchAuth"


export const getAllApi = () => {
  const url = "https://run.mocky.io/v3/77db4039-6c26-4377-9536-6de082d031ab"

  return fetchData(url)
}