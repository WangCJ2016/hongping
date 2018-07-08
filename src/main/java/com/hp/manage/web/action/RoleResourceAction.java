package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.bo.Page;
import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.bo.QueryResourceBO;
import com.hp.manage.bo.QueryRoleAreaBO;
import com.hp.manage.bo.QueryRoleBO;
import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.domain.ResourceDO;
import com.hp.manage.domain.RoleAreaDO;
import com.hp.manage.domain.RoleDO;
import com.hp.manage.domain.RoleResourceDO;
import com.hp.manage.service.AccountService;
import com.hp.manage.service.AreasService;
import com.hp.manage.service.ResourceService;
import com.hp.manage.service.RoleAreaService;
import com.hp.manage.service.RoleResourceService;
import com.hp.manage.service.RoleService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("roleResourceAction")
public class RoleResourceAction extends BaseAction {

	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	RoleService roleService;

	@Autowired
	ResourceService resourceService;

	@Autowired
	RoleResourceService roleResourceService;

	@Autowired
	AreasService areasService;

	@Autowired
	RoleAreaService roleAreaService;

	@Autowired
	AccountService accountService;

	public void queryResources() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<ResourceDO> resources = resourceService.queryResourceList(new QueryResourceBO()).getModule();
			if (CollectionUtils.isNotEmpty(resources)) {
				result.setDataObject(resources);
			} else {
				result.setDataObject(new ArrayList<RoleDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->queryResources:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAreas() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			QueryAreasBO query = new QueryAreasBO();

			String parentId = getParameter("parentId", "");
			if (StringUtils.isNotBlank(parentId)) {
				query.setParentId(parentId);
			} else {
				query.setLevel(1);
			}
			List<AreasDO> areas = areasService.queryAreasList(query).getModule();
			if (CollectionUtils.isNotEmpty(areas)) {
				result.setDataObject(areas);
			} else {
				result.setDataObject(new ArrayList<AreasDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->queryAreas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getRoleInfo() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String id = getParameter("id", "");

			RoleDO role = roleService.queryRoleById(id).getModule();
			if (null != role) {
				QueryRoleResourceBO query = new QueryRoleResourceBO();
				query.setRoleId(id);
				List<RoleResourceDO> roleResources = roleResourceService.queryRoleResourceList(query).getModule();
				if (CollectionUtils.isNotEmpty(roleResources)) {
					role.setRoleResources(roleResources);
				}

				QueryRoleAreaBO queryx = new QueryRoleAreaBO();
				queryx.setRoleId(id);
				List<RoleAreaDO> roleAreas = roleAreaService.queryRoleAreaList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(roleAreas)) {
					role.setRoleAreas(roleAreas);
				}

				result.setDataObject(role);
			} else {
				result.setSuccess(false);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("RoleResourceAction-->getRoleInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createRole() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			String roleName = getParameter("roleName", "");
			if (StringUtils.isNotBlank(roleName)) {
				roleName = URLDecoder.decode(roleName, "UTF-8");
			}

			RoleDO role = new RoleDO();
			role.setId(TokenUtil.getInstance().generateID());
			role.setCreateUserId(accountId);
			role.setRoleName(roleName);
			role.setStatus(0);

			BaseResultDTO resultx = roleService.createRole(role);

			if (!resultx.isSuccess()) {
				result.setMsg(resultx.getErrorDetail());
				result.setSuccess(false);
			}
			result.setDataObject(role);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("RoleResourceAction-->createRole:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyRole() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			String id = getParameter("id", "");

			Integer isDelete = getParameter("isDelete", 0);

			String roleName = getParameter("roleName", "");
			if (StringUtils.isNotBlank(roleName)) {
				roleName = URLDecoder.decode(roleName, "UTF-8");
			}
			String resourceIds = getParameter("resourceIds", "");
			String areaIds = getParameter("areaIds", "");

			RoleDO role = roleService.queryRoleById(id).getModule();
			role.setModifyUserId(accountId);
			if (isDelete > 0) {
				role.setIsDelete(isDelete);
			} else if (StringUtils.isNotBlank(roleName)) {
				if (!role.getRoleName().equals(roleName)) {
					QueryRoleBO query = new QueryRoleBO();
					query.setRoleName(roleName);
					if (CollectionUtils.isNotEmpty(roleService.queryRoleList(query).getModule())) {
						result.setSuccess(false);
						result.setMsg("该角色已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}
				role.setRoleName(roleName);
			} else if (StringUtils.isNotBlank(resourceIds)) {
				role.setResourceIds(resourceIds);
				roleResourceService.deleteRoleResource(id);
			} else if (StringUtils.isNotBlank(areaIds)) {
				role.setAreaIds(areaIds);
				roleAreaService.deleteRoleArea(id);
			}

			BaseResultDTO resultx = roleService.modifyRole(role);

			if (!resultx.isSuccess()) {
				result.setSuccess(false);
			}
			result.setDataObject(role);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("RoleResourceAction-->modifyRole:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryRolePage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<RoleDO> page = new Page<RoleDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);
			String roleName = getParameter("roleName", "");

			QueryRoleBO query = new QueryRoleBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(roleName)) {
				roleName = URLDecoder.decode(roleName, "UTF-8");
				query.setRoleName(roleName);
			}

			BatchResultDTO<RoleDO> result = roleService.queryRolePage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("RoleResourceAction-->queryRolePage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void queryAccountPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<AccountDO> page = new Page<AccountDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			String roleId = getParameter("roleId", "");
			if (StringUtils.isBlank(roleId)) {
				page.setSuccess(false);
				page.setMsg("请传入角色ID！");
				responseJsonp(page);
				return;
			}

			QueryAccountBO query = new QueryAccountBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			query.setRoleId(roleId);

			BatchResultDTO<AccountDO> result = accountService.queryAccounts(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("RoleResourceAction-->queryAccountPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}
}
