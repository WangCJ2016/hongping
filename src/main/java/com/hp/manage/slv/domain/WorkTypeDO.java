package com.hp.manage.slv.domain;

public class WorkTypeDO {
	private Integer worktypeId;// 工种编号

	private Integer worktypeType;

	private String worktypeName;// 工种名称

	private String worktypeIdEx;

	public Integer getWorktypeId() {
		return worktypeId;
	}

	public void setWorktypeId(Integer worktypeId) {
		this.worktypeId = worktypeId;
	}

	public Integer getWorktypeType() {
		return worktypeType;
	}

	public void setWorktypeType(Integer worktypeType) {
		this.worktypeType = worktypeType;
	}

	public String getWorktypeName() {
		return worktypeName;
	}

	public void setWorktypeName(String worktypeName) {
		this.worktypeName = worktypeName;
	}

	public String getWorktypeIdEx() {
		return worktypeIdEx;
	}

	public void setWorktypeIdEx(String worktypeIdEx) {
		this.worktypeIdEx = worktypeIdEx;
	}

}
