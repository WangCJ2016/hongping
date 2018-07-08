package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryRankBO;
import com.hp.manage.slv.domain.RankDO;

public interface RankService {
	public ResultDTO<RankDO> queryRankById(Integer id);

	public BatchResultDTO<RankDO> queryRankList(QueryRankBO query);
}
