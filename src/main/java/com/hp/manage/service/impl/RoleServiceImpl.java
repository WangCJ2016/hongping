package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryRoleAreaBO;
import com.hp.manage.bo.QueryRoleBO;
import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.dao.AreasDao;
import com.hp.manage.dao.ResourceDao;
import com.hp.manage.dao.RoleAreaDao;
import com.hp.manage.dao.RoleDao;
import com.hp.manage.dao.RoleResourceDao;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.domain.ResourceDO;
import com.hp.manage.domain.RoleAreaDO;
import com.hp.manage.domain.RoleDO;
import com.hp.manage.domain.RoleResourceDO;
import com.hp.manage.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private RoleResourceDao roleResourceDao;

	@Autowired
	private ResourceDao resourceDao;

	@Autowired
	private AreasDao areasDao;

	@Autowired
	private RoleAreaDao roleAreaDao;

	@Override
	public BaseResultDTO createRole(RoleDO role) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QueryRoleBO query = new QueryRoleBO();

			query.setRoleName(role.getRoleName());

			int count = roleDao.selectRoleCount(query);
			if (count > 0) {
				result.setSuccess(false);
				result.setErrorDetail("该角色已存在，请勿重复添加！");
				return result;
			}

			int num = roleDao.insertRole(role);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加角色失败");
			}
		} catch (Exception e) {
			logger.error("添加角色失败", e);
			result.setSuccess(false);
			result.setErrorDetail("添加角色失败");
		}
		return result;
	}

	@Override
	public BaseResultDTO modifyRole(RoleDO role) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = roleDao.updateRole(role);
			if (num == 1) {
				if (StringUtils.isNotBlank(role.getResourceIds())) {
					for (String resourceId : role.getResourceIds().split(",")) {
						if (StringUtils.isNoneBlank(resourceId)) {
							RoleResourceDO roleResource = new RoleResourceDO();
							roleResource.setId(TokenUtil.getInstance().generateID());
							roleResource.setRoleId(role.getId());
							roleResource.setResourceId(resourceId);
							roleResource.setCreateUserId(role.getCreateUserId());
							ResourceDO resource = resourceDao.selectResourceById(resourceId);
							if (null != resource) {
								roleResource.setResourceType(resource.getLevel());
							}
							roleResourceDao.insertRoleResource(roleResource);
						}
					}
				} else if (StringUtils.isNotBlank(role.getAreaIds())) {
					for (String areaId : role.getAreaIds().split(",")) {
						if (StringUtils.isNoneBlank(areaId)) {
							RoleAreaDO roleArea = new RoleAreaDO();
							roleArea.setId(TokenUtil.getInstance().generateID());
							roleArea.setRoleId(role.getId());
							roleArea.setAreaId(areaId);
							roleArea.setCreateUserId(role.getCreateUserId());
							AreasDO area = areasDao.selectAreasById(areaId);
							if (null != area) {
								roleArea.setLevel(area.getLevel());
							}
							roleAreaDao.insertRoleArea(roleArea);
						}
					}
				}
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改角色失败");
			}
		} catch (Exception e) {
			logger.error("修改角色失败", e);
			result.setSuccess(false);
			result.setErrorDetail("修改角色失败");
		}
		return result;
	}

	@Override
	public ResultDTO<RoleDO> queryRoleById(String id) {
		ResultDTO<RoleDO> result = new ResultDTO<RoleDO>();
		try {
			RoleDO role = roleDao.selectRoleById(id);
			if (null == role) {
				result.setSuccess(false);
				result.setErrorDetail("该角色不存在！");
				return result;
			}

			// QueryRoleResourceBO query = new QueryRoleResourceBO();
			// query.setRoleId(id);
			// List<RoleResourceDO> roleResources =
			// roleResourceDao.selectRoleResourceList(query);
			// if (CollectionUtils.isNotEmpty(roleResources)) {
			// role.setRoleResources(roleResources);
			// }
			//
			// QueryRoleAreaBO queryx = new QueryRoleAreaBO();
			// queryx.setRoleId(id);
			// List<RoleAreaDO> roleAreas =
			// roleAreaDao.selectRoleAreaList(queryx);
			// if (CollectionUtils.isNotEmpty(roleAreas)) {
			// role.setRoleAreas(roleAreas);
			// }

			result.setModule(role);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色失败");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleDO> queryRoleList(QueryRoleBO query) {
		BatchResultDTO<RoleDO> result = new BatchResultDTO<RoleDO>();
		try {
			List<RoleDO> list = roleDao.selectRoleList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色列表失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色列表失败");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RoleDO> queryRolePage(QueryRoleBO query) {
		BatchResultDTO<RoleDO> result = new BatchResultDTO<RoleDO>();
		try {
			int record = roleDao.selectRoleCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<RoleDO> list = roleDao.selectRolePage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<RoleDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询角色失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询角色失败");
		}
		return result;
	}
}
