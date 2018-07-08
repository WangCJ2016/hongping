package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryUWBPositionReportBO;
import com.hp.manage.slv.domain.UWBPositionReportDO;

@Repository
public interface UWBPositionReportDao {
	public UWBPositionReportDO selectUWBPositionReportById(Integer id);

	public List<UWBPositionReportDO> selectUWBPositionReportList(QueryUWBPositionReportBO query);

	public List<UWBPositionReportDO> selectUWBHisPositionsGpByRegion(QueryUWBPositionReportBO query);
}
