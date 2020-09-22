import request from '@/utils/request'

export function articles(params = {}) {
  return request({
    url: '/notices',
    method: 'get',
    params
  })
}


export function detail(id) {
  return request({
    url: '/notices/' + id,
    method: 'get'
  })
}


export function edit(id, data) {
  return request({
    url: '/notices/' + id,
    method: 'put',
    data
  })
}


export function write(data) {
  return request({
    url: '/notices',
    method: 'post',
    data
  })
}

