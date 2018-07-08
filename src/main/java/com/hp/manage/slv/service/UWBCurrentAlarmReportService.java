package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBCurrentAlarmReportBO;
import com.hp.manage.slv.domain.UWBCurrentAlarmReportDO;

public interface UWBCurrentAlarmReportService {
	public ResultDTO<UWBCurrentAlarmReportDO> queryUWBCurrentAlarmReportById(Integer id);

	public BatchResultDTO<UWBCurrentAlarmReportDO> queryUWBCurrentAlarmReportList(QueryUWBCurrentAlarmReportBO query);
}
