package com.stopboot.admin.model.test.test4.update;

import com.stopboot.admin.base.params.BaseUpdateParams;
import lombok.Data;

/**
 * @description:
 * @author: Lianyutao
 * @create: 2019/11/07 18:48
 * @version: 1.0.1
 **/

@Data
public class Test4UpdateParams extends BaseUpdateParams{
        /**
        *id
        *
        */
        private Integer id;
        /**
        *姓名
        *
        */
        private String name;
        /**
        *年龄
        *
        */
        private Integer age;
        /**
        *生日
        *
        */
        private java.util.Date birthday;
        /**
        *信息
        *
        */
        private String info;
        /**
        *状态
        *
        */
        private Integer status;
        /**
        *头像
        *
        */
        private String headImg;
}
