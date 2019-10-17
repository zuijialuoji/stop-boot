package com.stopboot.admin.controller.system.permission;

import com.stopboot.admin.common.ResultData;
import com.stopboot.admin.model.menu.list.MenuListVO;
import com.stopboot.admin.model.menu.list.MenuListVOParams;
import com.stopboot.admin.service.menu.MenuServiceI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @description: 权限
 * @author: Lianyutao
 * @create: 2019-09-24 11:21
 * @version:
 **/
@Slf4j
@RestController
@RequestMapping("permission")
public class PermissionController {
//    @Resource
//    private PermissionServiceI permissionServiceI;

    @Resource
    private MenuServiceI menuServiceI;

    @PostMapping("menu/list")
    public ResultData<MenuListVO> menuList(@RequestBody MenuListVOParams params) {
        ResultData resultData = ResultData.build();
        List<MenuListVO> menuTreeList = menuServiceI.getMenuList(params);
        if (!ObjectUtils.isEmpty(menuTreeList)) {
            resultData.success().setData(menuTreeList);
        } else {
            resultData.empty();
        }
        return resultData;
    }



}