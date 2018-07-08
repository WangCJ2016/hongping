package com.hp.manage.bo;

import java.util.Date;

import com.hp.commons.bo.BaseQueryBO;

public class QueryAlarmsBO extends BaseQueryBO {
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

	private String deviceId;

	private Integer type;

	private String dealPerson;

	private String suggest;

	private Date gmtCreate;

	private Date gmtModify;

	private String slvAreaId;

	private String slvPersonId;

	private String dateStr;

	private String dateStrx;

	private String searchType;

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

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId == null ? null : deviceId.trim();
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

	public String getDateStr() {
		return dateStr;
	}

	public void setDateStr(String dateStr) {
		this.dateStr = dateStr;
	}

	public String getSearchType() {
		return searchType;
	}

	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}

	public String getDateStrx() {
		return dateStrx;
	}

	public void setDateStrx(String dateStrx) {
		this.dateStrx = dateStrx;
	}
}