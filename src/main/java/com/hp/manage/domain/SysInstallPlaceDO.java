package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;

public class SysInstallPlaceDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8382087230517083758L;

	private String id;

	private String areaId;

	private String devId;

	private Integer type;

	private String x;

	private String y;

	private Integer isDelete;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private SysRemoteChannelsDO remoteChannel;

	private SysCommPropertiesDO commProperty;

	private SysBroadcastChannelsDO broadcastChannel;

	private String devName;
	private String devIcon;

	/** 人员中转字段 */
	private Integer regionId;
	private String peopleIdEx;
	private String name;
	private String department;
	private String telephone;
	private String index;

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
		this.devId = devId == null ? null : devId.trim();
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x == null ? null : x.trim();
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y == null ? null : y.trim();
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

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public String getPeopleIdEx() {
		return peopleIdEx;
	}

	public void setPeopleIdEx(String peopleIdEx) {
		this.peopleIdEx = peopleIdEx;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}
}