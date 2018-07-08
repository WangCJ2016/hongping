package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;

public class SysBroadcastChannelsDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1506825333688323791L;

	private String id;

	private String hostId;

	private String name;

	private Integer type;

	private String remark;

	private String index;

	private String icon;

	private Integer isDelete;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private String typeStr;

	private SysInstallPlaceDO installPlace;

	private SysBroadcastHostsDO host;

	private String disabled;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getHostId() {
		return hostId;
	}

	public void setHostId(String hostId) {
		this.hostId = hostId == null ? null : hostId.trim();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index == null ? null : index.trim();
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

	public SysBroadcastHostsDO getHost() {
		return host;
	}

	public void setHost(SysBroadcastHostsDO host) {
		this.host = host;
	}

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}
}