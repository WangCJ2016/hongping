package com.hp.manage.web.action;

import java.net.URLDecoder;
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
import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.SysServersDO;
import com.hp.manage.service.SysServersService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysServersAction")
public class SysServersAction extends BaseAction {
	/** －－－－－－－－－－－－－－服务器管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysServersService sysServersService;

	public void getSysServersInfo() {
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
				result.setMsg("请传入服务器ID");
				responseJsonp(result);
				return;
			}

			SysServersDO sysServers = sysServersService.querySysServersById(id).getModule();
			if (null != sysServers) {
				result.setDataObject(sysServers);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysServersAction-->getSysServersInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysServers() {
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
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			if (StringUtils.isBlank(name)) {
				result.setSuccess(false);
				result.setMsg("请传入服务器名称");
				responseJsonp(result);
				return;
			}

			String innerIp = getParameter("innerIp", "");
			String outerIp = getParameter("outerIp", "");

			String port = getParameter("port", "");
			if (StringUtils.isBlank(port)) {
				result.setSuccess(false);
				result.setMsg("请传入端口");
				responseJsonp(result);
				return;
			}

			Integer maxConn = getParameter("maxConn", 0);
			if (maxConn <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入最大连结数");
				responseJsonp(result);
				return;
			}

			Integer type = getParameter("type", -1);
			if (type <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入类型");
				responseJsonp(result);
				return;
			}

			String timeout = getParameter("timeout", "");
			if (StringUtils.isBlank(timeout)) {
				result.setSuccess(false);
				result.setMsg("请传入超时时间");
				responseJsonp(result);
				return;
			}

			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			SysServersDO sysServersx = new SysServersDO();
			sysServersx.setId(TokenUtil.getInstance().generateID());
			sysServersx.setName(name);
			sysServersx.setInnerIp(innerIp);
			sysServersx.setOuterIp(outerIp);
			sysServersx.setPort(port);
			sysServersx.setMaxConn(maxConn);
			sysServersx.setType(type);
			sysServersx.setTimeout(timeout);
			sysServersx.setIcon(icon);
			sysServersx.setRemark(remark);
			sysServersx.setCreateUserId(accountId);

			BaseResultDTO resultx = sysServersService.createSysServers(sysServersx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(sysServersx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysServersAction-->createSysServers:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysServers() {
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
				result.setMsg("请传入服务器ID");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			if (StringUtils.isBlank(accountId)) {
				result.setSuccess(false);
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			String innerIp = getParameter("innerIp", "");
			String outerIp = getParameter("outerIp", "");
			String port = getParameter("port", "");
			Integer maxConn = getParameter("maxConn", 0);
			Integer type = getParameter("type", -1);
			String timeout = getParameter("timeout", "");
			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			Integer isDelete = getParameter("isDelete", -1);

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			SysServersDO sysServersx = sysServersService.querySysServersById(id).getModule();
			sysServersx.setModifyUserId(accountId);
			if (isDelete > 0) {
				sysServersx.setIsDelete(isDelete);
			} else {
				QuerySysServersBO query = null;
				if (!sysServersx.getName().equals(name)) {
					query = new QuerySysServersBO();
					query.setName(name);

					List<SysServersDO> sysServers = sysServersService.querySysServersList(query).getModule();
					if (CollectionUtils.isNotEmpty(sysServers)) {
						result.setSuccess(false);
						result.setMsg("该服务器已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				if (StringUtils.isNotBlank(sysServersx.getInnerIp()) & StringUtils.isNotBlank(innerIp)
						& !sysServersx.getInnerIp().equals(innerIp)) {
					query = new QuerySysServersBO();
					query.setInnerIp(innerIp);
					query.setPort(port);

					List<SysServersDO> sysServers = sysServersService.querySysServersList(query).getModule();
					if (CollectionUtils.isNotEmpty(sysServers)) {
						result.setSuccess(false);
						result.setMsg("该内网IP：" + innerIp + "，端口：" + port + "已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				if (StringUtils.isNotBlank(sysServersx.getOuterIp()) & StringUtils.isNotBlank(outerIp)
						& !sysServersx.getOuterIp().equals(outerIp)) {
					query = new QuerySysServersBO();
					query.setOuterIp(outerIp);
					query.setPort(port);

					List<SysServersDO> sysServers = sysServersService.querySysServersList(query).getModule();
					if (CollectionUtils.isNotEmpty(sysServers)) {
						result.setSuccess(false);
						result.setMsg("该外网IP：" + outerIp + "，端口：" + port + "已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				sysServersx.setName(name);
				sysServersx.setInnerIp(innerIp);
				sysServersx.setOuterIp(outerIp);
				sysServersx.setPort(port);
				sysServersx.setMaxConn(maxConn);
				sysServersx.setType(type);
				sysServersx.setTimeout(timeout);
				sysServersx.setIcon(icon);
				sysServersx.setRemark(remark);
			}

			BaseResultDTO resultx = sysServersService.modifySysServers(sysServersx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(sysServersx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysServersAction-->modifySysServers:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysServersPage() {
		Page<SysServersDO> page = new Page<SysServersDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			String name = getParameter("name", "");
			String innerIp = getParameter("innerIp", "");
			String outerIp = getParameter("outerIp", "");
			Integer type = getParameter("type", 0);

			QuerySysServersBO query = new QuerySysServersBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}
			if (StringUtils.isNotBlank(innerIp)) {
				query.setInnerIp(innerIp);
			}
			if (StringUtils.isNotBlank(outerIp)) {
				query.setOuterIp(outerIp);
			}
			if (type > 0) {
				query.setType(type);
			}

			BatchResultDTO<SysServersDO> result = sysServersService.querySysServersPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysServersAction-->querySysServersPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}
}
