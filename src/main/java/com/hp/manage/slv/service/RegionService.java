package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.domain.RegionDO;

public interface RegionService {
	public ResultDTO<RegionDO> queryRegionById(Integer id);

	public BatchResultDTO<RegionDO> queryRegionList(QueryRegionBO query);
}
