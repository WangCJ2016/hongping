package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.dao.AreasDao;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.service.AreasService;

@Service("areasService")
public class AreasServiceImpl implements AreasService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AreasDao areasDao;

	@Override
	@Transactional
	public BaseResultDTO createAreas(AreasDO areas) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QueryAreasBO query = new QueryAreasBO();
			query.setName(areas.getName());
			List<AreasDO> areasx = areasDao.selectAreasList(query);
			if (CollectionUtils.isNotEmpty(areasx)) {
				result.setSuccess(false);
				result.setErrorDetail("区域：" + areas.getName() + "已存在");
				return result;
			}

			int num = areasDao.insertAreas(areas);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加区域失败！");
			}

		} catch (Exception e) {
			logger.error("添加区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加区域失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyAreas(AreasDO areas) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = areasDao.updateAreas(areas);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改区域失败！");
			}
		} catch (Exception e) {
			logger.error("修改区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改区域失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<AreasDO> queryAreasById(String id) {
		ResultDTO<AreasDO> result = new ResultDTO<AreasDO>();
		try {
			AreasDO areas = areasDao.selectAreasById(id);
			if (null == areas) {
				result.setSuccess(false);
				result.setErrorDetail("该区域不存在！");
				return result;
			}

			result.setModule(areas);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询区域失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AreasDO> queryAreasList(QueryAreasBO query) {
		BatchResultDTO<AreasDO> result = new BatchResultDTO<AreasDO>();
		try {
			List<AreasDO> list = areasDao.selectAreasList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询区域列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询区域列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AreasDO> queryAreasPage(QueryAreasBO query) {
		BatchResultDTO<AreasDO> result = new BatchResultDTO<AreasDO>();
		try {
			int record = areasDao.selectAreasCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<AreasDO> list = areasDao.selectAreasPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<AreasDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询区域失败！");
		}
		return result;
	}
}
