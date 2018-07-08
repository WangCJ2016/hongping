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
import com.hp.manage.bo.QuerySysBroadcastChannelsBO;
import com.hp.manage.bo.QuerySysBroadcastHostsBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.dao.SysBroadcastChannelsDao;
import com.hp.manage.dao.SysBroadcastHostsDao;
import com.hp.manage.dao.SysDeviceAreaDao;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.domain.SysBroadcastHostsDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.service.SysBroadcastHostsService;

@Service("sysBroadcastHostsService")
public class SysBroadcastHostsServiceImpl implements SysBroadcastHostsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysBroadcastHostsDao sysBroadcastHostsDao;

	@Autowired
	private SysBroadcastChannelsDao sysBroadcastChannelsDao;

	@Autowired
	private SysDeviceAreaDao sysDeviceAreaDao;

	@Override
	@Transactional
	public BaseResultDTO createSysBroadcastHosts(SysBroadcastHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysBroadcastHostsBO query = new QuerySysBroadcastHostsBO();
			query.setName(hosts.getName());
			if (CollectionUtils.isNotEmpty(sysBroadcastHostsDao.selectSysBroadcastHostsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("广播主机名称：" + hosts.getName() + "已存在！");
				return result;
			}

			query = new QuerySysBroadcastHostsBO();
			query.setIp(hosts.getIp());
			if (CollectionUtils.isNotEmpty(sysBroadcastHostsDao.selectSysBroadcastHostsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("广播主机IP：" + hosts.getIp() + "已存在！");
				return result;
			}

			int num = sysBroadcastHostsDao.insertSysBroadcastHosts(hosts);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加广播主机失败！");
			}

		} catch (Exception e) {
			logger.error("添加广播主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加广播主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysBroadcastHosts(SysBroadcastHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysBroadcastHostsDao.updateSysBroadcastHosts(hosts);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改广播主机失败！");
			}
		} catch (Exception e) {
			logger.error("修改广播主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改广播主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsById(String id) {
		ResultDTO<SysBroadcastHostsDO> result = new ResultDTO<SysBroadcastHostsDO>();
		try {
			SysBroadcastHostsDO hosts = sysBroadcastHostsDao.selectSysBroadcastHostsById(id);
			if (null == hosts) {
				result.setSuccess(false);
				result.setErrorDetail("该广播主机不存在！");
				return result;
			}

			result.setModule(hosts);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播主机失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsList(QuerySysBroadcastHostsBO query) {
		BatchResultDTO<SysBroadcastHostsDO> result = new BatchResultDTO<SysBroadcastHostsDO>();
		try {
			List<SysBroadcastHostsDO> list = sysBroadcastHostsDao.selectSysBroadcastHostsList(query);
			if (CollectionUtils.isNotEmpty(list)) {
				for (SysBroadcastHostsDO host : list) {
					QuerySysBroadcastChannelsBO queryx = new QuerySysBroadcastChannelsBO();
					queryx.setHostId(host.getId());
					List<SysBroadcastChannelsDO> channels = sysBroadcastChannelsDao
							.selectSysBroadcastChannelsList(queryx);
					for (SysBroadcastChannelsDO channel : channels) {
						if (channel.getType() == 1) {
							channel.setTypeStr("广播");
						} else if (channel.getType() == 2) {
							channel.setTypeStr("对讲");
						}

						QuerySysDeviceAreaBO queryv = new QuerySysDeviceAreaBO();
						queryv.setSearchType("1");
						queryv.setAreaId(query.getAreaId());
						queryv.setDevId(channel.getId());
						List<SysDeviceAreaDO> devicesv = sysDeviceAreaDao.selectSysDeviceAreaList(queryv);
						if (CollectionUtils.isNotEmpty(devicesv)) {
							channel.setDisabled("Y");
						} else {
							channel.setDisabled("N");
						}
					}
					host.setChannels(channels);
				}
			}
			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播主机列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播主机列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysBroadcastHostsDO> querySysBroadcastHostsPage(QuerySysBroadcastHostsBO query) {
		BatchResultDTO<SysBroadcastHostsDO> result = new BatchResultDTO<SysBroadcastHostsDO>();
		try {
			int record = sysBroadcastHostsDao.selectSysBroadcastHostsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysBroadcastHostsDO> list = sysBroadcastHostsDao.selectSysBroadcastHostsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysBroadcastHostsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播主机失败！");
		}
		return result;
	}
}
