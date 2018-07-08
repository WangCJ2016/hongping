package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryPatrolPointsBO;
import com.hp.manage.domain.PatrolPointsDO;

public interface PatrolPointsService {

	public BaseResultDTO createPatrolPoints(PatrolPointsDO points);

	public BaseResultDTO modifyPatrolPoints(PatrolPointsDO points);

	public ResultDTO<PatrolPointsDO> queryPatrolPointsById(String id);

	public BatchResultDTO<PatrolPointsDO> queryPatrolPointsList(QueryPatrolPointsBO query);

	public BatchResultDTO<PatrolPointsDO> queryPatrolPointsPage(QueryPatrolPointsBO query);
}
