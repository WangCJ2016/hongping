package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysCommHostsBO;
import com.hp.manage.domain.SysCommHostsDO;

@Repository
public interface SysCommHostsDao {

	public int insertSysCommHosts(SysCommHostsDO hosts);

	public int updateSysCommHosts(SysCommHostsDO hosts);

	public SysCommHostsDO selectSysCommHostsById(String id);

	public List<SysCommHostsDO> selectSysCommHostsList(QuerySysCommHostsBO query);

	public int selectSysCommHostsCount(QuerySysCommHostsBO query);

	public List<SysCommHostsDO> selectSysCommHostsPage(QuerySysCommHostsBO query);

}
