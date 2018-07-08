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
import com.hp.manage.bo.QuerySysCommHostsBO;
import com.hp.manage.bo.QuerySysCommPropertiesBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.dao.SysCommDevicesDao;
import com.hp.manage.dao.SysCommHostsDao;
import com.hp.manage.dao.SysCommPropertiesDao;
import com.hp.manage.dao.SysDeviceAreaDao;
import com.hp.manage.domain.SysCommDevicesDO;
import com.hp.manage.domain.SysCommHostsDO;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.service.SysCommHostsService;

@Service("sysCommHostsService")
public class SysCommHostsServiceImpl implements SysCommHostsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysCommHostsDao sysCommHostsDao;

	@Autowired
	private SysCommDevicesDao sysCommDevicesDao;

	@Autowired
	private SysCommPropertiesDao sysCommPropertiesDao;

	@Autowired
	private SysDeviceAreaDao sysDeviceAreaDao;

	@Override
	@Transactional
	public BaseResultDTO createSysCommHosts(SysCommHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysCommHostsBO query = new QuerySysCommHostsBO();
			query.setName(hosts.getName());
			if (CollectionUtils.isNotEmpty(sysCommHostsDao.selectSysCommHostsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信主机：" + hosts.getName() + "已存在！");
				return result;
			}

			query = new QuerySysCommHostsBO();
			query.setIp(hosts.getIp());
			if (CollectionUtils.isNotEmpty(sysCommHostsDao.selectSysCommHostsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("通信IP：" + hosts.getIp() + "已存在！");
				return result;
			}

			int num = sysCommHostsDao.insertSysCommHosts(hosts);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加通信主机失败！");
			}

		} catch (Exception e) {
			logger.error("添加通信主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加通信主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysCommHosts(SysCommHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysCommHostsDao.updateSysCommHosts(hosts);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改通信主机失败！");
			}
		} catch (Exception e) {
			logger.error("修改通信主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改通信主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysCommHostsDO> querySysCommHostsById(String id) {
		ResultDTO<SysCommHostsDO> result = new ResultDTO<SysCommHostsDO>();
		try {
			SysCommHostsDO hosts = sysCommHostsDao.selectSysCommHostsById(id);
			if (null == hosts) {
				result.setSuccess(false);
				result.setErrorDetail("该通信主机不存在！");
				return result;
			}

			result.setModule(hosts);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信主机失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommHostsDO> querySysCommHostsList(QuerySysCommHostsBO query) {
		BatchResultDTO<SysCommHostsDO> result = new BatchResultDTO<SysCommHostsDO>();
		try {
			List<SysCommHostsDO> list = sysCommHostsDao.selectSysCommHostsList(query);
			if (CollectionUtils.isNotEmpty(list)) {
				for (SysCommHostsDO host : list) {
					QuerySysCommDevicesBO queryx = new QuerySysCommDevicesBO();
					queryx.setHostId(host.getId());
					List<SysCommDevicesDO> devices = sysCommDevicesDao.selectSysCommDevicesList(queryx);
					if (CollectionUtils.isNotEmpty(devices)) {
						for (SysCommDevicesDO device : devices) {
							QuerySysCommPropertiesBO queryz = new QuerySysCommPropertiesBO();
							queryz.setDevHostId(device.getId());
							List<SysCommPropertiesDO> properties = sysCommPropertiesDao
									.selectSysCommPropertiesList(queryz);
							if (CollectionUtils.isNotEmpty(properties)) {
								for (SysCommPropertiesDO property : properties) {
									if (host.getType() == 1) {
										property.setTypeStr("门禁");
									} else if (host.getType() == 2) {
										property.setTypeStr("消防");
									}

									QuerySysDeviceAreaBO queryv = new QuerySysDeviceAreaBO();
									queryv.setSearchType("1");
									queryv.setAreaId(query.getAreaId());
									queryv.setDevId(property.getId());
									List<SysDeviceAreaDO> devicesv = sysDeviceAreaDao.selectSysDeviceAreaList(queryv);
									if (CollectionUtils.isNotEmpty(devicesv)) {
										property.setDisabled("Y");
									} else {
										property.setDisabled("N");
									}
								}
								device.setProperties(properties);
							}
						}
						host.setDevices(devices);
					}
				}
			}
			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信主机列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信主机列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysCommHostsDO> querySysCommHostsPage(QuerySysCommHostsBO query) {
		BatchResultDTO<SysCommHostsDO> result = new BatchResultDTO<SysCommHostsDO>();
		try {
			int record = sysCommHostsDao.selectSysCommHostsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysCommHostsDO> list = sysCommHostsDao.selectSysCommHostsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysCommHostsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询通信主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询通信主机失败！");
		}
		return result;
	}
}
