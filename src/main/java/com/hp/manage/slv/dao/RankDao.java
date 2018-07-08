package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryRankBO;
import com.hp.manage.slv.domain.RankDO;

@Repository
public interface RankDao {
	public RankDO selectRankById(Integer id);

	public List<RankDO> selectRankList(QueryRankBO query);
}
