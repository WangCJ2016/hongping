package com.hp.manage.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.domain.SysDeviceAreaDO;

@Repository
public interface SysDeviceAreaDao {

	public int insertSysDeviceArea(SysDeviceAreaDO deviceArea);

	public int updateSysDeviceArea(SysDeviceAreaDO deviceArea);

	public int batchUpdateSysDeviceArea(List<SysDeviceAreaDO> deviceAreas);

	public int deleteSysDeviceArea(Map<String, Object> params);

	public SysDeviceAreaDO selectSysDeviceAreaById(String id);

	public List<SysDeviceAreaDO> selectSysDeviceAreaList(QuerySysDeviceAreaBO query);

	public int selectSysDeviceAreaCount(QuerySysDeviceAreaBO query);

	public List<SysDeviceAreaDO> selectSysDeviceAreaPage(QuerySysDeviceAreaBO query);

}
