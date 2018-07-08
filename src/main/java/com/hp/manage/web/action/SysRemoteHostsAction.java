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
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.bo.QuerySysRemoteChannelsBO;
import com.hp.manage.bo.QuerySysRemoteHostsBO;
import com.hp.manage.bo.QuerySysRemotePresetBO;
import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemoteHostsDO;
import com.hp.manage.domain.SysRemotePresetDO;
import com.hp.manage.domain.SysServersDO;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.service.SysRemoteChannelsService;
import com.hp.manage.service.SysRemoteHostsService;
import com.hp.manage.service.SysRemotePresetService;
import com.hp.manage.service.SysServersService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysRemoteHostsAction")
public class SysRemoteHostsAction extends BaseAction {
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysRemoteHostsService sysRemoteHostsService;

	@Autowired
	SysServersService sysServersService;

	@Autowired
	SysRemoteChannelsService sysRemoteChannelsService;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	@Autowired
	SysRemotePresetService sysRemotePresetService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	/** －－－－－－－－－－－－－－视频视频主机管理－－－－－－－－－－－－－－ */
	public void querySysServers() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			QuerySysServersBO query = new QuerySysServersBO();
			query.setType(1);
			List<SysServersDO> servers = sysServersService.querySysServersList(query).getModule();
			if (CollectionUtils.isNotEmpty(servers)) {
				result.setDataObject(servers);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->querySysServers:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getSysRemoteHostsInfo() {
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
				result.setMsg("请传入视频主机ID");
				responseJsonp(result);
				return;
			}

			SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->getSysRemoteHostsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysRemoteHosts() {
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
				result.setMsg("请传入视频主机名称");
				responseJsonp(result);
				return;
			}

			Integer type = getParameter("type", -1);
			if (type <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入视频主机类型");
				responseJsonp(result);
				return;
			}

			Integer connectMode = getParameter("connectMode", -1);
			if (connectMode <= -1) {
				result.setSuccess(false);
				result.setMsg("连接模式");
				responseJsonp(result);
				return;
			}

			String url = getParameter("url", "");
			if (StringUtils.isBlank(url)) {
				result.setSuccess(false);
				result.setMsg("请传入IP／域名");
				responseJsonp(result);
				return;
			}

			String port = getParameter("port", "");
			if (StringUtils.isBlank(port)) {
				result.setSuccess(false);
				result.setMsg("请传入端口号");
				responseJsonp(result);
				return;
			}

			Integer productor = getParameter("productor", -1);
			if (productor <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入厂家");
				responseJsonp(result);
				return;
			}

			Integer model = getParameter("model", -1);
			if (model <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入规格型号");
				responseJsonp(result);
				return;
			}

			String username = getParameter("username", "");
			if (StringUtils.isBlank(username)) {
				result.setSuccess(false);
				result.setMsg("请传入登录账号");
				responseJsonp(result);
				return;
			}

			String psw = getParameter("psw", "");
			if (StringUtils.isBlank(psw)) {
				result.setSuccess(false);
				result.setMsg("请传入登录密码");
				responseJsonp(result);
				return;
			}

			Integer channels = getParameter("channels", -1);
			if (channels <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入通道数");
				responseJsonp(result);
				return;
			}

			String mediaServer1Id = getParameter("mediaServer1Id", "");
			if (StringUtils.isBlank(mediaServer1Id)) {
				result.setSuccess(false);
				result.setMsg("请传入流媒体服务器");
				responseJsonp(result);
				return;
			}

			String mediaServer2Id = getParameter("mediaServer2Id", "");
			String mediaServer3Id = getParameter("mediaServer3Id", "");

			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			SysRemoteHostsDO host = new SysRemoteHostsDO();
			host.setId(TokenUtil.getInstance().generateID());
			host.setName(name);
			host.setType(type);
			host.setConnectMode(connectMode);
			host.setUrl(url);
			host.setPort(port);
			host.setProductor(productor);
			host.setModel(model);
			host.setUsername(username);
			host.setPsw(psw);
			host.setChannels(channels);
			host.setMediaServer1Id(mediaServer1Id);
			host.setMediaServer2Id(mediaServer2Id);
			host.setMediaServer3Id(mediaServer3Id);
			host.setIcon(icon);
			host.setRemark(remark);
			host.setCreateUserId(accountId);

			BaseResultDTO resultx = sysRemoteHostsService.createSysRemoteHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->createSysRemoteHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysRemoteHosts() {
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
				result.setMsg("请传入视频主机ID");
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
			Integer type = getParameter("type", -1);
			Integer connectMode = getParameter("connectMode", -1);
			String url = getParameter("url", "");
			String port = getParameter("port", "");
			Integer productor = getParameter("productor", -1);
			Integer model = getParameter("model", -1);
			String username = getParameter("username", "");
			String psw = getParameter("psw", "");
			Integer channels = getParameter("channels", -1);
			String mediaServer1Id = getParameter("mediaServer1Id", "");
			String mediaServer2Id = getParameter("mediaServer2Id", "");
			String mediaServer3Id = getParameter("mediaServer3Id", "");
			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", -1);

			SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(id).getModule();
			host.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysRemoteChannelsBO query = new QuerySysRemoteChannelsBO();
				query.setRemoteHostId(host.getId());
				List<SysRemoteChannelsDO> channelsx = sysRemoteChannelsService.querySysRemoteChannelsList(query)
						.getModule();
				if (CollectionUtils.isNotEmpty(channelsx)) {
					result.setSuccess(false);
					result.setMsg("该主机已存在通道，请先删除通道！");
					responseJsonp(result);
					return;
				}

				host.setIsDelete(isDelete);
			} else {
				QuerySysRemoteHostsBO query = null;
				if (!host.getName().equals(name)) {
					query = new QuerySysRemoteHostsBO();
					query.setName(name);

					List<SysRemoteHostsDO> hosts = sysRemoteHostsService.querySysRemoteHostsList(query).getModule();
					if (CollectionUtils.isNotEmpty(hosts)) {
						result.setSuccess(false);
						result.setMsg("该视频主机已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				host.setName(name);
				host.setType(type);
				host.setConnectMode(connectMode);
				host.setUrl(url);
				host.setPort(port);
				host.setProductor(productor);
				host.setModel(model);
				host.setUsername(username);
				host.setPsw(psw);
				host.setChannels(channels);
				host.setMediaServer1Id(mediaServer1Id);
				host.setMediaServer2Id(mediaServer2Id);
				host.setMediaServer3Id(mediaServer3Id);
				host.setIcon(icon);
				host.setRemark(remark);
			}

			BaseResultDTO resultx = sysRemoteHostsService.modifySysRemoteHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->modifySysRemoteHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysRemoteHostsPage() {
		Page<SysRemoteHostsDO> page = new Page<SysRemoteHostsDO>();
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

			QuerySysRemoteHostsBO query = new QuerySysRemoteHostsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}

			BatchResultDTO<SysRemoteHostsDO> result = sysRemoteHostsService.querySysRemoteHostsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->querySysRemoteHostsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	/** －－－－－－－－－－－－－－视频通道管理－－－－－－－－－－－－－－ */
	public void createSysRemoteChannels() {
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
			String index = getParameter("index", "");
			Integer type = getParameter("type", 0);
			String remoteHostId = getParameter("remoteHostId", "");
			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			SysRemoteChannelsDO channel = new SysRemoteChannelsDO();
			channel.setId(TokenUtil.getInstance().generateID());
			channel.setIndex(index);
			channel.setType(type);
			channel.setRemoteHostId(remoteHostId);
			channel.setName(name);
			channel.setIcon(icon);
			channel.setRemark(remark);
			channel.setCreateUserId(accountId);

			BaseResultDTO resultx = sysRemoteChannelsService.createSysRemoteChannels(channel);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(channel);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->createSysRemoteChannels:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysRemoteChannels() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String remoteHostId = getParameter("remoteHostId", "");

			QuerySysRemoteChannelsBO query = new QuerySysRemoteChannelsBO();
			query.setRemoteHostId(remoteHostId);
			List<SysRemoteChannelsDO> channels = sysRemoteChannelsService.querySysRemoteChannelsList(query).getModule();
			if (CollectionUtils.isNotEmpty(channels)) {
				result.setDataObject(channels);
			} else {
				result.setDataObject(new ArrayList<SysRemoteChannelsDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->querySysRemoteChannels:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getSysRemoteChannelInfo() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String id = getParameter("id", "");

			SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(id).getModule();
			if (null != channel) {
				result.setDataObject(channel);
			} else {
				result.setSuccess(false);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->getSysRemoteChannelInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysRemoteChannel() {
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

			String id = getParameter("id", "");
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入通道ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			String index = getParameter("index", "");
			Integer type = getParameter("type", -1);
			String remoteHostId = getParameter("remoteHostId", "");
			String icon = getParameter("icon", "");
			String remark = getParameter("remark", "");

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", -1);

			SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(id).getModule();
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
				if (!channel.getName().equals(name)) {
					QuerySysRemoteChannelsBO query = new QuerySysRemoteChannelsBO();
					query.setName(name);
					query.setRemoteHostId(remoteHostId);
					if (CollectionUtils.isNotEmpty(sysRemoteChannelsService.querySysRemoteChannelsList(query)
							.getModule())) {
						result.setSuccess(false);
						result.setMsg("通道已存在，请重新输入");
						responseJsonp(result);
						return;
					}
				}

				channel.setIndex(index);
				channel.setType(type);
				channel.setRemoteHostId(remoteHostId);
				channel.setName(name);
				channel.setIcon(icon);
				channel.setRemark(remark);
			}

			BaseResultDTO resultx = sysRemoteChannelsService.modifySysRemoteChannels(channel);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(channel);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->modifySysRemoteChannel:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－首页摄像搜索－－－－－－－－ */
	public void querySysRemoteChannelsPage() {
		Page<SysRemoteChannelsDO> page = new Page<SysRemoteChannelsDO>();
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

			Integer type = getParameter("type", 0);

			QuerySysRemoteChannelsBO query = new QuerySysRemoteChannelsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}
			if (type > 0) {
				query.setType(type);
			}

			BatchResultDTO<SysRemoteChannelsDO> result = sysRemoteChannelsService.querySysRemoteChannelsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}
			for (SysRemoteChannelsDO channel : result.getModule()) {
				QuerySysInstallPlaceBO queryx = new QuerySysInstallPlaceBO();
				queryx.setDevId(channel.getId());
				List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(installs)) {
					channel.setInstallPlace(installs.get(0));
				}

				SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(channel.getRemoteHostId())
						.getModule();
				if (null != host) {
					List<SysServersDO> servers = new ArrayList<SysServersDO>();
					if (null != host.getMediaServer1Id()) {
						SysServersDO server = sysServersService.querySysServersById(host.getMediaServer1Id())
								.getModule();
						if (null != server) {
							servers.add(server);
						}
					}
					if (null != host.getMediaServer2Id()) {
						SysServersDO server = sysServersService.querySysServersById(host.getMediaServer1Id())
								.getModule();
						if (null != server) {
							servers.add(server);
						}
					}
					if (null != host.getMediaServer3Id()) {
						SysServersDO server = sysServersService.querySysServersById(host.getMediaServer1Id())
								.getModule();
						if (null != server) {
							servers.add(server);
						}
					}
					host.setServers(servers);

					channel.setHost(host);
				}
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->querySysRemoteChannelsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void getSysRemotePresetInfo() {
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
				result.setMsg("请传入预置位ID");
				responseJsonp(result);
				return;
			}

			SysRemotePresetDO host = sysRemotePresetService.querySysRemotePresetById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->getSysRemotePresetInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysRemotePreset() {
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

			String presetName = getParameter("presetName", "");
			if (StringUtils.isBlank(presetName)) {
				result.setSuccess(false);
				result.setMsg("请传入预置位名称");
				responseJsonp(result);
				return;
			}

			String presetId = getParameter("presetId", "");
			if (StringUtils.isBlank(presetId)) {
				result.setSuccess(false);
				result.setMsg("请传入预置位序号");
				responseJsonp(result);
				return;
			}

			String channelId = getParameter("channelId", "");
			if (StringUtils.isBlank(presetId)) {
				result.setSuccess(false);
				result.setMsg("请传入通道ID");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(presetName)) {
				presetName = URLDecoder.decode(presetName, "UTF-8");
			}

			SysRemotePresetDO preset = new SysRemotePresetDO();
			preset.setId(TokenUtil.getInstance().generateID());
			preset.setPresetId(presetId);
			preset.setPresetName(presetName);
			preset.setChannelId(channelId);
			preset.setCreateUserId(accountId);

			BaseResultDTO resultx = sysRemotePresetService.createSysRemotePreset(preset);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(preset);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->createSysRemotePreset:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysRemotePreset() {
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
				result.setMsg("请传入预置位ID");
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

			String presetName = getParameter("presetName", "");
			String presetId = getParameter("presetId", "");
			String channelId = getParameter("channelId", "");

			Integer isDelete = getParameter("isDelete", -1);

			SysRemotePresetDO preset = sysRemotePresetService.querySysRemotePresetById(id).getModule();
			preset.setModifyUserId(accountId);
			if (isDelete > 0) {
				preset.setIsDelete(isDelete);
			} else {
				QuerySysRemotePresetBO query = null;
				if (!preset.getPresetName().equals(presetName)) {
					query = new QuerySysRemotePresetBO();
					query.setPresetName(presetName);

					List<SysRemotePresetDO> Preset = sysRemotePresetService.querySysRemotePresetList(query).getModule();
					if (CollectionUtils.isNotEmpty(Preset)) {
						result.setSuccess(false);
						result.setMsg("预置位：" + presetName + "已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				preset.setPresetId(presetId);
				preset.setPresetName(presetName);
				preset.setChannelId(channelId);
			}

			BaseResultDTO resultx = sysRemotePresetService.modifySysRemotePreset(preset);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(preset);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->modifySysRemotePreset:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysRemotePresets() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String channelId = getParameter("channelId", "");
			if (StringUtils.isBlank(channelId)) {
				result.setSuccess(false);
				result.setMsg("请传入通道ID");
				responseJsonp(result);
				return;
			}

			QuerySysRemotePresetBO query = new QuerySysRemotePresetBO();
			List<SysRemotePresetDO> presets = sysRemotePresetService.querySysRemotePresetList(query).getModule();
			if (CollectionUtils.isNotEmpty(presets)) {
				result.setDataObject(presets);
			} else {
				result.setDataObject(new ArrayList<SysRemotePresetDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemoteHostsAction-->getSysRemotePresetInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
