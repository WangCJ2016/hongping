package com.hp.manage.slv.bo;

import java.util.Date;

public class QueryAlarmReportBO {
	private Integer alarmId;// 报警自增字段

	private Integer alarmType;// 报警类型

	private Integer alarmParam1;// 报警参数 1

	private Integer alarmParam2;// 报警参数 2

	private Date firstReportTime;// 初次报告时间

	private Date lastReportTime;// 末次报告时间

	private String loginName;

	private Date processTime;

	private Integer processStatus;

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

	public Integer getAlarmParam1() {
		return alarmParam1;
	}

	public void setAlarmParam1(Integer alarmParam1) {
		this.alarmParam1 = alarmParam1;
	}

	public Integer getAlarmParam2() {
		return alarmParam2;
	}

	public void setAlarmParam2(Integer alarmParam2) {
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

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public Date getProcessTime() {
		return processTime;
	}

	public void setProcessTime(Date processTime) {
		this.processTime = processTime;
	}

	public Integer getProcessStatus() {
		return processStatus;
	}

	public void setProcessStatus(Integer processStatus) {
		this.processStatus = processStatus;
	}

}
