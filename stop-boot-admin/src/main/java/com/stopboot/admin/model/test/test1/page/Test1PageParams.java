package com.stopboot.admin.model.test.test1.page;

import com.stopboot.admin.base.params.BasePageParams;
import lombok.Data;

/**
 * @description:
 * @author: Lianyutao
 * @create: 2019/10/25 10:03
 * @version: 1.0.1
 **/

@Data
public class Test1PageParams extends BasePageParams{
    /**
     *姓名
     *
     */
    private String name;
    /**
     *年龄
     *
     */
    private String age;
    /**
     *生日
     *
     */
    private String birthday;
    /**
     *创建时间
     *
     */
    private String createTime;
    /**
     *信息
     *
     */
    private String info;
    /**
     *状态
     *
     */
    private String status;
    /**
     *头像
     *
     */
    private String headImg;
    /**
     *删除标记（1正常，0删除）
     *
     */
    private String deleteFlag;
    /**
     *更新时间
     *
     */
    private String updateTime;
}
