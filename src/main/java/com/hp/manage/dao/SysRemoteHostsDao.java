package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysRemoteHostsBO;
import com.hp.manage.domain.SysRemoteHostsDO;

@Repository
public interface SysRemoteHostsDao {

	public int insertSysRemoteHosts(SysRemoteHostsDO hosts);

	public int updateSysRemoteHosts(SysRemoteHostsDO hosts);

	public SysRemoteHostsDO selectSysRemoteHostsById(String id);

	public List<SysRemoteHostsDO> selectSysRemoteHostsList(QuerySysRemoteHostsBO query);

	public int selectSysRemoteHostsCount(QuerySysRemoteHostsBO query);

	public List<SysRemoteHostsDO> selectSysRemoteHostsPage(QuerySysRemoteHostsBO query);

}
