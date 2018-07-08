package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryPatrolTaskPointBO;
import com.hp.manage.domain.PatrolTaskPointDO;

public interface PatrolTaskPointService {

	public BaseResultDTO createPatrolTaskPoint(PatrolTaskPointDO taskPoint);

	public BaseResultDTO modifyPatrolTaskPoint(PatrolTaskPointDO taskPoint);

	public ResultDTO<PatrolTaskPointDO> queryPatrolTaskPointById(String id);

	public BatchResultDTO<PatrolTaskPointDO> queryPatrolTaskPointList(QueryPatrolTaskPointBO query);

	public BatchResultDTO<PatrolTaskPointDO> queryPatrolTaskPointPage(QueryPatrolTaskPointBO query);
}
