package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBCurrentPositionReportBO;
import com.hp.manage.slv.dao.UWBCurrentPositionReportDao;
import com.hp.manage.slv.domain.UWBCurrentPositionReportDO;
import com.hp.manage.slv.service.UWBCurrentPositionReportService;

@Service("currentPositionService")
public class CurrentPositionServiceImpl implements UWBCurrentPositionReportService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private UWBCurrentPositionReportDao uWBCurrentPositionReportDao;

	@Override
	public ResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportById(Integer id) {
		ResultDTO<UWBCurrentPositionReportDO> result = new ResultDTO<UWBCurrentPositionReportDO>();
		try {
			UWBCurrentPositionReportDO position = uWBCurrentPositionReportDao.selectUWBCurrentPositionReportById(id);
			if (null == position) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV实时位置不存在！");
				return result;
			}

			result.setModule(position);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV实时位置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV实时位置失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportList(
			QueryUWBCurrentPositionReportBO query) {
		BatchResultDTO<UWBCurrentPositionReportDO> result = new BatchResultDTO<UWBCurrentPositionReportDO>();
		try {
			List<UWBCurrentPositionReportDO> list = uWBCurrentPositionReportDao
					.selectUWBCurrentPositionReportList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV实时位置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV实时位置列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBHisPositionsGpByRegion(
			QueryUWBCurrentPositionReportBO query) {
		BatchResultDTO<UWBCurrentPositionReportDO> result = new BatchResultDTO<UWBCurrentPositionReportDO>();
		try {
			List<UWBCurrentPositionReportDO> list = uWBCurrentPositionReportDao.selectUWBHisPositionsGpByRegion(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV实时位置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV实时位置列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBCurrentPositionReportDO> queryUWBCurrentPositionReportListx(
			QueryUWBCurrentPositionReportBO query) {
		BatchResultDTO<UWBCurrentPositionReportDO> result = new BatchResultDTO<UWBCurrentPositionReportDO>();
		try {
			List<UWBCurrentPositionReportDO> list = uWBCurrentPositionReportDao
					.selectUWBCurrentPositionReportListx(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV实时位置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV实时位置列表失败！");
		}
		return result;
	}

}
