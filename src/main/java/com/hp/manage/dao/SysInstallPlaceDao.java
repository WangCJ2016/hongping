package com.hp.manage.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.domain.SysInstallPlaceDO;

@Repository
public interface SysInstallPlaceDao {

	public int insertSysInstallPlace(SysInstallPlaceDO installPlace);

	public int batchInsertSysIntPlace(List<SysInstallPlaceDO> places);

	public int updateSysInstallPlace(SysInstallPlaceDO installPlace);

	public int deleteSysInstallPlacex(String areaId);

	public int batchUpdateSysIntPlace(List<SysInstallPlaceDO> places);

	public int deleteSysInstallPlace(Map<String, Object> params);

	public SysInstallPlaceDO selectSysInstallPlaceById(String id);

	public List<SysInstallPlaceDO> selectSysInstallPlaceList(QuerySysInstallPlaceBO query);

	public int selectSysInstallPlaceCount(QuerySysInstallPlaceBO query);

	public List<SysInstallPlaceDO> selectSysInstallPlacePage(QuerySysInstallPlaceBO query);

}
