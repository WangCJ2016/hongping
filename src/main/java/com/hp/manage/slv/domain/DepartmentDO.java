package com.hp.manage.slv.domain;

import java.util.List;

public class DepartmentDO {
	private Integer deptId;// 部门编号

	private String deptName;// 部门简称

	private String deptFullname;

	private String address;

	private String phone;

	private String deptInfo;

	private List<PeopleDO> peoples;
	private Integer peopleCount;

	public Integer getDeptId() {
		return deptId;
	}

	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getDeptFullname() {
		return deptFullname;
	}

	public void setDeptFullname(String deptFullname) {
		this.deptFullname = deptFullname;
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

	public String getDeptInfo() {
		return deptInfo;
	}

	public void setDeptInfo(String deptInfo) {
		this.deptInfo = deptInfo;
	}

	public List<PeopleDO> getPeoples() {
		return peoples;
	}

	public void setPeoples(List<PeopleDO> peoples) {
		this.peoples = peoples;
	}

	public Integer getPeopleCount() {
		return peopleCount;
	}

	public void setPeopleCount(Integer peopleCount) {
		this.peopleCount = peopleCount;
	}
}
