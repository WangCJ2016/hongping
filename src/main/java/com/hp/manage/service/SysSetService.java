package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysSetBO;
import com.hp.manage.domain.SysSetDO;

public interface SysSetService {

	public BaseResultDTO createSysSet(SysSetDO set);

	public BaseResultDTO modifySysSet(SysSetDO set);

	public ResultDTO<SysSetDO> querySysSetById(String id);

	public BatchResultDTO<SysSetDO> querySysSetList(QuerySysSetBO query);

	public BatchResultDTO<SysSetDO> querySysSetPage(QuerySysSetBO query);
}
