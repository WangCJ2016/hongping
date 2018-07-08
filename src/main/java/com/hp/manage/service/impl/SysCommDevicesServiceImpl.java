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
import com.hp.manage.bo.QuerySysCommDevicesBO;
import com.hp.manage.dao.SysCommDevicesDao;
import com.hp.manage.domain.SysCommDevicesDO;
import com.hp.manage.service.SysCommDevicesService;

@Service("sysCommDevicesService")
public class SysCommDevicesServiceImpl implements SysCommDevicesService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysCommDevicesDao sysCommDevicesDao;

	@Override
	@Transactional
	public BaseResultDTO createSysCommDevices(SysCommDevicesDO devices) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysCommDevicesBO query = new QuerySysCommDevicesBO();
			query.setHostId(devices.getHostId());
			query.setName(devices.getName());
			if (CollectionUtils.isNotEmpty(sysCommDevicesDao.selectSysCommDevicesList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信设备：" + devices.getName() + "已存在！");
				return result;
			}

			query = new QuerySysCommDevicesBO();
			query.setHostId(devices.getHostId());
			query.setAreaCode(devices.getAreaCode());
			if (CollectionUtils.isNotEmpty(sysCommDevicesDao.selectSysCommDevicesList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信设备区号：" + devices.getAreaCode() + "已存在！");
				return result;
			}

			int num = sysCommDevicesDao.insertSysCommDevices(devices);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加通信设备失败！");
			}

		} catch (Exception e) {
			logger.error("添加通信设备失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加通信设备失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysCommDevices(SysCommDevicesDO devices) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysCommDevicesDao.updateSysCommDevices(devices);

			if (num  >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改通信设备失败！");
			}
		} catch (Exception e) {
			logger.error("修改通信设备失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改通信设备失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysCommDevicesDO> querySysCommDevicesById(String id) {
		ResultDTO<SysCommDevicesDO> result = new ResultDTO<SysCommDevicesDO>();
		try {
			SysCommDevicesDO devices = sysCommDevicesDao.selectSysCommDevicesById(id);
			if (null == devices) {
				result.setSuccess(false);
				result.setErrorDetail("该通信设备不存在！");
				return result;
			}

			result.setModule(devices);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信设备失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信设备失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommDevicesDO> querySysCommDevicesList(QuerySysCommDevicesBO query) {
		BatchResultDTO<SysCommDevicesDO> result = new BatchResultDTO<SysCommDevicesDO>();
		try {
			List<SysCommDevicesDO> list = sysCommDevicesDao.selectSysCommDevicesList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信设备列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信设备列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommDevicesDO> querySysCommDevicesPage(QuerySysCommDevicesBO query) {
		BatchResultDTO<SysCommDevicesDO> result = new BatchResultDTO<SysCommDevicesDO>();
		try {
			int record = sysCommDevicesDao.selectSysCommDevicesCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysCommDevicesDO> list = sysCommDevicesDao.selectSysCommDevicesPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysCommDevicesDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信设备失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信设备失败！");
		}
		return result;
	}
}
