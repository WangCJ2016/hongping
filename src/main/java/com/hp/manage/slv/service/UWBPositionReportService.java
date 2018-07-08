package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBPositionReportBO;
import com.hp.manage.slv.domain.UWBPositionReportDO;

public interface UWBPositionReportService {
	public ResultDTO<UWBPositionReportDO> queryUWBPositionReportById(Integer id);

	public BatchResultDTO<UWBPositionReportDO> queryUWBPositionReportList(QueryUWBPositionReportBO query);

	public BatchResultDTO<UWBPositionReportDO> queryUWBHisPositionsGpByRegion(QueryUWBPositionReportBO query);
}
