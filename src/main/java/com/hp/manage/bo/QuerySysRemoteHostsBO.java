package com.hp.manage.bo;

import java.util.Date;

import com.hp.commons.bo.BaseQueryBO;

public class QuerySysRemoteHostsBO extends BaseQueryBO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5654745955573948861L;

	private String id;

	private String name;

	private Integer type;

	private Integer connectMode;

	private String url;

	private String port;

	private String productor;

	private String model;

	private String username;

	private String psw;

	private Integer channels;

	private Integer status;

	private String mediaServer1Id;

	private String mediaServer2Id;

	private String mediaServer3Id;

	private String remark;

	private Integer isDelete;

	private Date gmtCreate;

	private Date gmtModify;

	private String createUserId;

	private String modifyUserId;

	private String areaId;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id == null ? null : id.trim();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getConnectMode() {
		return connectMode;
	}

	public void setConnectMode(Integer connectMode) {
		this.connectMode = connectMode;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url == null ? null : url.trim();
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port == null ? null : port.trim();
	}

	public String getProductor() {
		return productor;
	}

	public void setProductor(String productor) {
		this.productor = productor == null ? null : productor.trim();
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model == null ? null : model.trim();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username == null ? null : username.trim();
	}

	public String getPsw() {
		return psw;
	}

	public void setPsw(String psw) {
		this.psw = psw == null ? null : psw.trim();
	}

	public Integer getChannels() {
		return channels;
	}

	public void setChannels(Integer channels) {
		this.channels = channels;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getMediaServer1Id() {
		return mediaServer1Id;
	}

	public void setMediaServer1Id(String mediaServer1Id) {
		this.mediaServer1Id = mediaServer1Id == null ? null : mediaServer1Id.trim();
	}

	public String getMediaServer2Id() {
		return mediaServer2Id;
	}

	public void setMediaServer2Id(String mediaServer2Id) {
		this.mediaServer2Id = mediaServer2Id == null ? null : mediaServer2Id.trim();
	}

	public String getMediaServer3Id() {
		return mediaServer3Id;
	}

	public void setMediaServer3Id(String mediaServer3Id) {
		this.mediaServer3Id = mediaServer3Id == null ? null : mediaServer3Id.trim();
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Date getGmtCreate() {
		return gmtCreate;
	}

	public void setGmtCreate(Date gmtCreate) {
		this.gmtCreate = gmtCreate;
	}

	public Date getGmtModify() {
		return gmtModify;
	}

	public void setGmtModify(Date gmtModify) {
		this.gmtModify = gmtModify;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId == null ? null : createUserId.trim();
	}

	public String getModifyUserId() {
		return modifyUserId;
	}

	public void setModifyUserId(String modifyUserId) {
		this.modifyUserId = modifyUserId == null ? null : modifyUserId.trim();
	}

	public String getAreaId() {
		return areaId;
	}

	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
}