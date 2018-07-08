package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryAlarmReportBO;
import com.hp.manage.slv.domain.AlarmReportDO;

public interface AlarmReportService {
	public ResultDTO<AlarmReportDO> queryAlarmReportById(Integer id);

	public BatchResultDTO<AlarmReportDO> queryAlarmReportList(QueryAlarmReportBO query);
}
