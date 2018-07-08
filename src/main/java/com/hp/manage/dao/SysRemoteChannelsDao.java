package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysRemoteChannelsBO;
import com.hp.manage.domain.SysRemoteChannelsDO;

@Repository
public interface SysRemoteChannelsDao {

	public int insertSysRemoteChannels(SysRemoteChannelsDO channels);

	public int updateSysRemoteChannels(SysRemoteChannelsDO channels);

	public SysRemoteChannelsDO selectSysRemoteChannelsById(String id);

	public List<SysRemoteChannelsDO> selectSysRemoteChannelsList(QuerySysRemoteChannelsBO query);

	public int selectSysRemoteChannelsCount(QuerySysRemoteChannelsBO query);

	public List<SysRemoteChannelsDO> selectSysRemoteChannelsPage(QuerySysRemoteChannelsBO query);

}
