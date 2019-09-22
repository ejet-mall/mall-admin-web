import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/subjectCategory/list',
    method:'get',
    params:params
  })
}
export function deleteSubjectCate(id) {
  return request({
    url:'/subjectCategory/delete/'+id,
    method:'post'
  })
}

export function createSubjectCate(data) {
  return request({
    url:'/subjectCategory/create',
    method:'post',
    data:data
  })
}

export function updateSubjectCate(id,data) {
  return request({
    url:'/subjectCategory/update/'+id,
    method:'post',
    data:data
  })
}


export function updateShowStatus(data) {
  return request({
    url:'/subjectCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function getSubjectCate(id) {
  return request({
    url:'/subjectCategory/'+id,
    method:'get',
  })
}

