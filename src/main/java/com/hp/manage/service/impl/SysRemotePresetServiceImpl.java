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
import com.hp.manage.bo.QuerySysRemotePresetBO;
import com.hp.manage.dao.SysRemotePresetDao;
import com.hp.manage.domain.SysRemotePresetDO;
import com.hp.manage.service.SysRemotePresetService;

@Service("sysRemotePresetService")
public class SysRemotePresetServiceImpl implements SysRemotePresetService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysRemotePresetDao sysRemotePresetDao;

	@Override
	@Transactional
	public BaseResultDTO createSysRemotePreset(SysRemotePresetDO preset) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysRemotePresetBO query = new QuerySysRemotePresetBO();
			query.setPresetName(preset.getPresetName());
			if (CollectionUtils.isNotEmpty(sysRemotePresetDao.selectSysRemotePresetList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("预置位：" + preset.getPresetName() + "已存在！");
				return result;
			}

			int num = sysRemotePresetDao.insertSysRemotePreset(preset);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加通道预置位失败！");
			}

		} catch (Exception e) {
			logger.error("添加通道预置位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加通道预置位失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysRemotePreset(SysRemotePresetDO preset) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePresetDao.updateSysRemotePreset(preset);

			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改通道预置位失败！");
			}
		} catch (Exception e) {
			logger.error("修改通道预置位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改通道预置位失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysRemotePresetDO> querySysRemotePresetById(String id) {
		ResultDTO<SysRemotePresetDO> result = new ResultDTO<SysRemotePresetDO>();
		try {
			SysRemotePresetDO preset = sysRemotePresetDao.selectSysRemotePresetById(id);
			if (null == preset) {
				result.setSuccess(false);
				result.setErrorDetail("该通道预置位不存在！");
				return result;
			}

			result.setModule(preset);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通道预置位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通道预置位失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemotePresetDO> querySysRemotePresetList(QuerySysRemotePresetBO query) {
		BatchResultDTO<SysRemotePresetDO> result = new BatchResultDTO<SysRemotePresetDO>();
		try {
			List<SysRemotePresetDO> list = sysRemotePresetDao.selectSysRemotePresetList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通道预置位列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通道预置位列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemotePresetDO> querySysRemotePresetPage(QuerySysRemotePresetBO query) {
		BatchResultDTO<SysRemotePresetDO> result = new BatchResultDTO<SysRemotePresetDO>();
		try {
			int record = sysRemotePresetDao.selectSysRemotePresetCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysRemotePresetDO> list = sysRemotePresetDao.selectSysRemotePresetPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysRemotePresetDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通道预置位失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通道预置位失败！");
		}
		return result;
	}
}
