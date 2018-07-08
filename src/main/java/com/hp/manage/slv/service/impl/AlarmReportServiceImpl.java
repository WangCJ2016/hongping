package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryAlarmReportBO;
import com.hp.manage.slv.dao.AlarmReportDao;
import com.hp.manage.slv.domain.AlarmReportDO;
import com.hp.manage.slv.service.AlarmReportService;

@Service("alarmReportService")
public class AlarmReportServiceImpl implements AlarmReportService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AlarmReportDao alarmReportDao;

	@Override
	public ResultDTO<AlarmReportDO> queryAlarmReportById(Integer id) {
		ResultDTO<AlarmReportDO> result = new ResultDTO<AlarmReportDO>();
		try {
			AlarmReportDO alarmReport = alarmReportDao.selectAlarmReportById(id);
			if (null == alarmReport) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV报警不存在！");
				return result;
			}

			result.setModule(alarmReport);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV报警失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV报警失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AlarmReportDO> queryAlarmReportList(QueryAlarmReportBO query) {
		BatchResultDTO<AlarmReportDO> result = new BatchResultDTO<AlarmReportDO>();
		try {
			List<AlarmReportDO> list = alarmReportDao.selectAlarmReportList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV报警列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV报警列表失败！");
		}
		return result;
	}

}
