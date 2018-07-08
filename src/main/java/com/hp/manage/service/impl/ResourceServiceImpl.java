package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryResourceBO;
import com.hp.manage.dao.ResourceDao;
import com.hp.manage.domain.ResourceDO;
import com.hp.manage.domain.RoleResourceDO;
import com.hp.manage.service.ResourceService;

@Service("resourceService")
public class ResourceServiceImpl implements ResourceService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private ResourceDao resourceDao;

	@Override
	public BaseResultDTO createResource(ResourceDO resourceDO) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = resourceDao.insertResource(resourceDO);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加菜单资源失败");
			}
		} catch (Exception e) {
			logger.error("添加菜单资源失败", e);
			result.setSuccess(false);
			result.setErrorDetail("添加菜单资源失败");
		}
		return result;
	}

	@Override
	public BaseResultDTO modifyResource(ResourceDO resourceDO) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = resourceDao.updateResource(resourceDO);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改菜单资源失败");
			}
		} catch (Exception e) {
			logger.error("修改菜单资源失败", e);
			result.setSuccess(false);
			result.setErrorDetail("修改菜单资源失败");
		}
		return result;
	}

	@Override
	public ResultDTO<ResourceDO> queryResourceById(String id) {
		ResultDTO<ResourceDO> result = new ResultDTO<ResourceDO>();
		try {
			ResourceDO resourceDO = resourceDao.selectResourceById(id);
			if (null == resourceDO) {
				result.setSuccess(false);
				result.setErrorDetail("该菜单资源不存在！");
				return result;
			}

			result.setModule(resourceDO);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询菜单资源失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询菜单资源失败");
		}
		return result;
	}

	@Override
	public BatchResultDTO<ResourceDO> queryResourceList(QueryResourceBO query) {
		BatchResultDTO<ResourceDO> result = new BatchResultDTO<ResourceDO>();
		try {
			List<ResourceDO> list = resourceDao.selectResourceList(query);

			if (CollectionUtils.isNotEmpty(list)) {
				Integer index = 0;
				for (ResourceDO resource : list) {
					if (CollectionUtils.isNotEmpty(query.getRoleReources())) {
						for (RoleResourceDO roleResource : query.getRoleReources()) {
							if (roleResource.getResourceId().equals(resource.getId())) {
								resource.setChecked("checked");
							}
						}
					}
					index++;
					resource.setIndex(String.valueOf(index));
					QueryResourceBO queryx = new QueryResourceBO();
					queryx.setParentId(resource.getId());
					List<ResourceDO> childList = resourceDao.selectResourceList(queryx);
					Integer indexx = 0;
					if (CollectionUtils.isNotEmpty(childList)) {
						for (ResourceDO resourcex : childList) {
							if (CollectionUtils.isNotEmpty(query.getRoleReources())) {
								for (RoleResourceDO roleResource : query.getRoleReources()) {
									if (roleResource.getResourceId().equals(resourcex.getId())) {
										resourcex.setChecked("checked");
									}
								}
							}
							indexx++;
							resourcex.setIndex(String.valueOf(index) + "_" + String.valueOf(indexx));
						}

						resource.setChildResources(childList);
					}
				}
			}
			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询菜单资源列表失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询菜单资源列表失败");
		}
		return result;
	}

	@Override
	public BatchResultDTO<ResourceDO> queryResourcePage(QueryResourceBO query) {
		BatchResultDTO<ResourceDO> result = new BatchResultDTO<ResourceDO>();
		try {
			int record = resourceDao.selectResourceCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<ResourceDO> list = resourceDao.selectResourcePage(query);

				result.setModule(list);
			} else {
				result.setModule(Collections.<ResourceDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询菜单资源失败", e);
			result.setSuccess(false);
			result.setErrorDetail("查询菜单资源失败");
		}
		return result;
	}
}
