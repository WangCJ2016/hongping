package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysCommDevicesBO;
import com.hp.manage.domain.SysCommDevicesDO;

public interface SysCommDevicesService {

	public BaseResultDTO createSysCommDevices(SysCommDevicesDO devices);

	public BaseResultDTO modifySysCommDevices(SysCommDevicesDO devices);

	public ResultDTO<SysCommDevicesDO> querySysCommDevicesById(String id);

	public BatchResultDTO<SysCommDevicesDO> querySysCommDevicesList(QuerySysCommDevicesBO query);

	public BatchResultDTO<SysCommDevicesDO> querySysCommDevicesPage(QuerySysCommDevicesBO query);
}
