import request from '@/utils/request'

export function sellers(params = {}) {
  return request({
    url: '/sellers',
    method: 'GET',
    params
  })
}


export function write(data) {
  return request({
    url: '/sellers',
    method: 'POST',
    data
  })
}


export function edit(id, data) {
  return request({
    url: '/sellers/'+id,
    method: 'PUT',
    data
  })
}

export function detail(id) {
  return request({
    url: '/sellers/'+id,
    method: 'GET'
  })
}
