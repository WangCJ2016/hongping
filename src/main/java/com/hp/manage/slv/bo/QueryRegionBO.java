package com.hp.manage.slv.bo;

public class QueryRegionBO {
	private Integer regionId;
	// 区域编号
	private String regionName;
	// 区域名字
	private Integer regionType;

	private Integer peopleMax;

	private Integer lingerMax;

	private Integer status;

	private Integer displayX;

	private Integer displayY;

	private Integer displayType;

	private String regionInfo;

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public String getRegionName() {
		return regionName;
	}

	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	public Integer getRegionType() {
		return regionType;
	}

	public void setRegionType(Integer regionType) {
		this.regionType = regionType;
	}

	public Integer getPeopleMax() {
		return peopleMax;
	}

	public void setPeopleMax(Integer peopleMax) {
		this.peopleMax = peopleMax;
	}

	public Integer getLingerMax() {
		return lingerMax;
	}

	public void setLingerMax(Integer lingerMax) {
		this.lingerMax = lingerMax;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getDisplayX() {
		return displayX;
	}

	public void setDisplayX(Integer displayX) {
		this.displayX = displayX;
	}

	public Integer getDisplayY() {
		return displayY;
	}

	public void setDisplayY(Integer displayY) {
		this.displayY = displayY;
	}

	public Integer getDisplayType() {
		return displayType;
	}

	public void setDisplayType(Integer displayType) {
		this.displayType = displayType;
	}

	public String getRegionInfo() {
		return regionInfo;
	}

	public void setRegionInfo(String regionInfo) {
		this.regionInfo = regionInfo;
	}

}
