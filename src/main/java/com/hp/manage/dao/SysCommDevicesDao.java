package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysCommDevicesBO;
import com.hp.manage.domain.SysCommDevicesDO;

@Repository
public interface SysCommDevicesDao {

	public int insertSysCommDevices(SysCommDevicesDO devices);

	public int updateSysCommDevices(SysCommDevicesDO devices);

	public SysCommDevicesDO selectSysCommDevicesById(String id);

	public List<SysCommDevicesDO> selectSysCommDevicesList(QuerySysCommDevicesBO query);

	public int selectSysCommDevicesCount(QuerySysCommDevicesBO query);

	public List<SysCommDevicesDO> selectSysCommDevicesPage(QuerySysCommDevicesBO query);

}
