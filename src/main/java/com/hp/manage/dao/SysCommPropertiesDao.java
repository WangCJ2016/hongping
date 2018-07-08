package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysCommPropertiesBO;
import com.hp.manage.domain.SysCommPropertiesDO;

@Repository
public interface SysCommPropertiesDao {

	public int insertSysCommProperties(SysCommPropertiesDO property);

	public int updateSysCommProperties(SysCommPropertiesDO property);

	public SysCommPropertiesDO selectSysCommPropertiesById(String id);

	public List<SysCommPropertiesDO> selectSysCommPropertiesList(QuerySysCommPropertiesBO query);

	public int selectSysCommPropertiesCount(QuerySysCommPropertiesBO query);

	public List<SysCommPropertiesDO> selectSysCommPropertiesPage(QuerySysCommPropertiesBO query);

}
