import request from '@/utils/request'

export function counts() {
  return request({
    url: '/counts',
    method: 'get',
  })
}
