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
import com.hp.manage.bo.QueryPatrolTaskPointBO;
import com.hp.manage.dao.PatrolTaskPointDao;
import com.hp.manage.domain.PatrolTaskPointDO;
import com.hp.manage.service.PatrolTaskPointService;

@Service("patrolTaskPointService")
public class PatrolTaskPointServiceImpl implements PatrolTaskPointService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PatrolTaskPointDao patrolTaskPointDao;

	@Override
	@Transactional
	public BaseResultDTO createPatrolTaskPoint(PatrolTaskPointDO taskPoint) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolTaskPointDao.insertPatrolTaskPoint(taskPoint);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加巡更点位任务失败！");
			}

		} catch (Exception e) {
			logger.error("添加巡更点位任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加巡更点位任务失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyPatrolTaskPoint(PatrolTaskPointDO taskPoint) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolTaskPointDao.updatePatrolTaskPoint(taskPoint);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改巡更点位任务失败！");
			}
		} catch (Exception e) {
			logger.error("修改巡更点位任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改巡更点位任务失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<PatrolTaskPointDO> queryPatrolTaskPointById(String id) {
		ResultDTO<PatrolTaskPointDO> result = new ResultDTO<PatrolTaskPointDO>();
		try {
			PatrolTaskPointDO taskPoint = patrolTaskPointDao.selectPatrolTaskPointById(id);
			if (null == taskPoint) {
				result.setSuccess(false);
				result.setErrorDetail("该巡更点位任务不存在！");
				return result;
			}

			result.setModule(taskPoint);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位任务失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolTaskPointDO> queryPatrolTaskPointList(QueryPatrolTaskPointBO query) {
		BatchResultDTO<PatrolTaskPointDO> result = new BatchResultDTO<PatrolTaskPointDO>();
		try {
			List<PatrolTaskPointDO> list = patrolTaskPointDao.selectPatrolTaskPointList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位任务列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位任务列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolTaskPointDO> queryPatrolTaskPointPage(QueryPatrolTaskPointBO query) {
		BatchResultDTO<PatrolTaskPointDO> result = new BatchResultDTO<PatrolTaskPointDO>();
		try {
			int record = patrolTaskPointDao.selectPatrolTaskPointCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<PatrolTaskPointDO> list = patrolTaskPointDao.selectPatrolTaskPointPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<PatrolTaskPointDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更点位任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更点位任务失败！");
		}
		return result;
	}
}
