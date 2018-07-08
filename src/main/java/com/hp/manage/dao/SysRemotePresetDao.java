package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysRemotePresetBO;
import com.hp.manage.domain.SysRemotePresetDO;

@Repository
public interface SysRemotePresetDao {

	public int insertSysRemotePreset(SysRemotePresetDO preset);

	public int updateSysRemotePreset(SysRemotePresetDO preset);

	public SysRemotePresetDO selectSysRemotePresetById(String id);

	public List<SysRemotePresetDO> selectSysRemotePresetList(QuerySysRemotePresetBO query);

	public int selectSysRemotePresetCount(QuerySysRemotePresetBO query);

	public List<SysRemotePresetDO> selectSysRemotePresetPage(QuerySysRemotePresetBO query);

}
