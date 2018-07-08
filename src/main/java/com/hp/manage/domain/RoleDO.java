package com.hp.manage.domain;

import java.util.Date;
import java.util.List;

public class RoleDO {
	private String id;

	private String roleName;

	private Integer status;

	private Integer isDelete;

	private Date gmtCreate;

	private String createUserId;

	private Date gmtModify;

	private String modifyUserId;

	private String resourceIds;

	private List<RoleResourceDO> roleResources;

	private String areaIds;

	private List<RoleAreaDO> roleAreas;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public Date getGmtModify() {
		return gmtModify;
	}

	public void setGmtModify(Date gmtModify) {
		this.gmtModify = gmtModify;
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public String getResourceIds() {
		return resourceIds;
	}

	public void setResourceIds(String resourceIds) {
		this.resourceIds = resourceIds;
	}

	public List<RoleResourceDO> getRoleResources() {
		return roleResources;
	}

	public void setRoleResources(List<RoleResourceDO> roleResources) {
		this.roleResources = roleResources;
	}

	public String getAreaIds() {
		return areaIds;
	}

	public void setAreaIds(String areaIds) {
		this.areaIds = areaIds;
	}

	public List<RoleAreaDO> getRoleAreas() {
		return roleAreas;
	}

	public void setRoleAreas(List<RoleAreaDO> roleAreas) {
		this.roleAreas = roleAreas;
	}

}