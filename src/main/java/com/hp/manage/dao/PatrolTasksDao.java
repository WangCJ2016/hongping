package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.domain.PatrolTasksDO;

@Repository
public interface PatrolTasksDao {

	public int insertPatrolTasks(PatrolTasksDO tasks);

	public int updatePatrolTasks(PatrolTasksDO tasks);

	public int updatePatrolTasksTime(PatrolTasksDO tasks);

	public PatrolTasksDO selectPatrolTasksById(String id);

	public List<PatrolTasksDO> selectPatrolTasksList(QueryPatrolTasksBO query);

	public int selectPatrolTasksCount(QueryPatrolTasksBO query);

	public List<PatrolTasksDO> selectPatrolTasksPage(QueryPatrolTasksBO query);

}
