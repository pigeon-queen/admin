import request from '@/utils/request'

export function banners(params = {}) {
  return request({
    url: '/bannners',
    method: 'get',
    params
  })
}


export function detail(id) {
  return request({
    url: '/bannners/' + id,
    method: 'get'
  })
}


export function edit(id, data) {
  return request({
    url: '/bannners/' + id,
    method: 'put',
    data
  })
}


export function write(data) {
  return request({
    url: '/bannners/',
    method: 'post',
    data
  })
}

