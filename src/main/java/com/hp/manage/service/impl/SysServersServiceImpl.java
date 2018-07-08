package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.dao.SysServersDao;
import com.hp.manage.domain.SysServersDO;
import com.hp.manage.service.SysServersService;

@Service("sysServersService")
public class SysServersServiceImpl implements SysServersService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysServersDao sysServersDao;

	@Override
	@Transactional
	public BaseResultDTO createSysServers(SysServersDO servers) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysServersBO query = new QuerySysServersBO();
			query.setName(servers.getName());
			List<SysServersDO> serversx = sysServersDao.selectSysServersList(query);
			if (CollectionUtils.isNotEmpty(serversx)) {
				result.setSuccess(false);
				result.setErrorDetail("服务器：" + servers.getName() + "已存在");
				return result;
			}

			if (StringUtils.isNotBlank(servers.getInnerIp())) {
				query = new QuerySysServersBO();
				query.setInnerIp(servers.getInnerIp());
				query.setPort(servers.getPort());
				serversx = sysServersDao.selectSysServersList(query);
				if (CollectionUtils.isNotEmpty(serversx)) {
					result.setSuccess(false);
					result.setErrorDetail("服务器内网IP：" + servers.getInnerIp() + "，端口：" + servers.getPort() + "已存在");
					return result;
				}
			}
			if (StringUtils.isNotBlank(servers.getOuterIp())) {
				query = new QuerySysServersBO();
				query.setOuterIp(servers.getOuterIp());
				query.setPort(servers.getPort());
				serversx = sysServersDao.selectSysServersList(query);
				if (CollectionUtils.isNotEmpty(serversx)) {
					result.setSuccess(false);
					result.setErrorDetail("服务器外网IP：" + servers.getOuterIp() + "，端口：" + servers.getPort() + "已存在");
					return result;
				}
			}

			int num = sysServersDao.insertSysServers(servers);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加服务器失败！");
			}

		} catch (Exception e) {
			logger.error("添加服务器失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加服务器失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysServers(SysServersDO servers) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysServersDao.updateSysServers(servers);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改服务器失败！");
			}
		} catch (Exception e) {
			logger.error("修改服务器失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改服务器失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysServersDO> querySysServersById(String id) {
		ResultDTO<SysServersDO> result = new ResultDTO<SysServersDO>();
		try {
			SysServersDO servers = sysServersDao.selectSysServersById(id);
			if (null == servers) {
				result.setSuccess(false);
				result.setErrorDetail("该服务器不存在！");
				return result;
			}

			result.setModule(servers);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询服务器失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询服务器失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysServersDO> querySysServersList(QuerySysServersBO query) {
		BatchResultDTO<SysServersDO> result = new BatchResultDTO<SysServersDO>();
		try {
			List<SysServersDO> list = sysServersDao.selectSysServersList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询服务器列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询服务器列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysServersDO> querySysServersPage(QuerySysServersBO query) {
		BatchResultDTO<SysServersDO> result = new BatchResultDTO<SysServersDO>();
		try {
			int record = sysServersDao.selectSysServersCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysServersDO> list = sysServersDao.selectSysServersPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysServersDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询服务器失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询服务器失败！");
		}
		return result;
	}
}
