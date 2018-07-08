package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryAlarmTypeBO;
import com.hp.manage.slv.domain.AlarmTypeDO;

public interface AlarmTypeService {
	public ResultDTO<AlarmTypeDO> queryAlarmTypeById(Integer id);

	public BatchResultDTO<AlarmTypeDO> queryAlarmTypeList(QueryAlarmTypeBO query);
}
