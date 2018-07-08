package com.hp.manage.slv.bo;

public class QueryAlarmTypeBO {
	private Integer alarmType;// 报警类型

	private String alarmName;// 报警名称

	private String param1Name;// 报警参数 1

	private String param2Name;// 报警参数 2

	private Integer plarmLevel;// 报警级别

	private Integer alarmAttrib;

	private Integer validSeconds;

	private Integer autRecoverySeconds;

	public Integer getAlarmType() {
		return alarmType;
	}

	public void setAlarmType(Integer alarmType) {
		this.alarmType = alarmType;
	}

	public String getAlarmName() {
		return alarmName;
	}

	public void setAlarmName(String alarmName) {
		this.alarmName = alarmName;
	}

	public String getParam1Name() {
		return param1Name;
	}

	public void setParam1Name(String param1Name) {
		this.param1Name = param1Name;
	}

	public String getParam2Name() {
		return param2Name;
	}

	public void setParam2Name(String param2Name) {
		this.param2Name = param2Name;
	}

	public Integer getPlarmLevel() {
		return plarmLevel;
	}

	public void setPlarmLevel(Integer plarmLevel) {
		this.plarmLevel = plarmLevel;
	}

	public Integer getAlarmAttrib() {
		return alarmAttrib;
	}

	public void setAlarmAttrib(Integer alarmAttrib) {
		this.alarmAttrib = alarmAttrib;
	}

	public Integer getValidSeconds() {
		return validSeconds;
	}

	public void setValidSeconds(Integer validSeconds) {
		this.validSeconds = validSeconds;
	}

	public Integer getAutRecoverySeconds() {
		return autRecoverySeconds;
	}

	public void setAutRecoverySeconds(Integer autRecoverySeconds) {
		this.autRecoverySeconds = autRecoverySeconds;
	}

}
