import {api} from '@/sdk/api/httpConfig'

/**
 * projectName：stop-boot jssdk
 * author: Lianyutao
 * date: 2019/11/04 20:04
 * version: 1.0.1
 * desc: 分页
 */
export class DeptPageRequest {

    constructor() {
        this.params = {
            // 第几页
            pageNum: undefined,
            // 页面大小
            pageSize: undefined,
            // 
            id: undefined,
            // 创建时间
            createTime: undefined,
            // 更新时间
            updateTime: undefined,
            // 操作者id
            opUserId: undefined,
            // 状态（1正常使用，0不使用）
            status: undefined,
            // 删除标识（0删除，1未删除）
            deleteFlag: undefined,
        }
    }

    //设置分页参数
    setPageSize(pageSize) {
        this.params.pageSize = pageSize
        return this;
    }

    setPageNum(pageNum) {
        this.params.pageNum = pageNum
        return this;
    }

    setId(id) {
        this.params.id = id
        return this;
    }

    setCreateTime(createTime) {
        this.params.createTime = createTime
        return this;
    }

    setUpdateTime(updateTime) {
        this.params.updateTime = updateTime
        return this;
    }

    setOpUserId(opUserId) {
        this.params.opUserId = opUserId
        return this;
    }

    setStatus(status) {
        this.params.status = status
        return this;
    }

    setDeleteFlag(deleteFlag) {
        this.params.deleteFlag = deleteFlag
        return this;
    }

    //参数快捷设置
    setParams(params) {
        this.params = params
        return this;
    }

    api() {
        const path = '/system/dept/page'
        return new Promise(resolve => {
            api(path, this.params)
            .then(response => {
                resolve(response)
            })
        })
    }
}

//引用链接
//import {DeptPageRequest} from '@/sdk/api/system/dept/page'
/*
    //快捷参数使用方式（params需满足如下格式,可设置在Vue的data()中）
    data() {
        return {
            deptPageParams: {
                    // 
                    id: undefined,
                    // 创建时间
                    createTime: undefined,
                    // 更新时间
                    updateTime: undefined,
                    // 操作者id
                    opUserId: undefined,
                    // 状态（1正常使用，0不使用）
                    status: undefined,
                    // 删除标识（0删除，1未删除）
                    deleteFlag: undefined,
            },
        }
    },

    let request = new DeptPageRequest();
    request.setParams(deptPageParams).api().then(res => {
        console.log("DeptPageRequest res:", res)
    })

    //单独设置参数方式一
    let request = new DeptPageRequest();
    request.
            setId(id).
            setCreateTime(createTime).
            setUpdateTime(updateTime).
            setOpUserId(opUserId).
            setStatus(status).
            setDeleteFlag(deleteFlag).
            api().then(res => {
                console.log("DeptPageRequest res:", res)
    })

    //单独设置参数方式二
    let request = new DeptPageRequest();
    request.setId(id);
    request.setCreateTime(createTime);
    request.setUpdateTime(updateTime);
    request.setOpUserId(opUserId);
    request.setStatus(status);
    request.setDeleteFlag(deleteFlag);
    request.api().then(res => {
        console.log("DeptPageRequest res:", res)
    })

*/
