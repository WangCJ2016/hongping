package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class SysDeviceAreaDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1307643094590778454L;

	private String id;

	private String areaId;

	private String devId;

	private Integer type;

	private Integer status;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private SysRemoteChannelsDO remoteChannel;

	private SysCommPropertiesDO commProperty;

	private SysBroadcastChannelsDO broadcastChannel;

	private String devName;
	private String devIcon;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId == null ? null : areaId.trim();
	}

	public String getDevId() {
		return devId;
	}

	public void setDevId(String devId) {
		this.devId = devId;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
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
		this.modifyUserId = modifyUserId;
	}

	public SysRemoteChannelsDO getRemoteChannel() {
		return remoteChannel;
	}

	public void setRemoteChannel(SysRemoteChannelsDO remoteChannel) {
		this.remoteChannel = remoteChannel;
	}

	public SysCommPropertiesDO getCommProperty() {
		return commProperty;
	}

	public void setCommProperty(SysCommPropertiesDO commProperty) {
		this.commProperty = commProperty;
	}

	public SysBroadcastChannelsDO getBroadcastChannel() {
		return broadcastChannel;
	}

	public void setBroadcastChannel(SysBroadcastChannelsDO broadcastChannel) {
		this.broadcastChannel = broadcastChannel;
	}

	public String getDevName() {
		return devName;
	}

	public void setDevName(String devName) {
		this.devName = devName;
	}

	public String getDevIcon() {
		return devIcon;
	}

	public void setDevIcon(String devIcon) {
		this.devIcon = devIcon;
	}

}