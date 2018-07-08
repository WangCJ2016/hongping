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
import com.hp.manage.bo.QuerySysRemoteChannelsBO;
import com.hp.manage.dao.SysRemoteChannelsDao;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.service.SysRemoteChannelsService;

@Service("sysRemoteChannelsService")
public class SysRemoteChannelsServiceImpl implements SysRemoteChannelsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysRemoteChannelsDao sysRemoteChannelsDao;

	@Override
	@Transactional
	public BaseResultDTO createSysRemoteChannels(SysRemoteChannelsDO channels) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysRemoteChannelsBO query = new QuerySysRemoteChannelsBO();
			query.setName(channels.getName());

			if (CollectionUtils.isNotEmpty(sysRemoteChannelsDao.selectSysRemoteChannelsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("视频通道：" + channels.getName() + "已存在！");
				return result;
			}

			int num = sysRemoteChannelsDao.insertSysRemoteChannels(channels);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加视频通道失败！");
			}

		} catch (Exception e) {
			logger.error("添加视频通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加视频通道失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysRemoteChannels(SysRemoteChannelsDO channels) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemoteChannelsDao.updateSysRemoteChannels(channels);

			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改视频通道失败！");
			}
		} catch (Exception e) {
			logger.error("修改视频通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改视频通道失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsById(String id) {
		ResultDTO<SysRemoteChannelsDO> result = new ResultDTO<SysRemoteChannelsDO>();
		try {
			SysRemoteChannelsDO channels = sysRemoteChannelsDao.selectSysRemoteChannelsById(id);
			if (null == channels) {
				result.setSuccess(false);
				result.setErrorDetail("该视频通道不存在！");
				return result;
			}

			result.setModule(channels);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频通道失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsList(QuerySysRemoteChannelsBO query) {
		BatchResultDTO<SysRemoteChannelsDO> result = new BatchResultDTO<SysRemoteChannelsDO>();
		try {
			List<SysRemoteChannelsDO> list = sysRemoteChannelsDao.selectSysRemoteChannelsList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频通道列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频通道列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsPage(QuerySysRemoteChannelsBO query) {
		BatchResultDTO<SysRemoteChannelsDO> result = new BatchResultDTO<SysRemoteChannelsDO>();
		try {
			int record = sysRemoteChannelsDao.selectSysRemoteChannelsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysRemoteChannelsDO> list = sysRemoteChannelsDao.selectSysRemoteChannelsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysRemoteChannelsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询视频通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询视频通道失败！");
		}
		return result;
	}
}
