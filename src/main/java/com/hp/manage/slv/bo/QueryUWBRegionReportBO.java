package com.hp.manage.slv.bo;

import java.util.Date;

public class QueryUWBRegionReportBO {
	private String peopleIdEx;// 定位卡号

	private Integer regionId;// 当前所处区域编号

	private Date firstReportTime;// 进入区域时间

	private Date lastReportTime;// 离开区域时间

	private String regionReportDesc;// 保留字段

	public String getPeopleIdEx() {
		return peopleIdEx;
	}

	public void setPeopleIdEx(String peopleIdEx) {
		this.peopleIdEx = peopleIdEx;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
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

	public String getRegionReportDesc() {
		return regionReportDesc;
	}

	public void setRegionReportDesc(String regionReportDesc) {
		this.regionReportDesc = regionReportDesc;
	}

}
