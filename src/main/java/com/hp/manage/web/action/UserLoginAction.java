package com.hp.manage.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.Base64Utils;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.bo.QueryResourceBO;
import com.hp.manage.bo.QueryRoleResourceBO;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.domain.ResourceDO;
import com.hp.manage.domain.RoleResourceDO;
import com.hp.manage.service.AccountService;
import com.hp.manage.service.ResourceService;
import com.hp.manage.service.RoleResourceService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("userLoginAction")
public class UserLoginAction extends BaseAction {

	private static final long serialVersionUID = -4778449188176430855L;

	private Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private AccountService accountService;

	@Autowired
	private ResourceService resourceService;

	@Autowired
	private RoleResourceService roleResourceService;

	public void login() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			String username = getParameter("username", "");
			String password = getParameter("password", "");
			if (StringUtils.isBlank(username)) {
				result.setSuccess(false);
				result.setMsg("请传入用户名！");
				responseJsonp(result);
				return;
			}
			if (StringUtils.isBlank(password)) {
				result.setSuccess(false);
				result.setMsg("请传入密码！");
				responseJsonp(result);
				return;
			}

			AccountDO account = new AccountDO();

			QueryAccountBO query = new QueryAccountBO();

			query.setAccountNo(username);
			query.setPassword(password);

			BatchResultDTO<AccountDO> resultx = accountService.queryAccountList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				result.setMsg("系统忙，请稍后再试！");
				responseJsonp(result);
				return;
			}

			if (CollectionUtils.isEmpty(resultx.getModule())) {
				result.setSuccess(false);
				result.setMsg("用户名和密码不匹配！");
				responseJsonp(result);
				return;
			}
			account = resultx.getModule().get(0);
			account.setToken(TokenUtil.getInstance().generateID());
			accountService.modifyAccount(account);
			account.setAccountNo(null);
			account.setPassword(null);
			account.setToken(Base64Utils.encodeToken(account.getToken()));

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("account", account);
			if (account.getType() == 0) {
				BatchResultDTO<ResourceDO> resultR = resourceService.queryResourceList(new QueryResourceBO());
				if (resultR.isSuccess()) {
					if (CollectionUtils.isNotEmpty(resultR.getModule())) {
						map.put("resources", resultR);
					}
				}
			} else if (account.getType() == 1) {
				QueryRoleResourceBO queryResource = new QueryRoleResourceBO();
				queryResource.setRoleId(account.getRoleId());

				List<ResourceDO> resourcesx = new ArrayList<ResourceDO>();

				BatchResultDTO<RoleResourceDO> resultR = roleResourceService.queryRoleResourceList(queryResource);
				if (resultR.isSuccess()) {
					for (RoleResourceDO roleResource : resultR.getModule()) {
						ResourceDO resource = resourceService.queryResourceById(roleResource.getResourceId())
								.getModule();
						if (null != resource) {
							resourcesx.add(resource);
						}
					}

					BatchResultDTO<ResourceDO> resources = new BatchResultDTO<ResourceDO>();
					resources.setModule(resourcesx);
					map.put("resources", resources);
				} else {
					map.put("resources", new BatchResultDTO<ResourceDO>());
				}
			}
			result.setSuccess(true);
			result.setDataObject(map);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMsg("登录异常，请稍后重试！");
			log.error("login error:", e);
			responseJsonp(result);
		}

		responseJsonp(result);
	}

	public boolean isMobileNO(String mobiles) {
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
	}

	public void logout() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			String id = getParameter("id", "");
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入用户ID！");
				responseJsonp(result);
				return;
			}

			AccountDO account = accountService.queryAccountById(id).getModule();
			if (null != account) {
				account.setToken("");
				accountService.modifyAccount(account);
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
			}
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMsg("登出异常，请稍后重试！");
			log.error("login error:", e);
			responseJsonp(result);
		}
		responseJsonp(result);
	}

	public void getAccountInfo() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			String token = getParameter("token", "");
			if (StringUtils.isBlank(token)) {
				result.setSuccess(false);
				result.setMsg("非法请求");
				responseJsonp(result);
				return;
			}

			QueryAccountBO query = new QueryAccountBO();
			query.setToken(Base64Utils.decodeToken(token));

			List<AccountDO> accounts = accountService.queryAccountList(query).getModule();
			if (CollectionUtils.isEmpty(accounts)) {
				result.setSuccess(false);
				result.setMsg("账号不存在");
				responseJsonp(result);
				return;
			}
			AccountDO account = accounts.get(0);
			account.setToken(token);

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("account", account);
			if (account.getType() == 0) {
				BatchResultDTO<ResourceDO> resultR = resourceService.queryResourceList(new QueryResourceBO());
				if (resultR.isSuccess()) {
					if (CollectionUtils.isNotEmpty(resultR.getModule())) {
						map.put("resources", resultR);
					}
				}
			} else if (account.getType() == 1) {
				QueryRoleResourceBO queryResource = new QueryRoleResourceBO();
				queryResource.setRoleId(account.getRoleId());

				List<ResourceDO> resourcesx = new ArrayList<ResourceDO>();

				BatchResultDTO<RoleResourceDO> resultR = roleResourceService.queryRoleResourceList(queryResource);
				if (resultR.isSuccess()) {
					for (RoleResourceDO roleResource : resultR.getModule()) {
						ResourceDO resource = resourceService.queryResourceById(roleResource.getResourceId())
								.getModule();
						if (null != resource) {
							resourcesx.add(resource);
						}
					}

					BatchResultDTO<ResourceDO> resources = new BatchResultDTO<ResourceDO>();
					resources.setModule(resourcesx);
					map.put("resources", resources);
				} else {
					map.put("resources", new BatchResultDTO<ResourceDO>());
				}
			}
			result.setDataObject(map);
			responseJsonp(result);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setMsg("系统忙，请稍后重试！");
			log.error("login error:", e);
			responseJsonp(result);
		}
	}
}
