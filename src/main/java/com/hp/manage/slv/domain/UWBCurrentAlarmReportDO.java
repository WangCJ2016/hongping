package com.hp.manage.slv.domain;

import java.util.Date;

public class UWBCurrentAlarmReportDO {
	private Integer alarmId;// 报警自增字段

	private Integer alarmType;// 报警类型

	private String alarmParam1;// 报警参数 1

	private String alarmParam2;// 报警参数 2

	private Date firstReportTime;// 初次报告时间

	private Date lastReportTime;// 末次报告时间

	private Date processTime;

	private String loginName;

	private Integer processStatus;

	private String processInfo;

	public Integer getAlarmId() {
		return alarmId;
	}

	public void setAlarmId(Integer alarmId) {
		this.alarmId = alarmId;
	}

	public Integer getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(Integer alarmType) {
		this.alarmType = alarmType;
	}

	public String getAlarmParam1() {
		return alarmParam1;
	}

	public void setAlarmParam1(String alarmParam1) {
		this.alarmParam1 = alarmParam1;
	}

	public String getAlarmParam2() {
		return alarmParam2;
	}

	public void setAlarmParam2(String alarmParam2) {
		this.alarmParam2 = alarmParam2;
	}

	public Date getFirstReportTime() {
		return firstReportTime;
	}

	public void setFirstReportTime(Date firstReportTime) {
		this.firstReportTime = firstReportTime;
	}

	public Date getLastReportTime() {
		return lastReportTime;
	}

	public void setLastReportTime(Date lastReportTime) {
		this.lastReportTime = lastReportTime;
	}

	public Date getProcessTime() {
		return processTime;
	}

	public void setProcessTime(Date processTime) {
		this.processTime = processTime;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public Integer getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(Integer processStatus) {
		this.processStatus = processStatus;
	}

	public String getProcessInfo() {
		return processInfo;
	}

	public void setProcessInfo(String processInfo) {
		this.processInfo = processInfo;
	}

}
