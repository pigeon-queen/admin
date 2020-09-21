import request from '@/utils/request'

export function auctions(params = {}) {
  return request({
    url: '/auctions',
    method: 'get',
    params
  })
}

export function write(data) {
  return request({
    url: '/auctions',
    method: 'post',
    data
  })
}

export function detail(id) {
  return request({
    url: '/auctions/' + id,
    method: 'get'
  })
}

export function prices(id) {
  return request({
    url: '/auctions/' + id + '/prices',
    method: 'get'
  })
}

export function orders() {
  return request({
    url: '/auctions/orders',
    method: 'get'
  })
}

export function order(id) {
  return request({
    url: '/auctions/orders/'+id,
    method: 'get'
  })
}

export function deliver(id, data) {
  return request({
    url: '/auctions/orders/' + id + '/deliver',
    method: 'post',
    data
  })
}

export function edit(id, data) {
  return request({
    url: '/auctions/' + id,
    method: 'put',
    data
  })
}
