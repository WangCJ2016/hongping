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
import com.hp.commons.dto.ResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.bo.QueryRoleBO;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.domain.RoleDO;
import com.hp.manage.service.AccountService;
import com.hp.manage.service.RoleService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("accountAction")
public class AccountAction extends BaseAction {
	/** －－－－－－－－－－－－－－账号管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	AccountService accountService;

	@Autowired
	RoleService roleService;

	public void queryRoles() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<RoleDO> roles = roleService.queryRoleList(new QueryRoleBO()).getModule();
			if (CollectionUtils.isNotEmpty(roles)) {
				result.setDataObject(roles);
			} else {
				result.setDataObject(new ArrayList<RoleDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->queryRoles:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyPassword() {
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
			String oldPassword = getParameter("oldPassword", "");
			if (StringUtils.isBlank(oldPassword)) {
				result.setSuccess(false);
				result.setMsg("请输入原密码！");
				responseJsonp(result);
				return;
			}

			String newPassword = getParameter("newPassword", "");
			if (StringUtils.isBlank(newPassword)) {
				result.setSuccess(false);
				result.setMsg("请输入新密码！");
				responseJsonp(result);
				return;
			}

			ResultDTO<AccountDO> resultx = accountService.queryAccountById(id);
			if (resultx.isSuccess()) {
				AccountDO account = resultx.getModule();

				if (!account.getPassword().equals(oldPassword)) {
					result.setSuccess(false);
					result.setMsg("原密码不正确！");
					responseJsonp(result);
					return;
				}
				account.setPassword(newPassword);
				BaseResultDTO resultz = accountService.modifyAccount(account);
				if (resultz.isFailed()) {
					result.setSuccess(false);
				}
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->modifyPassword:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getAccountInfo() {
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
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入账号ID！");
				responseJsonp(result);
				return;
			}

			AccountDO account = accountService.queryAccountById(id).getModule();
			if (null != account) {
				result.setDataObject(account);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->getAccountInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createAccount() {
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
			if (StringUtils.isBlank(accountId)) {
				result.setSuccess(false);
				result.setMsg("请传入操作人员ID！");
				responseJsonp(result);
				return;
			}

			String account = getParameter("account", "");
			String name = getParameter("name", "");
			String telephone = getParameter("telephone", "");
			String password = getParameter("password", "");
			String roleId = getParameter("roleId", "");
			String department = getParameter("department", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(department)) {
				department = URLDecoder.decode(department, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			AccountDO accountx = new AccountDO();
			accountx.setId(TokenUtil.getInstance().generateID());
			accountx.setCreateUserId(accountId);
			accountx.setAccountNo(account);
			accountx.setName(name);
			accountx.setTelephone(telephone);
			accountx.setPassword(password);
			accountx.setDepartment(department);
			accountx.setRemark(remark);
			accountx.setType(1);

			accountx.setRoleId(roleId);
			accountx.setStatus(0);

			BaseResultDTO resultx = accountService.createAccount(accountx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(accountx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->createAccount:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyAccount() {
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
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入账号ID！");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			if (StringUtils.isBlank(accountId)) {
				result.setSuccess(false);
				result.setMsg("请传入操作人员ID！");
				responseJsonp(result);
				return;
			}

			String password = getParameter("password", "");
			Integer isDelete = getParameter("isDelete", 0);

			String account = getParameter("account", "");
			String name = getParameter("name", "");
			String telephone = getParameter("telephone", "");
			String roleId = getParameter("roleId", "");
			Integer status = getParameter("status", -1);
			String department = getParameter("department", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(department)) {
				department = URLDecoder.decode(department, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			AccountDO accountx = accountService.queryAccountById(id).getModule();
			accountx.setModifyUserId(accountId);
			if (isDelete > 0) {
				accountx.setIsDelete(isDelete);
			} else if (status > -1) {
				accountx.setStatus(status);
			} else {
				QueryAccountBO query = new QueryAccountBO();
				if (!accountx.getAccountNo().equals(account)) {
					query.setAccountNo(account);

					List<AccountDO> accounts = accountService.queryAccountList(query).getModule();
					if (CollectionUtils.isNotEmpty(accounts)) {
						result.setSuccess(false);
						result.setMsg("该账号已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}
				if (!accountx.getTelephone().equals(telephone)) {
					query = new QueryAccountBO();
					query.setTelephone(telephone);

					List<AccountDO> accounts = accountService.queryAccountList(query).getModule();
					if (CollectionUtils.isNotEmpty(accounts)) {
						result.setSuccess(false);
						result.setMsg("该手机号已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				accountx.setAccountNo(account);
				accountx.setName(name);
				accountx.setTelephone(telephone);
				accountx.setPassword(password);
				accountx.setDepartment(department);
				accountx.setRemark(remark);
				accountx.setRoleId(roleId);
			}

			BaseResultDTO resultx = accountService.modifyAccount(accountx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(accountx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AccountAction-->modifyAccount:", e);
			result.setSuccess(false);
			responseJsonp(result);
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

			String accountId = getParameter("accountId", "");

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			String account = getParameter("account", "");
			String telephone = getParameter("telephone", "");
			Integer status = getParameter("status", -1);

			QueryAccountBO query = new QueryAccountBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(account)) {
				query.setAccountNo(account);
			}
			if (StringUtils.isNotBlank(telephone)) {
				query.setTelephone(telephone);
			}
			if (status > -1) {
				query.setStatus(status);
			}

			query.setId(accountId);
			query.setType(1);
			BatchResultDTO<AccountDO> result = accountService.queryAccountPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("AccountAction-->queryAccountPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}
}
