package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryRoleAreaBO;
import com.hp.manage.domain.RoleAreaDO;

@Repository
public interface RoleAreaDao {

	public int insertRoleArea(RoleAreaDO roleArea);

	public int updateRoleArea(RoleAreaDO roleArea);

	public int deleteRoleArea(String roleId);

	public RoleAreaDO selectRoleAreaById(String id);

	public List<RoleAreaDO> selectRoleAreaList(QueryRoleAreaBO query);

	public int selectRoleAreaCount(QueryRoleAreaBO query);

	public List<RoleAreaDO> selectRoleAreaPage(QueryRoleAreaBO query);

}
