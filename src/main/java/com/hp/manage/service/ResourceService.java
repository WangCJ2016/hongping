package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryResourceBO;
import com.hp.manage.domain.ResourceDO;

public interface ResourceService {

	public BaseResultDTO createResource(ResourceDO resource);

	public BaseResultDTO modifyResource(ResourceDO resource);

	public ResultDTO<ResourceDO> queryResourceById(String id);

	public BatchResultDTO<ResourceDO> queryResourceList(QueryResourceBO query);

	public BatchResultDTO<ResourceDO> queryResourcePage(QueryResourceBO query);
}
