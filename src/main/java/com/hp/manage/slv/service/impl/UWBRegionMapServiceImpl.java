package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryUWBRegionMapBO;
import com.hp.manage.slv.dao.UWBRegionMapDao;
import com.hp.manage.slv.domain.UWBRegionMapDO;
import com.hp.manage.slv.service.UWBRegionMapService;

@Service("uWBRegionMapService")
public class UWBRegionMapServiceImpl implements UWBRegionMapService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private UWBRegionMapDao uWBRegionMapDao;

	@Override
	public ResultDTO<UWBRegionMapDO> queryUWBRegionMapById(Integer id) {
		ResultDTO<UWBRegionMapDO> result = new ResultDTO<UWBRegionMapDO>();
		try {
			UWBRegionMapDO map = uWBRegionMapDao.selectUWBRegionMapById(id);
			if (null == map) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV地图不存在！");
				return result;
			}

			result.setModule(map);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV地图失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV地图失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<UWBRegionMapDO> queryUWBRegionMapList(QueryUWBRegionMapBO query) {
		BatchResultDTO<UWBRegionMapDO> result = new BatchResultDTO<UWBRegionMapDO>();
		try {
			List<UWBRegionMapDO> list = uWBRegionMapDao.selectUWBRegionMapList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV地图列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV地图列表失败！");
		}
		return result;
	}

}
