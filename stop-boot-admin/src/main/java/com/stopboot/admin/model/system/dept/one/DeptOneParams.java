package com.stopboot.admin.model.system.dept.one;

import com.stopboot.admin.base.params.BaseOneParams;
import lombok.Data;

/**
 * @description:
 * @author: Lianyutao
 * @create: 2019/11/04 20:04
 * @version: 1.0.1
 **/

@Data
public class DeptOneParams extends BaseOneParams{
    /**
     *创建时间
     *
     */
    private java.util.Date createTime;
    /**
     *更新时间
     *
     */
    private java.util.Date updateTime;
    /**
     *操作者id
     *
     */
    private Integer opUserId;
    /**
     *状态（1正常使用，0不使用）
     *
     */
    private Integer status;
    /**
     *删除标识（0删除，1未删除）
     *
     */
    private Integer deleteFlag;
}
