function createError(response, json) {
    return {
      status: response.status,
      statusMessage: response.statusMessage,
      json,
    }
  }
  
  function createHeader(headers) {
    // fetch current auth headers from storage
    const nextHeaders = headers || {}
    if (headers) {
      if (!headers["Content-Type"]) {
        nextHeaders["Content-Type"] = "application/json"
      }
    } else {
      nextHeaders["Content-Type"] = "application/json"
    }
    return nextHeaders
  }
  
  export function successHandler(response) {
    if (response.status !== 204) {
      return response
        .json()
        .then((json) => {
          return Promise.resolve(json)
        })
        .catch(() =>
          Promise.resolve({
            status: "ok",
            data: null,
          })
        )
    }
    return Promise.resolve({ status: 204 })
  }
  
  export function fetchData(url, options = {}) {
    try {
      const { headers, body, isFormData } = options
      const updatedOptions = {
        ...options,
      }
      if (!isFormData) {
        updatedOptions.headers = createHeader(headers, url)
      }
      if (body && !isFormData) {
        updatedOptions.body = JSON.stringify(body)
      }
      delete updatedOptions.isFormData
      return fetch(url, updatedOptions)
        .then((response) => {
          return successHandler(response)
        })
        .catch(e => Promise.reject(createError({
          status: "500FE",
          statusMessage: {
            code: "500FE",
            description: e.message || "Something went wrong",
          },
        })))
    } catch (e) {
      return Promise.reject(createError({
        status: "500FE",
        statusMessage: {
          code: "500FE",
          description: e.message || "Something went wrong",
        },
      }))
    }
  }
  