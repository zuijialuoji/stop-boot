import {post} from '@/sdk/sccapi/http'

export class CourseListRequest {
  constructor () {
    this.data = {
      pageSize: undefined,
      pageNum: undefined
    }
  }
  setPageSize (pageSize) {
    this.data.pageSize = pageSize
  }
  setPageNum (pageNum) {
    this.data.pageNum = pageNum
  }
}

export class CourseListResponse {
  constructor (data) {
    this.data = data
  }
  getData () {
    return this.data
  }
}

export function api (request) {
  var data = request.data
  // eslint-disable-next-line eqeqeq
  if (data['pageNum'] == undefined) {
    console.error('pageNum 参数不能为空')
  }
  const path = 'course/list'
  return new Promise(resolve => {
    post(path, data)
      .then(res => {
        resolve(new CourseListResponse(res))
      })
  })
}