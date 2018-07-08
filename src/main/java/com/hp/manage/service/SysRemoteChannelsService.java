package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysRemoteChannelsBO;
import com.hp.manage.domain.SysRemoteChannelsDO;

public interface SysRemoteChannelsService {

	public BaseResultDTO createSysRemoteChannels(SysRemoteChannelsDO channels);

	public BaseResultDTO modifySysRemoteChannels(SysRemoteChannelsDO channels);

	public ResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsById(String id);

	public BatchResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsList(QuerySysRemoteChannelsBO query);

	public BatchResultDTO<SysRemoteChannelsDO> querySysRemoteChannelsPage(QuerySysRemoteChannelsBO query);
}
