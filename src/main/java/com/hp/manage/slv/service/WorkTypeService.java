package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryWorkTypeBO;
import com.hp.manage.slv.domain.WorkTypeDO;

public interface WorkTypeService {
	public ResultDTO<WorkTypeDO> queryWorkTypeById(Integer id);

	public BatchResultDTO<WorkTypeDO> queryWorkTypeList(QueryWorkTypeBO query);
}
