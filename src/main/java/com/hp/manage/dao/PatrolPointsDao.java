package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryPatrolPointsBO;
import com.hp.manage.domain.PatrolPointsDO;

@Repository
public interface PatrolPointsDao {

	public int insertPatrolPoints(PatrolPointsDO points);

	public int updatePatrolPoints(PatrolPointsDO points);

	public PatrolPointsDO selectPatrolPointsById(String id);

	public List<PatrolPointsDO> selectPatrolPointsList(QueryPatrolPointsBO query);

	public int selectPatrolPointsCount(QueryPatrolPointsBO query);

	public List<PatrolPointsDO> selectPatrolPointsPage(QueryPatrolPointsBO query);

}
