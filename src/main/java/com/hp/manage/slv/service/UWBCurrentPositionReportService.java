package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBCurrentPositionReportBO;
import com.hp.manage.slv.domain.UWBCurrentPositionReportDO;

public interface UWBCurrentPositionReportService {
	public ResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportById(Integer id);

	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportList(
			QueryUWBCurrentPositionReportBO query);

	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportListx(
			QueryUWBCurrentPositionReportBO query);

	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBHisPositionsGpByRegion(
			QueryUWBCurrentPositionReportBO query);
}
