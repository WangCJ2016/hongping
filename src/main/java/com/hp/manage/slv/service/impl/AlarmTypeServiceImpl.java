package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryAlarmTypeBO;
import com.hp.manage.slv.dao.AlarmTypeDao;
import com.hp.manage.slv.domain.AlarmTypeDO;
import com.hp.manage.slv.service.AlarmTypeService;

@Service("alarmTypeService")
public class AlarmTypeServiceImpl implements AlarmTypeService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AlarmTypeDao alarmTypeDao;

	@Override
	public ResultDTO<AlarmTypeDO> queryAlarmTypeById(Integer id) {
		ResultDTO<AlarmTypeDO> result = new ResultDTO<AlarmTypeDO>();
		try {
			AlarmTypeDO alarmType = alarmTypeDao.selectAlarmTypeById(id);
			if (null == alarmType) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV报警类型不存在！");
				return result;
			}

			result.setModule(alarmType);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV报警类型失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV报警类型失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AlarmTypeDO> queryAlarmTypeList(QueryAlarmTypeBO query) {
		BatchResultDTO<AlarmTypeDO> result = new BatchResultDTO<AlarmTypeDO>();
		try {
			List<AlarmTypeDO> list = alarmTypeDao.selectAlarmTypeList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV报警类型列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV报警类型列表失败！");
		}
		return result;
	}

}
