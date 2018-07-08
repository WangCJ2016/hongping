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
import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.dao.PatrolTasksDao;
import com.hp.manage.domain.PatrolTasksDO;
import com.hp.manage.service.PatrolTasksService;

@Service("patrolTasksService")
public class PatrolTasksServiceImpl implements PatrolTasksService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PatrolTasksDao patrolTasksDao;

	@Override
	@Transactional
	public BaseResultDTO createPatrolTasks(PatrolTasksDO tasks) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QueryPatrolTasksBO query = new QueryPatrolTasksBO();
			query.setTitle(tasks.getTitle());
			if (CollectionUtils.isNotEmpty(patrolTasksDao.selectPatrolTasksList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("巡更任务：" + tasks.getTitle() + "已存在！");
				return result;
			}

			int num = patrolTasksDao.insertPatrolTasks(tasks);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加巡更任务失败！");
			}

		} catch (Exception e) {
			logger.error("添加巡更任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加巡更任务失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyPatrolTasks(PatrolTasksDO tasks) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolTasksDao.updatePatrolTasks(tasks);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改巡更任务失败！");
			}
		} catch (Exception e) {
			logger.error("修改巡更任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改巡更任务失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<PatrolTasksDO> queryPatrolTasksById(String id) {
		ResultDTO<PatrolTasksDO> result = new ResultDTO<PatrolTasksDO>();
		try {
			PatrolTasksDO tasks = patrolTasksDao.selectPatrolTasksById(id);
			if (null == tasks) {
				result.setSuccess(false);
				result.setErrorDetail("该巡更任务不存在！");
				return result;
			}

			result.setModule(tasks);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更任务失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolTasksDO> queryPatrolTasksList(QueryPatrolTasksBO query) {
		BatchResultDTO<PatrolTasksDO> result = new BatchResultDTO<PatrolTasksDO>();
		try {
			List<PatrolTasksDO> list = patrolTasksDao.selectPatrolTasksList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更任务列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更任务列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PatrolTasksDO> queryPatrolTasksPage(QueryPatrolTasksBO query) {
		BatchResultDTO<PatrolTasksDO> result = new BatchResultDTO<PatrolTasksDO>();
		try {
			int record = patrolTasksDao.selectPatrolTasksCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<PatrolTasksDO> list = patrolTasksDao.selectPatrolTasksPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<PatrolTasksDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询巡更任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询巡更任务失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO modifyPatrolTasksTime(PatrolTasksDO tasks) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = patrolTasksDao.updatePatrolTasksTime(tasks);
			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改巡更任务失败！");
			}
		} catch (Exception e) {
			logger.error("修改巡更任务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改巡更任务失败！");
			throw e;
		}
		return result;
	}
}
