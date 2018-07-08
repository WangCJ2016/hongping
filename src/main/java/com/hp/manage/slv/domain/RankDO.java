package com.hp.manage.slv.domain;

public class RankDO {
	private Integer rankId;// 职务编号

	private Integer rankType;

	private String rankName;// 职务名称

	private String rankIdEx;

	public Integer getRankId() {
		return rankId;
	}

	public void setRankId(Integer rankId) {
		this.rankId = rankId;
	}

	public Integer getRankType() {
		return rankType;
	}

	public void setRankType(Integer rankType) {
		this.rankType = rankType;
	}

	public String getRankName() {
		return rankName;
	}

	public void setRankName(String rankName) {
		this.rankName = rankName;
	}

	public String getRankIdEx() {
		return rankIdEx;
	}

	public void setRankIdEx(String rankIdEx) {
		this.rankIdEx = rankIdEx;
	}
}
