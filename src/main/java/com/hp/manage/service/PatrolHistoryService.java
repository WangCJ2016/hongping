package com.hp.manage.service;

import java.util.List;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryPatrolHistoryBO;
import com.hp.manage.domain.PatrolHistoryDO;

public interface PatrolHistoryService {

	public BaseResultDTO createPatrolHistory(PatrolHistoryDO history);

	public BaseResultDTO batchCreatePatrolHistory(List<PatrolHistoryDO> historys);

	public BaseResultDTO modifyPatrolHistory(PatrolHistoryDO history);

	public ResultDTO<PatrolHistoryDO> queryPatrolHistoryById(String id);

	public BatchResultDTO<PatrolHistoryDO> queryPatrolHistoryList(QueryPatrolHistoryBO query);

	public BatchResultDTO<PatrolHistoryDO> queryPatrolHistoryPage(QueryPatrolHistoryBO query);
}
