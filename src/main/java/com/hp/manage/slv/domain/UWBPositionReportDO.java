package com.hp.manage.slv.domain;

import java.util.Date;

public class UWBPositionReportDO {
	private String peopleIdEx;// 定位卡号

	private Integer regionId;// 当前所处区域编号

	private Integer locationX;// 当前区域内的 X 坐标

	private Integer locationY;// 当前区域内的 Y 坐标

	private Integer locationZ;// 当前区域内的 Z 坐标

	private Date reportTime;// 最近一次上报的时间

	private Integer railIn;// 电子围栏预留字段 0:围栏外 1:围栏内

	private String uWBDesc;// 保留字段

	/** 中转字段 */
	private RegionDO region;
	private Date minTime;
	private Date maxTime;
	private String regionName;
	private String areaId;

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

	public Integer getLocationX() {
		return locationX;
	}

	public void setLocationX(Integer locationX) {
		this.locationX = locationX;
	}

	public Integer getLocationY() {
		return locationY;
	}

	public void setLocationY(Integer locationY) {
		this.locationY = locationY;
	}

	public Integer getLocationZ() {
		return locationZ;
	}

	public void setLocationZ(Integer locationZ) {
		this.locationZ = locationZ;
	}

	public Date getReportTime() {
		return reportTime;
	}

	public void setReportTime(Date reportTime) {
		this.reportTime = reportTime;
	}

	public Integer getRailIn() {
		return railIn;
	}

	public void setRailIn(Integer railIn) {
		this.railIn = railIn;
	}

	public String getuWBDesc() {
		return uWBDesc;
	}

	public void setuWBDesc(String uWBDesc) {
		this.uWBDesc = uWBDesc;
	}

	public RegionDO getRegion() {
		return region;
	}

	public void setRegion(RegionDO region) {
		this.region = region;
	}

	public Date getMinTime() {
		return minTime;
	}

	public void setMinTime(Date minTime) {
		this.minTime = minTime;
	}

	public Date getMaxTime() {
		return maxTime;
	}

	public void setMaxTime(Date maxTime) {
		this.maxTime = maxTime;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
}
