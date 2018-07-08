package com.hp.manage.service;

import java.util.List;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.domain.SysInstallPlaceDO;

public interface SysInstallPlaceService {

	public BaseResultDTO createSysInstallPlace(SysInstallPlaceDO installPlace);

	public BaseResultDTO batchCreateSysIntPlace(List<SysInstallPlaceDO> places);

	public BaseResultDTO deleteSysIntPlace(String areaId);

	public BaseResultDTO modifySysInstallPlace(SysInstallPlaceDO installPlace);

	public BaseResultDTO batchModifySysIntPlace(List<SysInstallPlaceDO> places);

	public ResultDTO<SysInstallPlaceDO> querySysInstallPlaceById(String id);

	public BatchResultDTO<SysInstallPlaceDO> querySysInstallPlaceList(QuerySysInstallPlaceBO query);

	public BatchResultDTO<SysInstallPlaceDO> querySysInstallPlacePage(QuerySysInstallPlaceBO query);
}
