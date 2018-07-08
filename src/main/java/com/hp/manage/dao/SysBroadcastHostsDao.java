package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysBroadcastHostsBO;
import com.hp.manage.domain.SysBroadcastHostsDO;

@Repository
public interface SysBroadcastHostsDao {

	public int insertSysBroadcastHosts(SysBroadcastHostsDO hosts);

	public int updateSysBroadcastHosts(SysBroadcastHostsDO hosts);

	public SysBroadcastHostsDO selectSysBroadcastHostsById(String id);

	public List<SysBroadcastHostsDO> selectSysBroadcastHostsList(QuerySysBroadcastHostsBO query);

	public int selectSysBroadcastHostsCount(QuerySysBroadcastHostsBO query);

	public List<SysBroadcastHostsDO> selectSysBroadcastHostsPage(QuerySysBroadcastHostsBO query);

}
