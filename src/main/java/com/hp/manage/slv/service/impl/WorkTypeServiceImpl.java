package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryWorkTypeBO;
import com.hp.manage.slv.dao.WorkTypeDao;
import com.hp.manage.slv.domain.WorkTypeDO;
import com.hp.manage.slv.service.WorkTypeService;

@Service("workTypeService")
public class WorkTypeServiceImpl implements WorkTypeService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private WorkTypeDao workTypeDao;

	@Override
	public ResultDTO<WorkTypeDO> queryWorkTypeById(Integer id) {
		ResultDTO<WorkTypeDO> result = new ResultDTO<WorkTypeDO>();
		try {
			WorkTypeDO type = workTypeDao.selectWorkTypeById(id);
			if (null == type) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV工种不存在！");
				return result;
			}

			result.setModule(type);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV工种失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV工种失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<WorkTypeDO> queryWorkTypeList(QueryWorkTypeBO query) {
		BatchResultDTO<WorkTypeDO> result = new BatchResultDTO<WorkTypeDO>();
		try {
			List<WorkTypeDO> list = workTypeDao.selectWorkTypeList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV工种列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV工种列表失败！");
		}
		return result;
	}

}
