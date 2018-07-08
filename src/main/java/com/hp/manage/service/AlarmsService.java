package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAlarmsBO;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.AlarmsDOX;

public interface AlarmsService {

	public BaseResultDTO createAlarms(AlarmsDO alarms);

	public BaseResultDTO modifyAlarms(AlarmsDO alarms);

	public ResultDTO<AlarmsDO> queryAlarmsById(String id);

	public BatchResultDTO<AlarmsDO> queryAlarmsList(QueryAlarmsBO query);

	public BaseResultDTO queryAlarmsCount(QueryAlarmsBO query);

	public BatchResultDTO<AlarmsDO> queryAlarmsPage(QueryAlarmsBO query);

	public BatchResultDTO<AlarmsDOX> queryAlarmsChart(QueryAlarmsBO query);
}
