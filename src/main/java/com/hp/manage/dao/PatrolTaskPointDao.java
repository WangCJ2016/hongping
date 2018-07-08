package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryPatrolTaskPointBO;
import com.hp.manage.domain.PatrolTaskPointDO;

@Repository
public interface PatrolTaskPointDao {

	public int insertPatrolTaskPoint(PatrolTaskPointDO points);

	public int updatePatrolTaskPoint(PatrolTaskPointDO points);

	public PatrolTaskPointDO selectPatrolTaskPointById(String id);

	public List<PatrolTaskPointDO> selectPatrolTaskPointList(QueryPatrolTaskPointBO query);

	public int selectPatrolTaskPointCount(QueryPatrolTaskPointBO query);

	public List<PatrolTaskPointDO> selectPatrolTaskPointPage(QueryPatrolTaskPointBO query);

}
