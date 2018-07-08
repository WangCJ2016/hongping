package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryRoleBO;
import com.hp.manage.domain.RoleDO;

public interface RoleService {

	public BaseResultDTO createRole(RoleDO role);

	public BaseResultDTO modifyRole(RoleDO role);

	public ResultDTO<RoleDO> queryRoleById(String id);

	public BatchResultDTO<RoleDO> queryRoleList(QueryRoleBO query);

	public BatchResultDTO<RoleDO> queryRolePage(QueryRoleBO query);
}
