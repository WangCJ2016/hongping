package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.SysServersDO;

@Repository
public interface SysServersDao {

	public int insertSysServers(SysServersDO servers);

	public int updateSysServers(SysServersDO servers);

	public SysServersDO selectSysServersById(String id);

	public List<SysServersDO> selectSysServersList(QuerySysServersBO query);

	public int selectSysServersCount(QuerySysServersBO query);

	public List<SysServersDO> selectSysServersPage(QuerySysServersBO query);

}
