import {Base} from './base.js'

class Home extends Base{

  getBanner(_type){
    let params = {
      url:`/resources/${_type}/banners`,
      method:'GET'
    }
    return this.request(params).then(res=>{
        return res
    })
  }

  getCategory(_type){
      let params = {
          url: `/resources/${_type}/category`,
          method: 'GET'
      }
      return this.request(params).then(res => {
          return res
      })
  }

  getHomeList(resourceType,_type,page,size){
      _type = _type || 0
      page = page || 1
      size = size || 10
      let params = {
          url: `/resources`,
          method: 'GET',
          data:{
              resourceType:resourceType,
              type:_type,
              page:page,
              size:size
          }
      }
      return this.request(params).then(res=>{
          return res
      })
  }

  getDetail(id){
      let params = {
          url: `/resources/${id}`,
          method: 'GET'
      }
      return this.request(params).then(res => {
          return res
      })
  }

  getYZM(phone){
      let params = {
          url: `/smsCode`,
          method: 'GET',
          data:{
              phone:phone
          }
      }
      return this.request(params).then(res => {
          return res
      })
  }

  getComment(id,page,size){
      page = page || 1
      size = size || 10
      let params = {
          url: `/resources/${id}/reviews`,
          method: 'GET',
          data:{
              page:page,
              size:size
          }
      }
      return this.request(params).then(res => {
          return res
      })
  }

  postComment(id,comment){
      let params = {
          url: `/myReview`,
          method: 'POST',
          data:{
              resourceId:id,
              review:comment
          }
      }
      return this.request(params).then(res => {
          return res
      })
  }

  addCollection(id,_type){
      let params = {
          url: `/myCollection`,
          method: 'POST',
          data: {
              id: id,
              type:_type
          }
      }
      return this.request(params).then(res => {
          return res
      })
  }

  deleteCollection(id) {
      let params = {
          url: `/myCollection`,
          method: 'DELETE',
          data: {
              id: id
          }
      }
      return this.request(params).then(res => {
          return res
      })
  }
}

export {Home}