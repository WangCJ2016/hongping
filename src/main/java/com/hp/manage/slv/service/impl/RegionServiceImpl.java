package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.dao.RegionDao;
import com.hp.manage.slv.domain.RegionDO;
import com.hp.manage.slv.service.RegionService;

@Service("regionService")
public class RegionServiceImpl implements RegionService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RegionDao regionDao;

	@Override
	public ResultDTO<RegionDO> queryRegionById(Integer id) {
		ResultDTO<RegionDO> result = new ResultDTO<RegionDO>();
		try {
			RegionDO region = regionDao.selectRegionById(id);
			if (null == region) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV区域不存在！");
				return result;
			}

			result.setModule(region);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV区域失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RegionDO> queryRegionList(QueryRegionBO query) {
		BatchResultDTO<RegionDO> result = new BatchResultDTO<RegionDO>();
		try {
			List<RegionDO> list = regionDao.selectRegionList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV区域列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV区域列表失败！");
		}
		return result;
	}

}
