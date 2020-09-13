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

export function edit(id, data) {
  return request({
    url: '/auctions/' + id,
    method: 'put',
    data
  })
}
