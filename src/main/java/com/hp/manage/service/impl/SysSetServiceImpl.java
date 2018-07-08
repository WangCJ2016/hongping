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
import com.hp.manage.bo.QuerySysSetBO;
import com.hp.manage.dao.SysSetDao;
import com.hp.manage.domain.SysSetDO;
import com.hp.manage.service.SysSetService;

@Service("sysSetService")
public class SysSetServiceImpl implements SysSetService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysSetDao sysSetDao;

	@Override
	@Transactional
	public BaseResultDTO createSysSet(SysSetDO set) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysSetDao.insertSysSet(set);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加系统设置失败！");
			}

		} catch (Exception e) {
			logger.error("添加系统设置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加系统设置失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysSet(SysSetDO set) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysSetDao.updateSysSet(set);

			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改系统设置失败！");
			}
		} catch (Exception e) {
			logger.error("修改系统设置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改系统设置失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysSetDO> querySysSetById(String id) {
		ResultDTO<SysSetDO> result = new ResultDTO<SysSetDO>();
		try {
			SysSetDO set = sysSetDao.selectSysSetById(id);
			if (null == set) {
				result.setSuccess(false);
				result.setErrorDetail("该系统设置不存在！");
				return result;
			}

			result.setModule(set);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询系统设置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询系统设置失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysSetDO> querySysSetList(QuerySysSetBO query) {
		BatchResultDTO<SysSetDO> result = new BatchResultDTO<SysSetDO>();
		try {
			List<SysSetDO> list = sysSetDao.selectSysSetList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询系统设置列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询系统设置列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysSetDO> querySysSetPage(QuerySysSetBO query) {
		BatchResultDTO<SysSetDO> result = new BatchResultDTO<SysSetDO>();
		try {
			int record = sysSetDao.selectSysSetCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysSetDO> list = sysSetDao.selectSysSetPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysSetDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询系统设置失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询系统设置失败！");
		}
		return result;
	}
}
