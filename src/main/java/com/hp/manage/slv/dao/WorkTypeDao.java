package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryWorkTypeBO;
import com.hp.manage.slv.domain.WorkTypeDO;

@Repository
public interface WorkTypeDao {
	public WorkTypeDO selectWorkTypeById(Integer id);

	public List<WorkTypeDO> selectWorkTypeList(QueryWorkTypeBO query);
}
