package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysCommHostsBO;
import com.hp.manage.domain.SysCommHostsDO;

public interface SysCommHostsService {

	public BaseResultDTO createSysCommHosts(SysCommHostsDO hosts);

	public BaseResultDTO modifySysCommHosts(SysCommHostsDO hosts);

	public ResultDTO<SysCommHostsDO> querySysCommHostsById(String id);

	public BatchResultDTO<SysCommHostsDO> querySysCommHostsList(QuerySysCommHostsBO query);

	public BatchResultDTO<SysCommHostsDO> querySysCommHostsPage(QuerySysCommHostsBO query);
}
