package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.domain.PatrolTasksDO;

public interface PatrolTasksService {

	public BaseResultDTO createPatrolTasks(PatrolTasksDO tasks);

	public BaseResultDTO modifyPatrolTasks(PatrolTasksDO tasks);

	public BaseResultDTO modifyPatrolTasksTime(PatrolTasksDO tasks);

	public ResultDTO<PatrolTasksDO> queryPatrolTasksById(String id);

	public BatchResultDTO<PatrolTasksDO> queryPatrolTasksList(QueryPatrolTasksBO query);

	public BatchResultDTO<PatrolTasksDO> queryPatrolTasksPage(QueryPatrolTasksBO query);
}
