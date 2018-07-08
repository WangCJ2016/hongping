package com.hp.manage.bo;

import com.hp.commons.bo.BaseQueryBO;

public class QueryAreaPicturesBO extends BaseQueryBO{
	/**
	 * 
	 */
	private static final long serialVersionUID = -1437720977090847354L;

	private String id;

	private String areaId;

	private String picture;

	private String picturex;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId == null ? null : areaId.trim();
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getPicturex() {
		return picturex;
	}

	public void setPicturex(String picturex) {
		this.picturex = picturex;
	}
}