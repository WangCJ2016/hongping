package com.hp.manage.domain;

import java.util.Date;
import java.util.List;

public class SysRemotePreviewDO {
	private String id;

	private String title;

	private String parentId;

	private String devId;

	private Integer devType;

	private Date gmtCreate;

	private List<SysRemotePreviewDO> previews;

	private String devName;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getDevId() {
		return devId;
	}

	public void setDevId(String devId) {
		this.devId = devId == null ? null : devId.trim();
	}

	public Integer getDevType() {
		return devType;
	}

	public void setDevType(Integer devType) {
		this.devType = devType;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public List<SysRemotePreviewDO> getPreviews() {
		return previews;
	}

	public void setPreviews(List<SysRemotePreviewDO> previews) {
		this.previews = previews;
	}

	public String getDevName() {
		return devName;
	}

	public void setDevName(String devName) {
		this.devName = devName;
	}
}