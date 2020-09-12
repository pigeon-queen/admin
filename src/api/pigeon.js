import request from '@/utils/request'

export function pigeons(params = {}) {

  return request({
    url: '/pigeons',
    method: 'GET',
    params
  })
}

export function write(data) {

  return request({
    url: '/pigeons',
    method: 'POST',
    data
  })
}

export function edit(id, data) {
  return request({
    url: '/pigeons/'+id,
    method: 'PUT',
    data
  })
}

export function detail(id) {

  return request({
    url: '/pigeons/' + id,
    method: 'GET'
  })
}
