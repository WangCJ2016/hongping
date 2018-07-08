package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBPositionReportBO;
import com.hp.manage.slv.dao.UWBPositionReportDao;
import com.hp.manage.slv.domain.UWBPositionReportDO;
import com.hp.manage.slv.service.UWBPositionReportService;

@Service("hisPositionService")
public class HisPositionServiceImpl implements UWBPositionReportService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private UWBPositionReportDao uWBPositionReportDao;

	@Override
	public ResultDTO<UWBPositionReportDO> queryUWBPositionReportById(Integer id) {
		ResultDTO<UWBPositionReportDO> result = new ResultDTO<UWBPositionReportDO>();
		try {
			UWBPositionReportDO position = uWBPositionReportDao.selectUWBPositionReportById(id);
			if (null == position) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV历史位置不存在！");
				return result;
			}

			result.setModule(position);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV历史位置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV历史位置失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBPositionReportDO> queryUWBPositionReportList(QueryUWBPositionReportBO query) {
		BatchResultDTO<UWBPositionReportDO> result = new BatchResultDTO<UWBPositionReportDO>();
		try {
			List<UWBPositionReportDO> list = uWBPositionReportDao.selectUWBPositionReportList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV历史位置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV历史位置列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBPositionReportDO> queryUWBHisPositionsGpByRegion(QueryUWBPositionReportBO query) {
		BatchResultDTO<UWBPositionReportDO> result = new BatchResultDTO<UWBPositionReportDO>();
		try {
			List<UWBPositionReportDO> list = uWBPositionReportDao.selectUWBHisPositionsGpByRegion(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV历史位置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV历史位置列表失败！");
		}
		return result;
	}

}
