package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryUWBRegionReportBO;
import com.hp.manage.slv.domain.UWBRegionReportDO;

@Repository
public interface UWBRegionReportDao {
	public UWBRegionReportDO selectUWBRegionReportById(Integer id);

	public List<UWBRegionReportDO> selectUWBRegionReportList(QueryUWBRegionReportBO query);
}
