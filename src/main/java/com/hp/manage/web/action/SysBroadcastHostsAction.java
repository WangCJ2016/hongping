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
import com.hp.manage.bo.QuerySysBroadcastChannelsBO;
import com.hp.manage.bo.QuerySysBroadcastHostsBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.domain.SysBroadcastHostsDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.service.SysBroadcastChannelsService;
import com.hp.manage.service.SysBroadcastHostsService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysBroadcastHostsAction")
public class SysBroadcastHostsAction extends BaseAction {
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysBroadcastHostsService sysBroadcastHostsService;

	@Autowired
	SysBroadcastChannelsService sysBroadcastChannelsService;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	/** －－－－－－－－－－－－－－广播主机管理－－－－－－－－－－－－－－ */
	public void getSysBroadcastHostsInfo() {
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
				result.setMsg("请传入广播主机ID");
				responseJsonp(result);
				return;
			}

			SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->getSysBroadcastHostsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysBroadcastHosts() {
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
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			if (StringUtils.isBlank(name)) {
				result.setSuccess(false);
				result.setMsg("请传入广播主机名称");
				responseJsonp(result);
				return;
			}

			String ip = getParameter("ip", "");
			if (StringUtils.isBlank(ip)) {
				result.setSuccess(false);
				result.setMsg("请传入主机IP");
				responseJsonp(result);
				return;
			}

			String port = getParameter("port", "");
			if (StringUtils.isBlank(port)) {
				result.setSuccess(false);
				result.setMsg("请传入端口");
				responseJsonp(result);
				return;
			}

			String productor = getParameter("productor", "");
			if (StringUtils.isBlank(productor)) {
				result.setSuccess(false);
				result.setMsg("请传入厂家");
				responseJsonp(result);
				return;
			}

			String username = getParameter("username", "");
			if (StringUtils.isBlank(username)) {
				result.setSuccess(false);
				result.setMsg("请传入账号");
				responseJsonp(result);
				return;
			}

			String psw = getParameter("psw", "");
			if (StringUtils.isBlank(psw)) {
				result.setSuccess(false);
				result.setMsg("请传入密码");
				responseJsonp(result);
				return;
			}

			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(productor)) {
				productor = URLDecoder.decode(productor, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			SysBroadcastHostsDO host = new SysBroadcastHostsDO();
			host.setId(TokenUtil.getInstance().generateID());
			host.setName(name);
			host.setIp(ip);
			host.setPort(port);
			host.setProductor(productor);
			host.setUsername(username);
			host.setPsw(psw);
			host.setIcon(icon);
			host.setRemark(remark);
			host.setCreateUserId(accountId);

			BaseResultDTO resultx = sysBroadcastHostsService.createSysBroadcastHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->createSysBroadcastHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysBroadcastHosts() {
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
				result.setMsg("请传入广播主机ID");
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
			String ip = getParameter("ip", "");
			String port = getParameter("port", "");
			String productor = getParameter("productor", "");
			String username = getParameter("username", "");
			String psw = getParameter("psw", "");
			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(productor)) {
				productor = URLDecoder.decode(productor, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", -1);

			SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(id).getModule();
			host.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysBroadcastChannelsBO query = new QuerySysBroadcastChannelsBO();
				query.setHostId(host.getId());
				List<SysBroadcastChannelsDO> channels = sysBroadcastChannelsService
						.querySysBroadcastChannelsList(query).getModule();
				if (CollectionUtils.isNotEmpty(channels)) {
					result.setSuccess(false);
					result.setMsg("该主机已存在通道，请先删除通道！");
					responseJsonp(result);
					return;
				}
				host.setIsDelete(isDelete);
			} else {
				QuerySysBroadcastHostsBO query = new QuerySysBroadcastHostsBO();
				if (!host.getName().equals(name)) {
					query.setName(name);

					List<SysBroadcastHostsDO> hosts = sysBroadcastHostsService.querySysBroadcastHostsList(query)
							.getModule();
					if (CollectionUtils.isNotEmpty(hosts)) {
						result.setSuccess(false);
						result.setMsg("该广播主机已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				if (!host.getIp().equals(ip)) {
					query.setIp(ip);

					List<SysBroadcastHostsDO> hosts = sysBroadcastHostsService.querySysBroadcastHostsList(query)
							.getModule();
					if (CollectionUtils.isNotEmpty(hosts)) {
						result.setSuccess(false);
						result.setMsg("该广播主机Ip已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				host.setName(name);
				host.setIp(ip);
				host.setPort(port);
				host.setProductor(productor);
				host.setUsername(username);
				host.setPsw(psw);
				host.setIcon(icon);
				host.setRemark(remark);
			}

			BaseResultDTO resultx = sysBroadcastHostsService.modifySysBroadcastHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->modifySysBroadcastHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysBroadcastHostsPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<SysBroadcastHostsDO> page = new Page<SysBroadcastHostsDO>();
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
			String ip = getParameter("ip", "");

			QuerySysBroadcastHostsBO query = new QuerySysBroadcastHostsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}
			if (StringUtils.isNotBlank(ip)) {
				query.setIp(ip);
			}

			BatchResultDTO<SysBroadcastHostsDO> result = sysBroadcastHostsService.querySysBroadcastHostsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->querySysBroadcastHostsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	/** －－－－－－－－－－－－－－广播主机通道管理－－－－－－－－－－－－－－ */
	public void getSysBroadcastChannelsInfo() {
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
				result.setMsg("请传入广播通道ID");
				responseJsonp(result);
				return;
			}

			SysBroadcastChannelsDO host = sysBroadcastChannelsService.querySysBroadcastChannelsById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->getSysBroadcastChannelsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysBroadcastChannels() {
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
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			if (StringUtils.isBlank(name)) {
				result.setSuccess(false);
				result.setMsg("请传入广播通道名称");
				responseJsonp(result);
				return;
			}

			String hostId = getParameter("hostId", "");
			if (StringUtils.isBlank(hostId)) {
				result.setSuccess(false);
				result.setMsg("请传入主机ID");
				responseJsonp(result);
				return;
			}

			Integer type = getParameter("type", 0);
			if (type <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入类型");
				responseJsonp(result);
				return;
			}

			String index = getParameter("index", "");
			if (StringUtils.isBlank(index)) {
				result.setSuccess(false);
				result.setMsg("请传入序号");
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

			SysBroadcastChannelsDO channel = new SysBroadcastChannelsDO();
			channel.setId(TokenUtil.getInstance().generateID());
			channel.setName(name);
			channel.setHostId(hostId);
			channel.setType(type);
			channel.setIndex(index);
			channel.setRemark(remark);
			channel.setIcon(icon);
			channel.setCreateUserId(accountId);

			BaseResultDTO resultx = sysBroadcastChannelsService.createSysBroadcastChannels(channel);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(channel);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->createSysBroadcastChannels:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysBroadcastChannels() {
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
				result.setMsg("请传入广播通道ID");
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
			String hostId = getParameter("hostId", "");
			Integer type = getParameter("type", 0);
			String index = getParameter("index", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			String icon = getParameter("icon", "");

			Integer isDelete = getParameter("isDelete", -1);

			SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(id).getModule();
			channel.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysDeviceAreaBO query = new QuerySysDeviceAreaBO();
				query.setDevId(id);
				List<SysDeviceAreaDO> devices = sysDeviceAreaService.querySysDeviceAreaList(query).getModule();
				if (CollectionUtils.isNotEmpty(devices)) {
					result.setSuccess(false);
					result.setMsg("该通道已绑定区域，请先解除绑定后再删除！");
					responseJsonp(result);
					return;
				}

				channel.setIsDelete(isDelete);
			} else {
				QuerySysBroadcastChannelsBO query = new QuerySysBroadcastChannelsBO();
				if (!channel.getName().equals(name)) {
					query.setName(name);
					query.setHostId(channel.getHostId());

					List<SysBroadcastChannelsDO> channels = sysBroadcastChannelsService.querySysBroadcastChannelsList(
							query).getModule();
					if (CollectionUtils.isNotEmpty(channels)) {
						result.setSuccess(false);
						result.setMsg("该广播通道已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				channel.setName(name);
				channel.setHostId(hostId);
				channel.setType(type);
				channel.setIndex(index);
				channel.setIcon(icon);
				channel.setRemark(remark);
			}

			BaseResultDTO resultx = sysBroadcastChannelsService.modifySysBroadcastChannels(channel);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(channel);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->modifySysBroadcastChannels:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysBroadcastChannels() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String hostId = getParameter("hostId", "");
			if (StringUtils.isBlank(hostId)) {
				result.setSuccess(false);
				result.setMsg("请传入广播主机ID");
				responseJsonp(result);
				return;
			}

			QuerySysBroadcastChannelsBO query = new QuerySysBroadcastChannelsBO();
			query.setHostId(hostId);
			List<SysBroadcastChannelsDO> channels = sysBroadcastChannelsService.querySysBroadcastChannelsList(query)
					.getModule();
			if (CollectionUtils.isNotEmpty(channels)) {
				result.setDataObject(channels);
			} else {
				result.setDataObject(new ArrayList<SysBroadcastChannelsDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->getSysBroadcastChannelsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－首页广播搜索－－－－－－－－ */
	public void querySysBroadcastChannelsPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<SysBroadcastChannelsDO> page = new Page<SysBroadcastChannelsDO>();
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

			QuerySysBroadcastChannelsBO query = new QuerySysBroadcastChannelsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}

			BatchResultDTO<SysBroadcastChannelsDO> result = sysBroadcastChannelsService
					.querySysBroadcastChannelsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}
			for (SysBroadcastChannelsDO channel : result.getModule()) {
				QuerySysInstallPlaceBO queryx = new QuerySysInstallPlaceBO();
				queryx.setDevId(channel.getId());
				List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(installs)) {
					channel.setInstallPlace(installs.get(0));
				}

				SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(channel.getHostId())
						.getModule();
				if (null != host) {
					channel.setHost(host);
				}
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysBroadcastHostsAction-->querySysBroadcastChannelsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}
}
