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
import com.hp.manage.dao.SysBroadcastChannelsDao;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.service.SysBroadcastChannelsService;

@Service("sysBroadcastChannelsService")
public class SysBroadcastChannelsServiceImpl implements SysBroadcastChannelsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysBroadcastChannelsDao sysBroadcastChannelsDao;

	@Override
	@Transactional
	public BaseResultDTO createSysBroadcastChannels(SysBroadcastChannelsDO channels) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QuerySysBroadcastChannelsBO query = new QuerySysBroadcastChannelsBO();
			query.setName(channels.getName());
			query.setHostId(channels.getHostId());
			if (CollectionUtils.isNotEmpty(sysBroadcastChannelsDao.selectSysBroadcastChannelsList(query))) {
				result.setSuccess(false);
				result.setErrorDetail("广播通道：" + channels.getName() + "已存在！");
				return result;
			}

			int num = sysBroadcastChannelsDao.insertSysBroadcastChannels(channels);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加广播通道失败！");
			}

		} catch (Exception e) {
			logger.error("添加广播通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加广播通道失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysBroadcastChannels(SysBroadcastChannelsDO channels) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysBroadcastChannelsDao.updateSysBroadcastChannels(channels);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改广播通道失败！");
			}
		} catch (Exception e) {
			logger.error("修改广播通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改广播通道失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsById(String id) {
		ResultDTO<SysBroadcastChannelsDO> result = new ResultDTO<SysBroadcastChannelsDO>();
		try {
			SysBroadcastChannelsDO channels = sysBroadcastChannelsDao.selectSysBroadcastChannelsById(id);
			if (null == channels) {
				result.setSuccess(false);
				result.setErrorDetail("该广播通道不存在！");
				return result;
			}

			result.setModule(channels);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播通道失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsList(QuerySysBroadcastChannelsBO query) {
		BatchResultDTO<SysBroadcastChannelsDO> result = new BatchResultDTO<SysBroadcastChannelsDO>();
		try {
			List<SysBroadcastChannelsDO> list = sysBroadcastChannelsDao.selectSysBroadcastChannelsList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播通道列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播通道列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsPage(QuerySysBroadcastChannelsBO query) {
		BatchResultDTO<SysBroadcastChannelsDO> result = new BatchResultDTO<SysBroadcastChannelsDO>();
		try {
			int record = sysBroadcastChannelsDao.selectSysBroadcastChannelsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysBroadcastChannelsDO> list = sysBroadcastChannelsDao.selectSysBroadcastChannelsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysBroadcastChannelsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询广播通道失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询广播通道失败！");
		}
		return result;
	}
}
