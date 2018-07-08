package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.dao.RoleResourceDao;
import com.hp.manage.domain.RoleResourceDO;
import com.hp.manage.service.RoleResourceService;

@Service("roleResourceService")
public class RoleResourceServiceImpl implements RoleResourceService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RoleResourceDao roleResourceDao;

	@Override
	@Transactional
	public BaseResultDTO createRoleResource(RoleResourceDO roleResource) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleResourceDao.insertRoleResource(roleResource);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加角色菜单资源失败！");
			}

		} catch (Exception e) {
			logger.error("添加角色菜单资源失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加角色菜单资源失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyRoleResource(RoleResourceDO roleResource) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleResourceDao.updateRoleResource(roleResource);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改角色菜单资源失败！");
			}
		} catch (Exception e) {
			logger.error("修改角色菜单资源失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改角色菜单资源失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<RoleResourceDO> queryRoleResourceById(String id) {
		ResultDTO<RoleResourceDO> result = new ResultDTO<RoleResourceDO>();
		try {
			RoleResourceDO roleResource = roleResourceDao.selectRoleResourceById(id);
			if (null == roleResource) {
				result.setSuccess(false);
				result.setErrorDetail("该角色菜单资源不存在！");
				return result;
			}

			result.setModule(roleResource);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色菜单资源失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色菜单资源失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleResourceDO> queryRoleResourceList(QueryRoleResourceBO query) {
		BatchResultDTO<RoleResourceDO> result = new BatchResultDTO<RoleResourceDO>();
		try {
			List<RoleResourceDO> list = roleResourceDao.selectRoleResourceList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色菜单资源列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色菜单资源列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleResourceDO> queryRoleResourcePage(QueryRoleResourceBO query) {
		BatchResultDTO<RoleResourceDO> result = new BatchResultDTO<RoleResourceDO>();
		try {
			int record = roleResourceDao.selectRoleResourceCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<RoleResourceDO> list = roleResourceDao.selectRoleResourcePage(query);

				result.setModule(list);
			} else {
				result.setModule(Collections.<RoleResourceDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色菜单资源失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色菜单资源失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteRoleResource(String roleId) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleResourceDao.deleteRoleResource(roleId);

			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除角色菜单资源失败");
			}
		} catch (Exception e) {
			logger.error("删除角色菜单资源失败", e);
			result.setSuccess(false);
			result.setErrorDetail("删除角色菜单资源失败");
		}
		return result;
	}
}
