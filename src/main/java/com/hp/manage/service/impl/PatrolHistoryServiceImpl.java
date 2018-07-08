package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryPatrolHistoryBO;
import com.hp.manage.dao.PatrolHistoryDao;
import com.hp.manage.domain.PatrolHistoryDO;
import com.hp.manage.service.PatrolHistoryService;

@Service("patrolHistoryService")
public class PatrolHistoryServiceImpl implements PatrolHistoryService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PatrolHistoryDao patrolHistoryDao;

	@Override
	@Transactional
	public BaseResultDTO createPatrolHistory(PatrolHistoryDO history) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolHistoryDao.insertPatrolHistory(history);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加巡更历史失败！");
			}

		} catch (Exception e) {
			logger.error("添加巡更历史失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加巡更历史失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyPatrolHistory(PatrolHistoryDO history) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolHistoryDao.updatePatrolHistory(history);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改巡更历史失败！");
			}
		} catch (Exception e) {
			logger.error("修改巡更历史失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改巡更历史失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<PatrolHistoryDO> queryPatrolHistoryById(String id) {
		ResultDTO<PatrolHistoryDO> result = new ResultDTO<PatrolHistoryDO>();
		try {
			PatrolHistoryDO history = patrolHistoryDao.selectPatrolHistoryById(id);
			if (null == history) {
				result.setSuccess(false);
				result.setErrorDetail("该巡更历史不存在！");
				return result;
			}

			result.setModule(history);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更历史失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更历史失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolHistoryDO> queryPatrolHistoryList(QueryPatrolHistoryBO query) {
		BatchResultDTO<PatrolHistoryDO> result = new BatchResultDTO<PatrolHistoryDO>();
		try {
			List<PatrolHistoryDO> list = patrolHistoryDao.selectPatrolHistoryList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更历史列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更历史列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolHistoryDO> queryPatrolHistoryPage(QueryPatrolHistoryBO query) {
		BatchResultDTO<PatrolHistoryDO> result = new BatchResultDTO<PatrolHistoryDO>();
		try {
			int record = patrolHistoryDao.selectPatrolHistoryCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<PatrolHistoryDO> list = patrolHistoryDao.selectPatrolHistoryPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<PatrolHistoryDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更历史失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更历史失败！");
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO batchCreatePatrolHistory(List<PatrolHistoryDO> historys) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolHistoryDao.batchInsertPatrolHistory(historys);
			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("批量添加巡更历史失败！");
			}

		} catch (Exception e) {
			logger.error("批量添加巡更历史失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("批量添加巡更历史失败！");
			throw e;
		}
		return result;
	}
}
