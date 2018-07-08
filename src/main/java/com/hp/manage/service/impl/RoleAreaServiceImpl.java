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
import com.hp.manage.bo.QueryRoleAreaBO;
import com.hp.manage.dao.RoleAreaDao;
import com.hp.manage.domain.RoleAreaDO;
import com.hp.manage.service.RoleAreaService;

@Service("roleAreaService")
public class RoleAreaServiceImpl implements RoleAreaService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RoleAreaDao roleAreaDao;

	@Override
	@Transactional
	public BaseResultDTO createRoleArea(RoleAreaDO roleArea) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleAreaDao.insertRoleArea(roleArea);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加角色区域失败！");
			}

		} catch (Exception e) {
			logger.error("添加角色区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加角色区域失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyRoleArea(RoleAreaDO roleArea) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleAreaDao.updateRoleArea(roleArea);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改角色区域失败！");
			}
		} catch (Exception e) {
			logger.error("修改角色区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改角色区域失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<RoleAreaDO> queryRoleAreaById(String id) {
		ResultDTO<RoleAreaDO> result = new ResultDTO<RoleAreaDO>();
		try {
			RoleAreaDO roleArea = roleAreaDao.selectRoleAreaById(id);
			if (null == roleArea) {
				result.setSuccess(false);
				result.setErrorDetail("该角色区域不存在！");
				return result;
			}

			result.setModule(roleArea);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色区域失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleAreaDO> queryRoleAreaList(QueryRoleAreaBO query) {
		BatchResultDTO<RoleAreaDO> result = new BatchResultDTO<RoleAreaDO>();
		try {
			List<RoleAreaDO> list = roleAreaDao.selectRoleAreaList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色区域列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色区域列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleAreaDO> queryRoleAreaPage(QueryRoleAreaBO query) {
		BatchResultDTO<RoleAreaDO> result = new BatchResultDTO<RoleAreaDO>();
		try {
			int record = roleAreaDao.selectRoleAreaCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<RoleAreaDO> list = roleAreaDao.selectRoleAreaPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<RoleAreaDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色区域失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色区域失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteRoleArea(String roleId) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleAreaDao.deleteRoleArea(roleId);

			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除角色区域失败");
			}
		} catch (Exception e) {
			logger.error("删除角色区域失败", e);
			result.setSuccess(false);
			result.setErrorDetail("删除角色区域失败");
		}
		return result;
	}
}
