package com.hp.manage.domain;

public class AreaPicturesDO {
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