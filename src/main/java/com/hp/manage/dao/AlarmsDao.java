package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryAlarmsBO;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.AlarmsDOX;

@Repository
public interface AlarmsDao {

	public int insertAlarms(AlarmsDO alarms);

	public int updateAlarms(AlarmsDO alarms);

	public AlarmsDO selectAlarmsById(String id);

	public List<AlarmsDO> selectAlarmsList(QueryAlarmsBO query);

	public int selectAlarmsCount(QueryAlarmsBO query);

	public List<AlarmsDO> selectAlarmsPage(QueryAlarmsBO query);

	public List<AlarmsDOX> selectAlarmsChart(QueryAlarmsBO query);

}
