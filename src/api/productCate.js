import request from '@/utils/request'
export function fetchList(parentId,params) {
  return request({
    url:'/productCategory/list/'+parentId,
    //url:'/productCategory/list/tree'+parentId,
    method:'get',
    params:params
  })
}
export function deleteProductCate(id) {
  return request({
    url:'/productCategory/delete/'+id,
    method:'post'
  })
}

export function createProductCate(data) {
  return request({
    url:'/productCategory/create',
    method:'post',
    data:data
  })
}

export function updateProductCate(id,data) {
  return request({
    url:'/productCategory/update/'+id,
    method:'post',
    data:data
  })
}
//获取所有分类平行结构
export function getAllCate(){
  return request({
    url:'/productCategory/list/withArray',
    method:'get'
  })
}

export function getProductCate(id) {
  return request({
    url:'/productCategory/'+id,
    method:'get',
  })
}

export function updateShowStatus(data) {
  return request({
    url:'/productCategory/update/showStatus',
    method:'post',
    data:data
  })
}

export function updateNavStatus(data) {
  return request({
    url:'/productCategory/update/navStatus',
    method:'post',
    data:data
  })
}

export function fetchListWithChildren() {
  return request({
    //url:'/productCategory/list/withChildren',
    url:'/productCategory/list/withTree',
    method:'get'
  })
}
