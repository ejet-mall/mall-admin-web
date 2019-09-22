import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'get',
    params:params
  })
}
export function createSubject(data) {
  return request({
    url:'/subject/create',
    method:'post',
    data:data
  })
}

export function updateRecommendStatus(params) {
  return request({
    url:'/subject/update/recommendStatus',
    method:'post',
    params:params
  })
}

export function updateShowStatus(params) {
  return request({
    url:'/subject/update/showStatus',
    method:'post',
    params:params
  })
}

export function updateSubject(id,data) {
  return request({
    url:'/subject/update/'+id,
    method:'post',
    data:data
  })
}

export function deleteSubject(id) {
  return request({
    url:'/subject/delete/'+id,
    method:'post'
  })
}

export function getSubject(id) {
  return request({
    url:'/subject/'+id,
    method:'get',
  })
}



