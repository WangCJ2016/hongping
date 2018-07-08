package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysCommPropertiesBO;
import com.hp.manage.domain.SysCommPropertiesDO;

public interface SysCommPropertiesService {

	public BaseResultDTO createSysCommProperties(SysCommPropertiesDO property);

	public BaseResultDTO modifySysCommProperties(SysCommPropertiesDO property);

	public ResultDTO<SysCommPropertiesDO> querySysCommPropertiesById(String id);

	public BatchResultDTO<SysCommPropertiesDO> querySysCommPropertiesList(QuerySysCommPropertiesBO query);

	public BatchResultDTO<SysCommPropertiesDO> querySysCommPropertiesPage(QuerySysCommPropertiesBO query);
}
