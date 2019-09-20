import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/subjectCate/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/subjectCate/list',
    method:'get',
    params:params
  })
}

export function deleteSubjectCate(params) {
  return request({
    url:'/subjectCate/delete',
    method:'get',
    params:params
  })
}


export function updateShowStatus(params) {
  return request({
    url:'/subjectCate/updateShowStatus',
    method:'get',
    params:params
  })
}

