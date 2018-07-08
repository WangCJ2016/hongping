package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBRegionReportBO;
import com.hp.manage.slv.dao.UWBRegionReportDao;
import com.hp.manage.slv.domain.UWBRegionReportDO;
import com.hp.manage.slv.service.UWBRegionReportService;

@Service("uWBRegionReportService")
public class UWBRegionReportServiceImpl implements UWBRegionReportService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private UWBRegionReportDao uWBRegionReportDao;

	@Override
	public ResultDTO<UWBRegionReportDO> queryUWBRegionReportById(Integer id) {
		ResultDTO<UWBRegionReportDO> result = new ResultDTO<UWBRegionReportDO>();
		try {
			UWBRegionReportDO report = uWBRegionReportDao.selectUWBRegionReportById(id);
			if (null == report) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV历史进出区域不存在！");
				return result;
			}

			result.setModule(report);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV历史进出区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV历史进出区域失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBRegionReportDO> queryUWBRegionReportList(QueryUWBRegionReportBO query) {
		BatchResultDTO<UWBRegionReportDO> result = new BatchResultDTO<UWBRegionReportDO>();
		try {
			List<UWBRegionReportDO> list = uWBRegionReportDao.selectUWBRegionReportList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV历史进出区域列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV历史进出区域列表失败！");
		}
		return result;
	}

}
