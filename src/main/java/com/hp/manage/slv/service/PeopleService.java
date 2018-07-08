package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryPeopleBO;
import com.hp.manage.slv.domain.PeopleDO;

public interface PeopleService {
	public ResultDTO<PeopleDO> queryPeopleById(String id);

	public BatchResultDTO<PeopleDO> queryPeopleList(QueryPeopleBO query);
}
