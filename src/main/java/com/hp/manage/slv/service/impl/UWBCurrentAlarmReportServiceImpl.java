package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBCurrentAlarmReportBO;
import com.hp.manage.slv.dao.UWBCurrentAlarmReportDao;
import com.hp.manage.slv.domain.UWBCurrentAlarmReportDO;
import com.hp.manage.slv.service.UWBCurrentAlarmReportService;

@Service("calarmReportService")
public class UWBCurrentAlarmReportServiceImpl implements UWBCurrentAlarmReportService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private UWBCurrentAlarmReportDao uWBCurrentAlarmReportDao;

	@Override
	public ResultDTO<UWBCurrentAlarmReportDO> queryUWBCurrentAlarmReportById(Integer id) {
		ResultDTO<UWBCurrentAlarmReportDO> result = new ResultDTO<UWBCurrentAlarmReportDO>();
		try {
			UWBCurrentAlarmReportDO report = uWBCurrentAlarmReportDao.selectUWBCurrentAlarmReportById(id);
			if (null == report) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV报警不存在！");
				return result;
			}

			result.setModule(report);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV报警失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV报警失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBCurrentAlarmReportDO> queryUWBCurrentAlarmReportList(QueryUWBCurrentAlarmReportBO query) {
		BatchResultDTO<UWBCurrentAlarmReportDO> result = new BatchResultDTO<UWBCurrentAlarmReportDO>();
		try {
			List<UWBCurrentAlarmReportDO> list = uWBCurrentAlarmReportDao.selectUWBCurrentAlarmReportList(query);

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
