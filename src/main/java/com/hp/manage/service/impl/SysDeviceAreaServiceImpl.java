package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.dao.SysDeviceAreaDao;
import com.hp.manage.dao.SysInstallPlaceDao;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.service.SysDeviceAreaService;

@Service("sysDeviceAreaService")
public class SysDeviceAreaServiceImpl implements SysDeviceAreaService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysDeviceAreaDao sysDeviceAreaDao;

	@Autowired
	private SysInstallPlaceDao sysInstallPlaceDao;

	@Override
	@Transactional
	public BaseResultDTO createSysDeviceArea(SysDeviceAreaDO deviceArea) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysDeviceAreaDao.insertSysDeviceArea(deviceArea);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加设备区域绑定失败！");
			}

		} catch (Exception e) {
			logger.error("添加设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加设备区域绑定失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysDeviceArea(SysDeviceAreaDO deviceArea) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysDeviceAreaDao.updateSysDeviceArea(deviceArea);

			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改设备区域绑定失败！");
			}
		} catch (Exception e) {
			logger.error("修改设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改设备区域绑定失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysDeviceAreaDO> querySysDeviceAreaById(String id) {
		ResultDTO<SysDeviceAreaDO> result = new ResultDTO<SysDeviceAreaDO>();
		try {
			SysDeviceAreaDO channels = sysDeviceAreaDao.selectSysDeviceAreaById(id);
			if (null == channels) {
				result.setSuccess(false);
				result.setErrorDetail("该设备区域绑定不存在！");
				return result;
			}

			result.setModule(channels);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备区域绑定失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysDeviceAreaDO> querySysDeviceAreaList(QuerySysDeviceAreaBO query) {
		BatchResultDTO<SysDeviceAreaDO> result = new BatchResultDTO<SysDeviceAreaDO>();
		try {
			List<SysDeviceAreaDO> list = sysDeviceAreaDao.selectSysDeviceAreaList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备区域绑定列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备区域绑定列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysDeviceAreaDO> querySysDeviceAreaPage(QuerySysDeviceAreaBO query) {
		BatchResultDTO<SysDeviceAreaDO> result = new BatchResultDTO<SysDeviceAreaDO>();
		try {
			int record = sysDeviceAreaDao.selectSysDeviceAreaCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysDeviceAreaDO> list = sysDeviceAreaDao.selectSysDeviceAreaPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysDeviceAreaDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备区域绑定失败！");
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO deleteSysDeviceArea(Map<String, Object> params) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysDeviceAreaDao.deleteSysDeviceArea(params);
			if (num >= 1) {
				num = sysInstallPlaceDao.deleteSysInstallPlace(params);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除设备区域绑定失败！");
			}
		} catch (Exception e) {
			logger.error("删除设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删除设备区域绑定失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO batchModifySysDeviceArea(List<SysDeviceAreaDO> deviceAreas) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysDeviceAreaDao.batchUpdateSysDeviceArea(deviceAreas);
			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("批量修改设备区域绑定失败！");
			}
		} catch (Exception e) {
			logger.error("批量修改设备区域绑定失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("批量修改设备区域绑定失败！");
			throw e;
		}
		return result;
	}
}
