package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysBroadcastChannelsBO;
import com.hp.manage.domain.SysBroadcastChannelsDO;

public interface SysBroadcastChannelsService {

	public BaseResultDTO createSysBroadcastChannels(SysBroadcastChannelsDO channels);

	public BaseResultDTO modifySysBroadcastChannels(SysBroadcastChannelsDO channels);

	public ResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsById(String id);

	public BatchResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsList(QuerySysBroadcastChannelsBO query);

	public BatchResultDTO<SysBroadcastChannelsDO> querySysBroadcastChannelsPage(QuerySysBroadcastChannelsBO query);
}
