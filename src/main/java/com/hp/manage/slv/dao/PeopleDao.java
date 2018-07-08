package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryPeopleBO;
import com.hp.manage.slv.domain.PeopleDO;

@Repository
public interface PeopleDao {
	public PeopleDO selectPeopleById(String id);

	public List<PeopleDO> selectPeopleList(QueryPeopleBO query);
}
