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
import com.hp.manage.bo.QueryAlarmsBO;
import com.hp.manage.dao.AlarmsDao;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.AlarmsDOX;
import com.hp.manage.service.AlarmsService;

@Service("alarmsService")
public class AlarmsServiceImpl implements AlarmsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AlarmsDao alarmsDao;

	@Override
	@Transactional
	public BaseResultDTO createAlarms(AlarmsDO alarms) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = alarmsDao.insertAlarms(alarms);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加报警信息失败！");
			}

		} catch (Exception e) {
			logger.error("添加报警信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加报警信息失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyAlarms(AlarmsDO alarms) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = alarmsDao.updateAlarms(alarms);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改报警信息失败！");
			}
		} catch (Exception e) {
			logger.error("修改报警信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改报警信息失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<AlarmsDO> queryAlarmsById(String id) {
		ResultDTO<AlarmsDO> result = new ResultDTO<AlarmsDO>();
		try {
			AlarmsDO alarms = alarmsDao.selectAlarmsById(id);
			if (null == alarms) {
				result.setSuccess(false);
				result.setErrorDetail("该报警信息不存在！");
				return result;
			}

			result.setModule(alarms);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询报警信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询报警信息失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AlarmsDO> queryAlarmsList(QueryAlarmsBO query) {
		BatchResultDTO<AlarmsDO> result = new BatchResultDTO<AlarmsDO>();
		try {
			List<AlarmsDO> list = alarmsDao.selectAlarmsList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询报警信息列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询报警信息列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AlarmsDO> queryAlarmsPage(QueryAlarmsBO query) {
		BatchResultDTO<AlarmsDO> result = new BatchResultDTO<AlarmsDO>();
		try {
			int record = alarmsDao.selectAlarmsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<AlarmsDO> list = alarmsDao.selectAlarmsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<AlarmsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询报警信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询报警信息失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO queryAlarmsCount(QueryAlarmsBO query) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = alarmsDao.selectAlarmsCount(query);

			result.setResultCode(String.valueOf(num));
		} catch (Exception e) {
			logger.error("报警数量失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("报警数量失败！");
			throw e;
		}
		return result;
	}

	@Override
	public BatchResultDTO<AlarmsDOX> queryAlarmsChart(QueryAlarmsBO query) {
		BatchResultDTO<AlarmsDOX> result = new BatchResultDTO<AlarmsDOX>();
		try {
			List<AlarmsDOX> list = alarmsDao.selectAlarmsChart(query);
			if (CollectionUtils.isNotEmpty(list)) {
				result.setModule(list);
			} else {
				result.setModule(Collections.<AlarmsDOX> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询报警信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询报警信息失败！");
		}
		return result;
	}
}
