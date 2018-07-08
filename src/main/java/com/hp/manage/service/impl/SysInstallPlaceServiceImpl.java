package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.dao.SysInstallPlaceDao;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.service.SysInstallPlaceService;

@Service("sysInstallPlaceService")
public class SysInstallPlaceServiceImpl implements SysInstallPlaceService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysInstallPlaceDao sysInstallPlaceDao;

	@Override
	@Transactional
	public BaseResultDTO createSysInstallPlace(SysInstallPlaceDO place) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysInstallPlaceDao.insertSysInstallPlace(place);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加设备摆放失败！");
			}

		} catch (Exception e) {
			logger.error("添加设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加设备摆放失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysInstallPlace(SysInstallPlaceDO place) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysInstallPlaceDao.updateSysInstallPlace(place);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改设备摆放失败！");
			}
		} catch (Exception e) {
			logger.error("修改设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改设备摆放失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysInstallPlaceDO> querySysInstallPlaceById(String id) {
		ResultDTO<SysInstallPlaceDO> result = new ResultDTO<SysInstallPlaceDO>();
		try {
			SysInstallPlaceDO place = sysInstallPlaceDao.selectSysInstallPlaceById(id);
			if (null == place) {
				result.setSuccess(false);
				result.setErrorDetail("该设备摆放不存在！");
				return result;
			}

			result.setModule(place);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备摆放失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysInstallPlaceDO> querySysInstallPlaceList(QuerySysInstallPlaceBO query) {
		BatchResultDTO<SysInstallPlaceDO> result = new BatchResultDTO<SysInstallPlaceDO>();
		try {
			List<SysInstallPlaceDO> list = sysInstallPlaceDao.selectSysInstallPlaceList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备摆放列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备摆放列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysInstallPlaceDO> querySysInstallPlacePage(QuerySysInstallPlaceBO query) {
		BatchResultDTO<SysInstallPlaceDO> result = new BatchResultDTO<SysInstallPlaceDO>();
		try {
			int record = sysInstallPlaceDao.selectSysInstallPlaceCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysInstallPlaceDO> list = sysInstallPlaceDao.selectSysInstallPlacePage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysInstallPlaceDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询设备摆放失败！");
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO batchCreateSysIntPlace(List<SysInstallPlaceDO> places) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysInstallPlaceDao.batchInsertSysIntPlace(places);
			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("批量添加设备摆放失败！");
			}

		} catch (Exception e) {
			logger.error("批量添加设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("批量添加设备摆放失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO batchModifySysIntPlace(List<SysInstallPlaceDO> places) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysInstallPlaceDao.batchUpdateSysIntPlace(places);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("批量修改设备摆放失败！");
			}
		} catch (Exception e) {
			logger.error("批量修改设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("批量修改设备摆放失败！");
			throw e;
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteSysIntPlace(String areaId) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysInstallPlaceDao.deleteSysInstallPlacex(areaId);
			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除设备摆放失败！");
			}
		} catch (Exception e) {
			logger.error("删除设备摆放失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删除设备摆放失败！");
			throw e;
		}
		return result;
	}
}
