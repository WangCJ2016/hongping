package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysBroadcastChannelsBO;
import com.hp.manage.domain.SysBroadcastChannelsDO;

@Repository
public interface SysBroadcastChannelsDao {

	public int insertSysBroadcastChannels(SysBroadcastChannelsDO channels);

	public int updateSysBroadcastChannels(SysBroadcastChannelsDO channels);

	public SysBroadcastChannelsDO selectSysBroadcastChannelsById(String id);

	public List<SysBroadcastChannelsDO> selectSysBroadcastChannelsList(QuerySysBroadcastChannelsBO query);

	public int selectSysBroadcastChannelsCount(QuerySysBroadcastChannelsBO query);

	public List<SysBroadcastChannelsDO> selectSysBroadcastChannelsPage(QuerySysBroadcastChannelsBO query);

}
