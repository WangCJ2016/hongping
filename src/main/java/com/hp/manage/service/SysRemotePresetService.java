package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysRemotePresetBO;
import com.hp.manage.domain.SysRemotePresetDO;

public interface SysRemotePresetService {

	public BaseResultDTO createSysRemotePreset(SysRemotePresetDO preset);

	public BaseResultDTO modifySysRemotePreset(SysRemotePresetDO preset);

	public ResultDTO<SysRemotePresetDO> querySysRemotePresetById(String id);

	public BatchResultDTO<SysRemotePresetDO> querySysRemotePresetList(QuerySysRemotePresetBO query);

	public BatchResultDTO<SysRemotePresetDO> querySysRemotePresetPage(QuerySysRemotePresetBO query);
}
