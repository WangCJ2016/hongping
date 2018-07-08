package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.domain.RoleResourceDO;

public interface RoleResourceService {

	public BaseResultDTO createRoleResource(RoleResourceDO roleResource);

	public BaseResultDTO modifyRoleResource(RoleResourceDO roleResource);

	public BaseResultDTO deleteRoleResource(String roleId);

	public ResultDTO<RoleResourceDO> queryRoleResourceById(String id);

	public BatchResultDTO<RoleResourceDO> queryRoleResourceList(QueryRoleResourceBO query);

	public BatchResultDTO<RoleResourceDO> queryRoleResourcePage(QueryRoleResourceBO query);
}
