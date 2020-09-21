import request from '@/utils/request'

export function storeMeta(data) {
  return request({
    url: '/metas',
    method: 'post',
    data
  })
}

export function getMeta(key) {
  return request({
    url: '/metas/' + key,
    method: 'get',
  })
}

export function delivers() {
  return request({
    url: '/metas/delivers',
    method: 'get',
  })
}
