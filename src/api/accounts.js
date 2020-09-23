import request from '@/utils/request'

export function accounts(query) {
  return request({
    url: '/accounts',
    method: 'get',
    params: query
  })
}
