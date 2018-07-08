package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryAlarmReportBO;
import com.hp.manage.slv.domain.AlarmReportDO;

@Repository
public interface AlarmReportDao {
	public AlarmReportDO selectAlarmReportById(Integer id);

	public List<AlarmReportDO> selectAlarmReportList(QueryAlarmReportBO query);
}
