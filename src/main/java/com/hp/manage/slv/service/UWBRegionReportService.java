package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBRegionReportBO;
import com.hp.manage.slv.domain.UWBRegionReportDO;

public interface UWBRegionReportService {
	public ResultDTO<UWBRegionReportDO> queryUWBRegionReportById(Integer id);

	public BatchResultDTO<UWBRegionReportDO> queryUWBRegionReportList(QueryUWBRegionReportBO query);
}
