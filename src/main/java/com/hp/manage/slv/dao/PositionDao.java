package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryPositionBO;
import com.hp.manage.slv.domain.PositionDO;

@Repository
public interface PositionDao {
	public PositionDO selectPositionById(Integer id);

	public List<PositionDO> selectPositionList(QueryPositionBO query);
}
