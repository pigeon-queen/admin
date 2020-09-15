import request from '@/utils/request'

export function articles(params = {}) {
  return request({
    url: '/articles',
    method: 'get',
    params
  })
}


export function detail(id) {
  return request({
    url: '/articles/' + id,
    method: 'get'
  })
}


export function edit(id, data) {
  return request({
    url: '/articles/' + id,
    method: 'put',
    data
  })
}


export function write(data) {
  return request({
    url: '/articles/',
    method: 'post',
    data
  })
}


export function categories() {
  return request({
    url: '/articles/categories',
    method: 'get'
  })
}
