package com.hp.manage.service;

import java.util.List;
import java.util.Map;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.domain.SysDeviceAreaDO;

public interface SysDeviceAreaService {

	public BaseResultDTO createSysDeviceArea(SysDeviceAreaDO deviceArea);

	public BaseResultDTO modifySysDeviceArea(SysDeviceAreaDO deviceArea);

	public BaseResultDTO batchModifySysDeviceArea(List<SysDeviceAreaDO> deviceAreas);

	public BaseResultDTO deleteSysDeviceArea(Map<String, Object> params);

	public ResultDTO<SysDeviceAreaDO> querySysDeviceAreaById(String id);

	public BatchResultDTO<SysDeviceAreaDO> querySysDeviceAreaList(QuerySysDeviceAreaBO query);

	public BatchResultDTO<SysDeviceAreaDO> querySysDeviceAreaPage(QuerySysDeviceAreaBO query);
}
