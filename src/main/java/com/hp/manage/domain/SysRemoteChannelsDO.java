package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;

public class SysRemoteChannelsDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -5544499876840177326L;

	private Long vid;

	private String id;

	private String name;

	private String index;

	private Integer type;

	private String remoteHostId;

	private Integer status;

	private String remark;

	private String icon;

	private Integer isDelete;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private String typeStr;

	private SysInstallPlaceDO installPlace;

	private SysRemoteHostsDO host;

	private String disabled;

	private String RemoteHostName;

	public Long getVid() {
		return vid;
	}

	public void setVid(Long vid) {
		this.vid = vid;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index == null ? null : index.trim();
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getRemoteHostId() {
		return remoteHostId;
	}

	public void setRemoteHostId(String remoteHostId) {
		this.remoteHostId = remoteHostId == null ? null : remoteHostId.trim();
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
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

	public Date getGmtModify() {
		return gmtModify;
	}

	public void setGmtModify(Date gmtModify) {
		this.gmtModify = gmtModify;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId == null ? null : createUserId.trim();
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId == null ? null : modifyUserId.trim();
	}

	public String getTypeStr() {
		return typeStr;
	}

	public void setTypeStr(String typeStr) {
		this.typeStr = typeStr;
	}

	public SysInstallPlaceDO getInstallPlace() {
		return installPlace;
	}

	public void setInstallPlace(SysInstallPlaceDO installPlace) {
		this.installPlace = installPlace;
	}

	public SysRemoteHostsDO getHost() {
		return host;
	}

	public void setHost(SysRemoteHostsDO host) {
		this.host = host;
	}

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public String getRemoteHostName() {
		return RemoteHostName;
	}

	public void setRemoteHostName(String remoteHostName) {
		RemoteHostName = remoteHostName;
	}

}