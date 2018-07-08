package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysRemoteHostsBO;
import com.hp.manage.domain.SysRemoteHostsDO;

public interface SysRemoteHostsService {

	public BaseResultDTO createSysRemoteHosts(SysRemoteHostsDO hosts);

	public BaseResultDTO modifySysRemoteHosts(SysRemoteHostsDO hosts);

	public ResultDTO<SysRemoteHostsDO> querySysRemoteHostsById(String id);

	public BatchResultDTO<SysRemoteHostsDO> querySysRemoteHostsList(QuerySysRemoteHostsBO query);

	public BatchResultDTO<SysRemoteHostsDO> querySysRemoteHostsPage(QuerySysRemoteHostsBO query);
}
