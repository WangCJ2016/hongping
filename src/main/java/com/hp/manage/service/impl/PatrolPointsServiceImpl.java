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
import com.hp.manage.bo.QueryPatrolPointsBO;
import com.hp.manage.dao.PatrolPointsDao;
import com.hp.manage.domain.PatrolPointsDO;
import com.hp.manage.service.PatrolPointsService;

@Service("patrolPointsService")
public class PatrolPointsServiceImpl implements PatrolPointsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PatrolPointsDao patrolPointsDao;

	@Override
	@Transactional
	public BaseResultDTO createPatrolPoints(PatrolPointsDO patrolPoints) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolPointsDao.insertPatrolPoints(patrolPoints);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加巡更点位失败！");
			}

		} catch (Exception e) {
			logger.error("添加巡更点位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加巡更点位失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyPatrolPoints(PatrolPointsDO patrolPoints) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolPointsDao.updatePatrolPoints(patrolPoints);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改巡更点位失败！");
			}
		} catch (Exception e) {
			logger.error("修改巡更点位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改巡更点位失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<PatrolPointsDO> queryPatrolPointsById(String id) {
		ResultDTO<PatrolPointsDO> result = new ResultDTO<PatrolPointsDO>();
		try {
			PatrolPointsDO patrolPoints = patrolPointsDao.selectPatrolPointsById(id);
			if (null == patrolPoints) {
				result.setSuccess(false);
				result.setErrorDetail("该巡更点位不存在！");
				return result;
			}

			result.setModule(patrolPoints);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolPointsDO> queryPatrolPointsList(QueryPatrolPointsBO query) {
		BatchResultDTO<PatrolPointsDO> result = new BatchResultDTO<PatrolPointsDO>();
		try {
			List<PatrolPointsDO> list = patrolPointsDao.selectPatrolPointsList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolPointsDO> queryPatrolPointsPage(QueryPatrolPointsBO query) {
		BatchResultDTO<PatrolPointsDO> result = new BatchResultDTO<PatrolPointsDO>();
		try {
			int record = patrolPointsDao.selectPatrolPointsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<PatrolPointsDO> list = patrolPointsDao.selectPatrolPointsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<PatrolPointsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位失败！");
		}
		return result;
	}
}
