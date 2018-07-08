package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ResourceDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3929744999298074338L;

	private String id;

	private String resourceName;

	private String resourceUrl;

	private String parentId;

	private Integer sequence;

	private Date gmtCreate;

	private Integer isDelete;

	private Integer level;

	private String index;

	private List<ResourceDO> childResources;

	private String checked;

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

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public List<ResourceDO> getChildResources() {
		return childResources;
	}

	public void setChildResources(List<ResourceDO> childResources) {
		this.childResources = childResources;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

}