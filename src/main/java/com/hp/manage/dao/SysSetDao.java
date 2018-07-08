package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysSetBO;
import com.hp.manage.domain.SysSetDO;

@Repository
public interface SysSetDao {

	public int insertSysSet(SysSetDO set);

	public int updateSysSet(SysSetDO set);

	public SysSetDO selectSysSetById(String id);

	public List<SysSetDO> selectSysSetList(QuerySysSetBO query);

	public int selectSysSetCount(QuerySysSetBO query);

	public List<SysSetDO> selectSysSetPage(QuerySysSetBO query);

}
