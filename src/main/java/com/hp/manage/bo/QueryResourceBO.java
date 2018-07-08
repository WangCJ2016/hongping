package com.hp.manage.bo;

import java.util.Date;
import java.util.List;

import com.hp.commons.bo.BaseQueryBO;
import com.hp.manage.domain.RoleResourceDO;

public class QueryResourceBO extends BaseQueryBO {
	/**
	 * 
	 */
	private static final long serialVersionUID = -7403216102410406235L;

	private String id;

	private String resourceName;

	private String resourceUrl;

	private String parentId;

	private Integer sequence;

	private Date gmtCreate;

	private Integer isDelete;

	private Integer level;

	private List<RoleResourceDO> roleReources;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	public String getResourceUrl() {
		return resourceUrl;
	}

	public void setResourceUrl(String resourceUrl) {
		this.resourceUrl = resourceUrl;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public Integer getSequence() {
		return sequence;
	}

	public void setSequence(Integer sequence) {
		this.sequence = sequence;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public List<RoleResourceDO> getRoleReources() {
		return roleReources;
	}

	public void setRoleReources(List<RoleResourceDO> roleReources) {
		this.roleReources = roleReources;
	}

}