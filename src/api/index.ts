import axios from './axios'

// post
export async function postAction(url: string, parameter = {}, options = {}, headers = {}) {
    return await axios({
      url,
      method: 'post',
      data: parameter,
      headers,
      ...options
    }).catch((error: any) => error)
}

// get
export async function getAction(url: string, parameter = {}, options = {}, headers = {}) {
    return await axios({
      url,
      method: 'get',
      params: parameter,
      headers,
      ...options
    }).catch((error: any) => error)
}

// put
export async function putAction(url: string, parameter = {}, options = {}, headers = {}) {
    return await axios({
      url,
      method: 'put',
      data: parameter,
      headers,
      ...options
    }).catch((error: any) => error)
}

// delete
export async function deleteAction(url: any, parameter = {}, options = {}, headers = {}) {
    return await axios({
      url,
      method: 'delete',
      params: parameter,
      headers,
      ...options
    }).catch((error: any) => error)
}