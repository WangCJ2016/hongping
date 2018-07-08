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
import com.hp.manage.bo.QuerySysCommPropertiesBO;
import com.hp.manage.dao.SysCommPropertiesDao;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.service.SysCommPropertiesService;

@Service("sysCommPropertiesService")
public class SysCommPropertiesServiceImpl implements SysCommPropertiesService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysCommPropertiesDao sysCommPropertiesDao;

	@Override
	@Transactional
	public BaseResultDTO createSysCommProperties(SysCommPropertiesDO property) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysCommPropertiesBO query = new QuerySysCommPropertiesBO();
			query.setName(property.getName());
			query.setDevHostId(property.getDevHostId());
			if (CollectionUtils.isNotEmpty(sysCommPropertiesDao.selectSysCommPropertiesList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信属性名称：" + property.getName() + "已存在！");
				return result;
			}

			query = new QuerySysCommPropertiesBO();
			query.setAddressCode(property.getAddressCode());
			query.setDevHostId(property.getDevHostId());
			if (CollectionUtils.isNotEmpty(sysCommPropertiesDao.selectSysCommPropertiesList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信属性地址编号：" + property.getAddressCode() + "已存在！");
				return result;
			}

			int num = sysCommPropertiesDao.insertSysCommProperties(property);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加通信属性失败！");
			}

		} catch (Exception e) {
			logger.error("添加通信属性失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加通信属性失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysCommProperties(SysCommPropertiesDO property) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysCommPropertiesDao.updateSysCommProperties(property);

			if (num  >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改通信属性失败！");
			}
		} catch (Exception e) {
			logger.error("修改通信属性失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改通信属性失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysCommPropertiesDO> querySysCommPropertiesById(String id) {
		ResultDTO<SysCommPropertiesDO> result = new ResultDTO<SysCommPropertiesDO>();
		try {
			SysCommPropertiesDO property = sysCommPropertiesDao.selectSysCommPropertiesById(id);
			if (null == property) {
				result.setSuccess(false);
				result.setErrorDetail("该通信属性不存在！");
				return result;
			}

			result.setModule(property);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信属性失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信属性失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommPropertiesDO> querySysCommPropertiesList(QuerySysCommPropertiesBO query) {
		BatchResultDTO<SysCommPropertiesDO> result = new BatchResultDTO<SysCommPropertiesDO>();
		try {
			List<SysCommPropertiesDO> list = sysCommPropertiesDao.selectSysCommPropertiesList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信属性列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信属性列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommPropertiesDO> querySysCommPropertiesPage(QuerySysCommPropertiesBO query) {
		BatchResultDTO<SysCommPropertiesDO> result = new BatchResultDTO<SysCommPropertiesDO>();
		try {
			int record = sysCommPropertiesDao.selectSysCommPropertiesCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysCommPropertiesDO> list = sysCommPropertiesDao.selectSysCommPropertiesPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysCommPropertiesDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信属性失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信属性失败！");
		}
		return result;
	}
}
