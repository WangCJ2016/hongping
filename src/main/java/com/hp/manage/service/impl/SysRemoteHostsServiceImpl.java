package com.hp.manage.service.impl;

import java.util.ArrayList;
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
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysRemoteChannelsBO;
import com.hp.manage.bo.QuerySysRemoteHostsBO;
import com.hp.manage.dao.SysDeviceAreaDao;
import com.hp.manage.dao.SysRemoteChannelsDao;
import com.hp.manage.dao.SysRemoteHostsDao;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemoteHostsDO;
import com.hp.manage.service.SysRemoteHostsService;

@Service("sysRemoteHostsService")
public class SysRemoteHostsServiceImpl implements SysRemoteHostsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysRemoteHostsDao sysRemoteHostsDao;

	@Autowired
	private SysRemoteChannelsDao sysRemoteChannelsDao;

	@Autowired
	private SysDeviceAreaDao sysDeviceAreaDao;

	@Override
	@Transactional
	public BaseResultDTO createSysRemoteHosts(SysRemoteHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysRemoteHostsBO query = new QuerySysRemoteHostsBO();
			query.setName(hosts.getName());
			if (CollectionUtils.isNotEmpty(sysRemoteHostsDao.selectSysRemoteHostsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("视频主机：" + hosts.getName() + "已存在！");
				return result;
			}

			int num = sysRemoteHostsDao.insertSysRemoteHosts(hosts);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加视频主机失败！");
			}

		} catch (Exception e) {
			logger.error("添加视频主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加视频主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysRemoteHosts(SysRemoteHostsDO hosts) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemoteHostsDao.updateSysRemoteHosts(hosts);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改视频主机失败！");
			}
		} catch (Exception e) {
			logger.error("修改视频主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改视频主机失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysRemoteHostsDO> querySysRemoteHostsById(String id) {
		ResultDTO<SysRemoteHostsDO> result = new ResultDTO<SysRemoteHostsDO>();
		try {
			SysRemoteHostsDO hosts = sysRemoteHostsDao.selectSysRemoteHostsById(id);
			if (null == hosts) {
				result.setSuccess(false);
				result.setErrorDetail("该视频主机不存在！");
				return result;
			}

			result.setModule(hosts);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频主机失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemoteHostsDO> querySysRemoteHostsList(QuerySysRemoteHostsBO query) {
		BatchResultDTO<SysRemoteHostsDO> result = new BatchResultDTO<SysRemoteHostsDO>();
		try {
			List<SysRemoteHostsDO> list = sysRemoteHostsDao.selectSysRemoteHostsList(query);
			if (CollectionUtils.isNotEmpty(list)) {
				for (SysRemoteHostsDO host : list) {
					QuerySysRemoteChannelsBO queryx = new QuerySysRemoteChannelsBO();
					queryx.setRemoteHostId(host.getId());
					List<SysRemoteChannelsDO> channels = sysRemoteChannelsDao.selectSysRemoteChannelsList(queryx);
					if (CollectionUtils.isNotEmpty(channels)) {
						for (SysRemoteChannelsDO channel : channels) {
							if (channel.getType() == 1) {
								channel.setTypeStr("视频");
							} else if (channel.getType() == 2) {
								channel.setTypeStr("红外");
							} else if (channel.getType() == 3) {
								channel.setTypeStr("道闸");
							}

							QuerySysDeviceAreaBO queryz = new QuerySysDeviceAreaBO();
							queryz.setSearchType("1");
							queryz.setAreaId(query.getAreaId());
							queryz.setDevId(channel.getId());
							List<SysDeviceAreaDO> devices = sysDeviceAreaDao.selectSysDeviceAreaList(queryz);
							if (CollectionUtils.isNotEmpty(devices)) {
								channel.setDisabled("Y");
							} else {
								channel.setDisabled("N");
							}
						}
						host.setRemoteChannels(channels);
					} else {
						host.setRemoteChannels(new ArrayList<SysRemoteChannelsDO>());
					}
				}
			}
			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频主机列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频主机列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemoteHostsDO> querySysRemoteHostsPage(QuerySysRemoteHostsBO query) {
		BatchResultDTO<SysRemoteHostsDO> result = new BatchResultDTO<SysRemoteHostsDO>();
		try {
			int record = sysRemoteHostsDao.selectSysRemoteHostsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysRemoteHostsDO> list = sysRemoteHostsDao.selectSysRemoteHostsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysRemoteHostsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频主机失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频主机失败！");
		}
		return result;
	}
}
