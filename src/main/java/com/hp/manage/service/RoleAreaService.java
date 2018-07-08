package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryRoleAreaBO;
import com.hp.manage.domain.RoleAreaDO;

public interface RoleAreaService {

	public BaseResultDTO createRoleArea(RoleAreaDO roleArea);

	public BaseResultDTO modifyRoleArea(RoleAreaDO roleArea);

	public BaseResultDTO deleteRoleArea(String roleId);

	public ResultDTO<RoleAreaDO> queryRoleAreaById(String id);

	public BatchResultDTO<RoleAreaDO> queryRoleAreaList(QueryRoleAreaBO query);

	public BatchResultDTO<RoleAreaDO> queryRoleAreaPage(QueryRoleAreaBO query);
}
