package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryUWBCurrentPositionReportBO;
import com.hp.manage.slv.domain.UWBCurrentPositionReportDO;

@Repository
public interface UWBCurrentPositionReportDao {
	public UWBCurrentPositionReportDO selectUWBCurrentPositionReportById(Integer id);

	public List<UWBCurrentPositionReportDO> selectUWBCurrentPositionReportList(QueryUWBCurrentPositionReportBO query);

	public List<UWBCurrentPositionReportDO> selectUWBCurrentPositionReportListx(QueryUWBCurrentPositionReportBO query);

	public List<UWBCurrentPositionReportDO> selectUWBHisPositionsGpByRegion(QueryUWBCurrentPositionReportBO query);
}
