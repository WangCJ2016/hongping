package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.SysServersDO;

public interface SysServersService {

	public BaseResultDTO createSysServers(SysServersDO servers);

	public BaseResultDTO modifySysServers(SysServersDO servers);

	public ResultDTO<SysServersDO> querySysServersById(String id);

	public BatchResultDTO<SysServersDO> querySysServersList(QuerySysServersBO query);

	public BatchResultDTO<SysServersDO> querySysServersPage(QuerySysServersBO query);
}
