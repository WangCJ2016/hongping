package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBRegionMapBO;
import com.hp.manage.slv.domain.UWBRegionMapDO;

public interface UWBRegionMapService {
	public ResultDTO<UWBRegionMapDO> queryUWBRegionMapById(Integer id);

	public BatchResultDTO<UWBRegionMapDO> queryUWBRegionMapList(QueryUWBRegionMapBO query);
}
