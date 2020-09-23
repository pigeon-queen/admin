import request from '@/utils/request'

export function goods(params = {}) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}


export function detail(id) {
  return request({
    url: '/goods/' + id,
    method: 'get'
  })
}


export function edit(id, data) {
  return request({
    url: '/goods/' + id,
    method: 'put',
    data
  })
}


export function write(data) {
  return request({
    url: '/goods/',
    method: 'post',
    data
  })
}

export function order(id) {
  return request({
    url: '/goods/orders/' + id,
    method: 'get'
  })
}

export function deliver(id, data) {
  return request({
    url: '/goods/orders/' + id + '/deliver',
    method: 'post',
    data
  })
}

export function orders(params = {}) {
  return request({
    url: '/goods/orders',
    method: 'get',
    params
  })
}

