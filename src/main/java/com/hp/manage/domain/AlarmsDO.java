package com.hp.manage.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class AlarmsDO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1019424460113746146L;

	private String id;

	private String event;

	private Integer degree;

	private String place;

	private Integer status;

	private Date time;

	private String device;

	private String deviceId;

	private Integer deviceType;

	private Integer type;

	private String dealPerson;

	private String suggest;

	private Date gmtCreate;

	private Date gmtModify;

	private String slvAreaId;

	private String slvPersonId;

	private SysInstallPlaceDO install;

	private List<SysRemoteChannelsDO> channels;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event == null ? null : event.trim();
	}

	public Integer getDegree() {
		return degree;
	}

	public void setDegree(Integer degree) {
		this.degree = degree;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place == null ? null : place.trim();
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId == null ? null : deviceId.trim();
	}

	public Integer getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(Integer deviceType) {
		this.deviceType = deviceType;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getDealPerson() {
		return dealPerson;
	}

	public void setDealPerson(String dealPerson) {
		this.dealPerson = dealPerson == null ? null : dealPerson.trim();
	}

	public String getSuggest() {
		return suggest;
	}

	public void setSuggest(String suggest) {
		this.suggest = suggest == null ? null : suggest.trim();
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

	public String getSlvAreaId() {
		return slvAreaId;
	}

	public void setSlvAreaId(String slvAreaId) {
		this.slvAreaId = slvAreaId;
	}

	public String getSlvPersonId() {
		return slvPersonId;
	}

	public void setSlvPersonId(String slvPersonId) {
		this.slvPersonId = slvPersonId;
	}

	public SysInstallPlaceDO getInstall() {
		return install;
	}

	public void setInstall(SysInstallPlaceDO install) {
		this.install = install;
	}

	public List<SysRemoteChannelsDO> getChannels() {
		return channels;
	}

	public void setChannels(List<SysRemoteChannelsDO> channels) {
		this.channels = channels;
	}
}