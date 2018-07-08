package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;

public class SysCommPropertiesDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4835901596118446881L;

	private Long vid;

	private String id;

	private String name;

	private String type;

	private String addressCode;

	private String devHostId;

	private Integer status;

	private String icon;

	private Integer isDelete;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private String typeStr;

	private SysCommDevicesDO device;

	private SysCommHostsDO host;

	private String disabled;

	private SysInstallPlaceDO install;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type == null ? null : type.trim();
	}

	public String getAddressCode() {
		return addressCode;
	}

	public void setAddressCode(String addressCode) {
		this.addressCode = addressCode == null ? null : addressCode.trim();
	}

	public String getDevHostId() {
		return devHostId;
	}

	public void setDevHostId(String devHostId) {
		this.devHostId = devHostId == null ? null : devHostId.trim();
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
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

	public SysCommDevicesDO getDevice() {
		return device;
	}

	public void setDevice(SysCommDevicesDO device) {
		this.device = device;
	}

	public SysCommHostsDO getHost() {
		return host;
	}

	public void setHost(SysCommHostsDO host) {
		this.host = host;
	}

	public String getDisabled() {
		return disabled;
	}

	public void setDisabled(String disabled) {
		this.disabled = disabled;
	}

	public SysInstallPlaceDO getInstall() {
		return install;
	}

	public void setInstall(SysInstallPlaceDO install) {
		this.install = install;
	}
}