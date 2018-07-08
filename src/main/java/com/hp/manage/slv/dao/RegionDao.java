package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.domain.RegionDO;

@Repository
public interface RegionDao {
	public RegionDO selectRegionById(Integer id);

	public List<RegionDO> selectRegionList(QueryRegionBO query);
}
