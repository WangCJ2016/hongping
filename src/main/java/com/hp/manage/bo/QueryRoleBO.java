package com.hp.manage.bo;

import java.util.Date;
import java.util.List;

import com.hp.commons.bo.BaseQueryBO;

public class QueryRoleBO extends BaseQueryBO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2805656644275410622L;

	private Long id;

	private String roleName;

	private Integer status;

	private Integer isDelete;

	private Date gmtCreate;

	private Long createUserId;

	private Date gmtModify;

	private Long modifyUserId;

	private String resourceIds;

	private List<QueryRoleResourceBO> roleResources;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName == null ? null : roleName.trim();
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

	public Long getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(Long createUserId) {
		this.createUserId = createUserId;
	}

	public Date getGmtModify() {
		return gmtModify;
	}

	public void setGmtModify(Date gmtModify) {
		this.gmtModify = gmtModify;
	}

	public Long getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(Long modifyUserId) {
		this.modifyUserId = modifyUserId;
	}

	public String getResourceIds() {
		return resourceIds;
	}

	public void setResourceIds(String resourceIds) {
		this.resourceIds = resourceIds;
	}

	public List<QueryRoleResourceBO> getRoleResources() {
		return roleResources;
	}

	public void setRoleResources(List<QueryRoleResourceBO> roleResources) {
		this.roleResources = roleResources;
	}

}