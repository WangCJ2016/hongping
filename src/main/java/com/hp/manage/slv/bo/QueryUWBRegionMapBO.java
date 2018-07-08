package com.hp.manage.slv.bo;

public class QueryUWBRegionMapBO {
	private Integer id;// 自增 ID

	private String mapName;// 地图名称

	private Integer locationX;// 地图左上角的 X 坐标

	private Integer locationY;// 地图左上角的 Y 坐标

	private Integer width;// 地图的实际长度(cm)

	private Integer height;// 地图的实际高度(cm)

	private Integer regionId;// 地图所属区域编号

	private byte[] picture;// 地图流文件

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
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

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getRegionId() {
		return regionId;
	}

	public void setRegionId(Integer regionId) {
		this.regionId = regionId;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

}
