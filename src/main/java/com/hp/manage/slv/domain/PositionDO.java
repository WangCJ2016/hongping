package com.hp.manage.slv.domain;

public class PositionDO {
	private Integer positionId;

	private Integer positionX;// 基站 x 坐标

	private Integer positionY;// 基站 y 坐标

	private Integer positionZ;// 基站 z 坐标

	private Float positionSin;

	private Float positionCos;

	private Float positionVcos;

	private String positionDesc;

	private Float positionSin2;

	private Float positionCos2;

	private Float positionVcos2;

	private String positionIdEx;

	private String status;

	private Integer regionId;// 基站所属区域

	private String area;

	private String code;

	public Integer getPositionId() {
		return positionId;
	}

	public void setPositionId(Integer positionId) {
		this.positionId = positionId;
	}

	public Integer getPositionX() {
		return positionX;
	}

	public void setPositionX(Integer positionX) {
		this.positionX = positionX;
	}

	public Integer getPositionY() {
		return positionY;
	}

	public void setPositionY(Integer positionY) {
		this.positionY = positionY;
	}

	public Integer getPositionZ() {
		return positionZ;
	}

	public void setPositionZ(Integer positionZ) {
		this.positionZ = positionZ;
	}

	public Float getPositionSin() {
		return positionSin;
	}

	public void setPositionSin(Float positionSin) {
		this.positionSin = positionSin;
	}

	public Float getPositionCos() {
		return positionCos;
	}

	public void setPositionCos(Float positionCos) {
		this.positionCos = positionCos;
	}

	public Float getPositionVcos() {
		return positionVcos;
	}

	public void setPositionVcos(Float positionVcos) {
		this.positionVcos = positionVcos;
	}

	public String getPositionDesc() {
		return positionDesc;
	}

	public void setPositionDesc(String positionDesc) {
		this.positionDesc = positionDesc;
	}

	public Float getPositionSin2() {
		return positionSin2;
	}

	public void setPositionSin2(Float positionSin2) {
		this.positionSin2 = positionSin2;
	}

	public Float getPositionCos2() {
		return positionCos2;
	}

	public void setPositionCos2(Float positionCos2) {
		this.positionCos2 = positionCos2;
	}

	public Float getPositionVcos2() {
		return positionVcos2;
	}

	public void setPositionVcos2(Float positionVcos2) {
		this.positionVcos2 = positionVcos2;
	}

	public String getPositionIdEx() {
		return positionIdEx;
	}

	public void setPositionIdEx(String positionIdEx) {
		this.positionIdEx = positionIdEx;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
