package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryUWBRegionMapBO;
import com.hp.manage.slv.domain.UWBRegionMapDO;

@Repository
public interface UWBRegionMapDao {
	public UWBRegionMapDO selectUWBRegionMapById(Integer id);

	public List<UWBRegionMapDO> selectUWBRegionMapList(QueryUWBRegionMapBO query);
}
