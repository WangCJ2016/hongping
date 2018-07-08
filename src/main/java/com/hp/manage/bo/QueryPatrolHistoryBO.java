package com.hp.manage.bo;

import java.util.Date;

import com.hp.commons.bo.BaseQueryBO;

public class QueryPatrolHistoryBO extends BaseQueryBO {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4829203498459638579L;

	private String id;

	private Date time;

	private String point;

	private String timeStr;

	private String startTime;
	private String endTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

	public String getPoint() {
		return point;
	}

	public void setPoint(String point) {
		this.point = point == null ? null : point.trim();
	}

	public String getTimeStr() {
		return timeStr;
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}