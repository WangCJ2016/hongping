package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryUWBCurrentAlarmReportBO;
import com.hp.manage.slv.domain.UWBCurrentAlarmReportDO;

@Repository
public interface UWBCurrentAlarmReportDao {
	public UWBCurrentAlarmReportDO selectUWBCurrentAlarmReportById(Integer id);

	public List<UWBCurrentAlarmReportDO> selectUWBCurrentAlarmReportList(QueryUWBCurrentAlarmReportBO query);
}
