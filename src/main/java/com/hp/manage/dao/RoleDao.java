package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryRoleBO;
import com.hp.manage.domain.RoleDO;

@Repository
public interface RoleDao {

	public int insertRole(RoleDO role);

	public int updateRole(RoleDO role);

	public RoleDO selectRoleById(String id);

	public List<RoleDO> selectRoleList(QueryRoleBO query);

	public int selectRoleCount(QueryRoleBO query);

	public List<RoleDO> selectRolePage(QueryRoleBO query);
}
