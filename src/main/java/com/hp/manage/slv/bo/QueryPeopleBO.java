package com.hp.manage.slv.bo;

import java.util.Date;

public class QueryPeopleBO {
	private Integer peopleId;// 工号

	private String peopleName;// 姓名

	private Integer gender;// 性别(0:女,1:男)

	private byte[] picture;// 照片

	private Integer deptId;// 部门编号

	private Integer worktypeId;// 工种编号

	private Integer rankId;// 职务编号

	private Date birthday;// 出生日期

	private Date enrollTime;// 入职日期

	private String address;// 家庭地址

	private String phone;// 联系电话

	private String iDNumber;// 身份证号码

	private Integer bloodType;// 血型(0:O; 1:A, 2:B, 3:AB)

	private String allergy;// 药物过敏记录

	private String linkmanName;// 家庭联系人姓名

	private String linkmanDept;// 家庭联系人单位

	private String linkmanPhone;// 家庭联系人电话

	private String peopleIdEx;// 定位卡号

	private String peopleInfo;// 备注信息

	public Integer getPeopleId() {
		return peopleId;
	}

	public void setPeopleId(Integer peopleId) {
		this.peopleId = peopleId;
	}

	public String getPeopleName() {
		return peopleName;
	}

	public void setPeopleName(String peopleName) {
		this.peopleName = peopleName;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public byte[] getPicture() {
		return picture;
	}

	public void setPicture(byte[] picture) {
		this.picture = picture;
	}

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public Integer getWorktypeId() {
		return worktypeId;
	}

	public void setWorktypeId(Integer worktypeId) {
		this.worktypeId = worktypeId;
	}

	public Integer getRankId() {
		return rankId;
	}

	public void setRankId(Integer rankId) {
		this.rankId = rankId;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public Date getEnrollTime() {
		return enrollTime;
	}

	public void setEnrollTime(Date enrollTime) {
		this.enrollTime = enrollTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getiDNumber() {
		return iDNumber;
	}

	public void setiDNumber(String iDNumber) {
		this.iDNumber = iDNumber;
	}

	public Integer getBloodType() {
		return bloodType;
	}

	public void setBloodType(Integer bloodType) {
		this.bloodType = bloodType;
	}

	public String getAllergy() {
		return allergy;
	}

	public void setAllergy(String allergy) {
		this.allergy = allergy;
	}

	public String getLinkmanName() {
		return linkmanName;
	}

	public void setLinkmanName(String linkmanName) {
		this.linkmanName = linkmanName;
	}

	public String getLinkmanDept() {
		return linkmanDept;
	}

	public void setLinkmanDept(String linkmanDept) {
		this.linkmanDept = linkmanDept;
	}

	public String getLinkmanPhone() {
		return linkmanPhone;
	}

	public void setLinkmanPhone(String linkmanPhone) {
		this.linkmanPhone = linkmanPhone;
	}

	public String getPeopleIdEx() {
		return peopleIdEx;
	}

	public void setPeopleIdEx(String peopleIdEx) {
		this.peopleIdEx = peopleIdEx;
	}

	public String getPeopleInfo() {
		return peopleInfo;
	}

	public void setPeopleInfo(String peopleInfo) {
		this.peopleInfo = peopleInfo;
	}
}
