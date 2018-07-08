package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysBroadcastHostsBO;
import com.hp.manage.domain.SysBroadcastHostsDO;

public interface SysBroadcastHostsService {

	public BaseResultDTO createSysBroadcastHosts(SysBroadcastHostsDO hosts);

	public BaseResultDTO modifySysBroadcastHosts(SysBroadcastHostsDO hosts);

	public ResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsById(String id);

	public BatchResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsList(QuerySysBroadcastHostsBO query);

	public BatchResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsPage(QuerySysBroadcastHostsBO query);
}
