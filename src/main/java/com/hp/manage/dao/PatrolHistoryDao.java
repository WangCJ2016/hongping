package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryPatrolHistoryBO;
import com.hp.manage.domain.PatrolHistoryDO;

@Repository
public interface PatrolHistoryDao {

	public int insertPatrolHistory(PatrolHistoryDO history);

	public int batchInsertPatrolHistory(List<PatrolHistoryDO> historys);

	public int updatePatrolHistory(PatrolHistoryDO history);

	public PatrolHistoryDO selectPatrolHistoryById(String id);

	public List<PatrolHistoryDO> selectPatrolHistoryList(QueryPatrolHistoryBO query);

	public int selectPatrolHistoryCount(QueryPatrolHistoryBO query);

	public List<PatrolHistoryDO> selectPatrolHistoryPage(QueryPatrolHistoryBO query);

}
