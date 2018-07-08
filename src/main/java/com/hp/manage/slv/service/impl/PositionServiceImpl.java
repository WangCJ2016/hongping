package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryPositionBO;
import com.hp.manage.slv.dao.PositionDao;
import com.hp.manage.slv.domain.PositionDO;
import com.hp.manage.slv.service.PositionService;

@Service("positionService")
public class PositionServiceImpl implements PositionService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PositionDao positionDao;

	@Override
	public ResultDTO<PositionDO> queryPositionById(Integer id) {
		ResultDTO<PositionDO> result = new ResultDTO<PositionDO>();
		try {
			PositionDO position = positionDao.selectPositionById(id);
			if (null == position) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV基站不存在！");
				return result;
			}

			result.setModule(position);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV基站失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV基站失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PositionDO> queryPositionList(QueryPositionBO query) {
		BatchResultDTO<PositionDO> result = new BatchResultDTO<PositionDO>();
		try {
			List<PositionDO> list = positionDao.selectPositionList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV基站列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV基站列表失败！");
		}
		return result;
	}

}
