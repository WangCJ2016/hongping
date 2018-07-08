package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryPositionBO;
import com.hp.manage.slv.domain.PositionDO;

public interface PositionService {
	public ResultDTO<PositionDO> queryPositionById(Integer id);

	public BatchResultDTO<PositionDO> queryPositionList(QueryPositionBO query);
}
