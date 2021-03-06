package com.stopboot.admin.mapper.mybatis;

import com.stopboot.admin.entity.SbMenu;
import com.stopboot.admin.entity.SbMenuExample;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SbMenuMapper {
    int countByExample(SbMenuExample example);

    int deleteByExample(SbMenuExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SbMenu record);

    int insertSelective(SbMenu record);

    List<SbMenu> selectByExample(SbMenuExample example);

    SbMenu selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SbMenu record, @Param("example") SbMenuExample example);

    int updateByExample(@Param("record") SbMenu record, @Param("example") SbMenuExample example);

    int updateByPrimaryKeySelective(SbMenu record);

    int updateByPrimaryKey(SbMenu record);
}
