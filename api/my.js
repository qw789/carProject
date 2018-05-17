import {Base} from "./base.js"

class My extends Base{

    getQuestions(page){
        page = page || 1
        let params = {
            method:'GET',
            url:'/questions',
            data:{
                page:page
            }
        }

        return this.request(params).then(res=>{
            return res
        })
    }

    getMyQuestions(page){
        page = page || 1
        let params = {
            method: 'GET',
            url: '/myQuestion',
            data:{
                page:page
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    postQuestion(question){
        let params = {
            method: 'POST',
            url: '/myQuestion',
            data:{
                question:question
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    postAddress(cityName,countyName,detailInfo,nationalCode,postalCode,provinceName,telNumber,userName){
        let params = {
            method: 'POST',
            url: '/address',
            data: {
                cityName:cityName,
                countyName:countyName,
                detailInfo:detailInfo,
                nationalCode:nationalCode,
                postalCode:postalCode,
                provinceName:provinceName,
                telNumber:telNumber,
                userName:userName
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    getMyMsg(){
        let params = {
            method: 'GET',
            url: '/myMessage'
        }
        return this.request(params).then(res => {
            return res
        })
    }

    postFeedBack(content){
        let params = {
            method: 'POST',
            url: '/feedback',
            data:{
                content:content
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    postUserInfo(phone,name,avatar,remark){
        if(phone){
            phone = phone.toString()
        }
        let params = {
            method: 'POST',
            url: '/info',
            data: {
                mobilePhone:phone,
                nickname:name,
                profilePicture:avatar,
                remark:remark
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    getUserInfo(){
        let params = {
            method: 'GET',
            url: '/info'
        }
        return this.request(params).then(res => {
            return res
        })
    }

    uploadPicture(file){
        let params = {
            method: 'POST',
            url: '/user/profilePicture',
            data:{
                file:file
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    postPhone(yzm,phone){
        let params = {
            method: 'POST',
            url: '/phone',
            data: {
                captcha:yzm,
                phone:phone
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    getCollection(_type,page,size){
        page = page || 1
        size = size || 10
        let params = {
            method: 'GET',
            url: `/myCollection/${_type}`,
            data:{
                page:page,
                size:size
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    getBrowse(page,size){
        page = page || 1
        size = size || 15
        let params = {
            method: 'GET',
            url: `/mybrowse`,
            data: {
                page: page,
                size: size
            }
        }
        return this.request(params).then(res => {
            return res
        })
    }

    deleteBrowse(id){
        let params = {
            method: 'DELETE',
            url: `/mybrowse/${id}`
        }
        return this.request(params).then(res => {
            return res
        })
    }
}

export {My}