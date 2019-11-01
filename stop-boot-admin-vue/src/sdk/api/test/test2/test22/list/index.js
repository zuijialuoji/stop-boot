import {api} from '@/sdk/api/httpConfig'

/**
 * projectName：stop-boot jssdk
 * author: Lianyutao
 * date: 2019/11/01 17:09
 * version: 1.0.1
 * desc: 列表
 */
export class Test22ListRequest {

    constructor() {
        this.params = {
            // 
            id: undefined,
            // 姓名
            name: undefined,
            // 年龄
            age: undefined,
            // 生日
            birthday: undefined,
            // 创建时间
            createTime: undefined,
            // 信息
            info: undefined,
            // 状态
            status: undefined,
            // 头像
            headImg: undefined,
            // 删除标记（1正常，0删除）
            deleteFlag: undefined,
            // 更新时间
            updateTime: undefined,
        }
    }


    setId(id) {
        this.params.id = id
        return this;
    }

    setName(name) {
        this.params.name = name
        return this;
    }

    setAge(age) {
        this.params.age = age
        return this;
    }

    setBirthday(birthday) {
        this.params.birthday = birthday
        return this;
    }

    setCreateTime(createTime) {
        this.params.createTime = createTime
        return this;
    }

    setInfo(info) {
        this.params.info = info
        return this;
    }

    setStatus(status) {
        this.params.status = status
        return this;
    }

    setHeadImg(headImg) {
        this.params.headImg = headImg
        return this;
    }

    setDeleteFlag(deleteFlag) {
        this.params.deleteFlag = deleteFlag
        return this;
    }

    setUpdateTime(updateTime) {
        this.params.updateTime = updateTime
        return this;
    }

    //参数快捷设置
    setParams(params) {
        this.params = params
        return this;
    }

    api() {
        const path = '/test/test2/test22/list'
        return new Promise(resolve => {
            api(path, this.params)
            .then(response => {
                resolve(response)
            })
        })
    }
}

//引用链接
//import {Test22ListRequest} from '@/sdk/api/test/test2/test22/list'
/*
    //快捷参数使用方式（params需满足如下格式,可设置在Vue的data()中）
    data() {
        return {
            test22ListParams: {
                    // 
                    id: undefined,
                    // 姓名
                    name: undefined,
                    // 年龄
                    age: undefined,
                    // 生日
                    birthday: undefined,
                    // 创建时间
                    createTime: undefined,
                    // 信息
                    info: undefined,
                    // 状态
                    status: undefined,
                    // 头像
                    headImg: undefined,
                    // 删除标记（1正常，0删除）
                    deleteFlag: undefined,
                    // 更新时间
                    updateTime: undefined,
            },
        }
    },

    let request = new Test22ListRequest();
    request.setParams(test22ListParams).api().then(res => {
        console.log("Test22ListRequest res:", res)
    })

    //单独设置参数方式一
    let request = new Test22ListRequest();
    request.
            setId(id).
            setName(name).
            setAge(age).
            setBirthday(birthday).
            setCreateTime(createTime).
            setInfo(info).
            setStatus(status).
            setHeadImg(headImg).
            setDeleteFlag(deleteFlag).
            setUpdateTime(updateTime).
            api().then(res => {
                console.log("Test22ListRequest res:", res)
    })

    //单独设置参数方式二
    let request = new Test22ListRequest();
    request.setId(id);
    request.setName(name);
    request.setAge(age);
    request.setBirthday(birthday);
    request.setCreateTime(createTime);
    request.setInfo(info);
    request.setStatus(status);
    request.setHeadImg(headImg);
    request.setDeleteFlag(deleteFlag);
    request.setUpdateTime(updateTime);
    request.api().then(res => {
        console.log("Test22ListRequest res:", res)
    })

*/
