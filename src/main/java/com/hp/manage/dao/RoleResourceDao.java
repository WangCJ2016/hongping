package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.domain.RoleResourceDO;

@Repository
public interface RoleResourceDao {

	public int insertRoleResource(RoleResourceDO roleResource);

	public int updateRoleResource(RoleResourceDO roleResource);

	public int deleteRoleResource(String roleId);

	public RoleResourceDO selectRoleResourceById(String id);

	public List<RoleResourceDO> selectRoleResourceList(QueryRoleResourceBO query);

	public int selectRoleResourceCount(QueryRoleResourceBO query);

	public List<RoleResourceDO> selectRoleResourcePage(QueryRoleResourceBO query);
}
