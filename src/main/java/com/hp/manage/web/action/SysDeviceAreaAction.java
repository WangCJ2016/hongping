package com.hp.manage.web.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QuerySysBroadcastHostsBO;
import com.hp.manage.bo.QuerySysCommHostsBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.bo.QuerySysRemoteHostsBO;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.domain.SysBroadcastHostsDO;
import com.hp.manage.domain.SysCommHostsDO;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemoteHostsDO;
import com.hp.manage.service.SysBroadcastChannelsService;
import com.hp.manage.service.SysBroadcastHostsService;
import com.hp.manage.service.SysCommHostsService;
import com.hp.manage.service.SysCommPropertiesService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.service.SysRemoteChannelsService;
import com.hp.manage.service.SysRemoteHostsService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysDeviceAreaAction")
public class SysDeviceAreaAction extends BaseAction {
	/** －－－－－－－－－－－－－－区域设备关联管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	@Autowired
	SysRemoteHostsService sysRemoteHostsService;

	@Autowired
	SysCommHostsService sysCommHostsService;

	@Autowired
	SysBroadcastHostsService sysBroadcastHostsService;

	@Autowired
	SysRemoteChannelsService sysRemoteChannelsService;

	@Autowired
	SysCommPropertiesService sysCommPropertiesService;

	@Autowired
	SysBroadcastChannelsService sysBroadcastChannelsService;

	// 通道 通信属性
	public void queryAllDevices() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String type = getParameter("type", "");
			if (StringUtils.isBlank(type)) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			String areaId = getParameter("areaId", "");
			if (StringUtils.isBlank(type)) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			Map<String, Object> map = new HashMap<String, Object>();
			if (type.equals("remote")) {
				QuerySysRemoteHostsBO query = new QuerySysRemoteHostsBO();
				query.setAreaId(areaId);
				List<SysRemoteHostsDO> hosts = sysRemoteHostsService.querySysRemoteHostsList(query).getModule();
				if (CollectionUtils.isNotEmpty(hosts)) {
					map.put("remote", hosts);
				}
			} else if (type.equals("comm")) {
				QuerySysCommHostsBO query = new QuerySysCommHostsBO();
				query.setAreaId(areaId);
				List<SysCommHostsDO> hosts = sysCommHostsService.querySysCommHostsList(query).getModule();
				if (CollectionUtils.isNotEmpty(hosts)) {
					map.put("comm", hosts);
				}
			} else if (type.equals("broadcast")) {
				QuerySysBroadcastHostsBO query = new QuerySysBroadcastHostsBO();
				query.setAreaId(areaId);
				List<SysBroadcastHostsDO> hosts = sysBroadcastHostsService.querySysBroadcastHostsList(query)
						.getModule();
				if (CollectionUtils.isNotEmpty(hosts)) {
					map.put("broadcast", hosts);
				}
			}
			result.setDataObject(map);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->queryAllDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAreaDevices() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String areaId = getParameter("areaId", "");
			if (StringUtils.isBlank(areaId)) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}
			QuerySysDeviceAreaBO query = new QuerySysDeviceAreaBO();
			query.setAreaId(areaId);
			List<SysDeviceAreaDO> devices = sysDeviceAreaService.querySysDeviceAreaList(query).getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				for (SysDeviceAreaDO device : devices) {
					Integer type = device.getType();
					// 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防
					if (type == 1 || type == 2 || type == 3) {
						SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
								device.getDevId()).getModule();
						if (null != channel) {
							device.setDevName(channel.getName());
							device.setDevIcon(channel.getIcon());
						}
					} else if (type == 5 || type == 7) {
						SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(
								device.getDevId()).getModule();
						if (null != property) {
							device.setDevName(property.getName());
							device.setDevIcon(property.getIcon());
						}
					} else if (type == 4) {
						SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(
								device.getDevId()).getModule();
						if (null != channel) {
							device.setDevName(channel.getName());
							device.setDevIcon(channel.getIcon());
						}
					}
				}
				result.setDataObject(devices);
			} else {
				result.setDataObject(new ArrayList<SysDeviceAreaDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->queryAreaDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysDeviceArea() {
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

			String areaId = getParameter("areaId", "");
			if (StringUtils.isBlank(areaId)) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String devIds = getParameter("devIds", "");
			if (StringUtils.isBlank(devIds)) {
				result.setSuccess(false);
				result.setMsg("请传入设备ID");
				responseJsonp(result);
				return;
			}

			String types = getParameter("types", "");
			if (StringUtils.isBlank(types)) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			String[] devIdsx = devIds.split(",");
			String[] typesx = types.split(",");
			for (int i = 0; i < devIdsx.length; i++) {
				SysDeviceAreaDO deviceArea = new SysDeviceAreaDO();
				deviceArea.setId(TokenUtil.getInstance().generateID());
				deviceArea.setAreaId(areaId);
				deviceArea.setDevId(devIdsx[i]);
				deviceArea.setType(Integer.valueOf(typesx[i]));
				deviceArea.setCreateUserId(accountId);

				BaseResultDTO resultx = sysDeviceAreaService.createSysDeviceArea(deviceArea);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->createSysDeviceArea:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysDeviceArea() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String areaId = getParameter("areaId", "");
			if (StringUtils.isBlank(areaId)) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
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

			String plusDevIds = getParameter("plusDevIds", "");
			String minusDevIds = getParameter("minusDevIds", "");

			Integer isDelete = getParameter("isDelete", -1);

			if (isDelete > 0) {
			} else {
				if (StringUtils.isNotBlank(plusDevIds)) {
					for (String idType : plusDevIds.split(",")) {
						SysDeviceAreaDO deviceArea = new SysDeviceAreaDO();
						deviceArea.setId(TokenUtil.getInstance().generateID());
						deviceArea.setAreaId(areaId);
						deviceArea.setDevId(idType.split(":")[0]);
						deviceArea.setType(Integer.valueOf(idType.split(":")[1]));
						deviceArea.setCreateUserId(accountId);

						BaseResultDTO resultx = sysDeviceAreaService.createSysDeviceArea(deviceArea);
						if (!resultx.isSuccess()) {
							result.setSuccess(false);
							result.setMsg(resultx.getErrorDetail());
						}
					}
				}
				if (StringUtils.isNotBlank(minusDevIds)) {
					StringBuffer minusDevIdsx = new StringBuffer();
					for (String devId : minusDevIds.split(",")) {
						minusDevIdsx.append("'" + devId + "'" + ",");
					}

					Map<String, Object> params = new HashMap<String, Object>();
					params.put("areaId", areaId);
					params.put("devIds", minusDevIdsx.toString().substring(0, minusDevIdsx.toString().length() - 1));
					sysDeviceAreaService.deleteSysDeviceArea(params);
				}
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->modifySysDeviceArea:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	@SuppressWarnings("unused")
	private Map<String, Object> getPMIds(String ids, String idsx) {
		String plusIds = idsx;
		for (String s : ids.split(",")) {
			plusIds = plusIds.replace(s, "");
		}

		StringBuffer plusIdsx = new StringBuffer();
		for (String s : plusIds.split(",")) {
			if (StringUtils.isNotBlank(s)) {
				plusIdsx.append(s + ",");
			}
		}

		String minusIds = ids;
		for (String s : idsx.split(",")) {
			minusIds = minusIds.replace(s, "");
		}

		StringBuffer minusIdsx = new StringBuffer();
		for (String s : minusIds.split(",")) {
			if (StringUtils.isNotBlank(s)) {
				minusIdsx.append(s + ",");
			}
		}

		Map<String, Object> map = new HashMap<String, Object>();
		if (StringUtils.isNotBlank(plusIdsx)) {
			map.put("plusIds", plusIdsx.toString().substring(0, plusIdsx.toString().length() - 1));
		}
		if (StringUtils.isNotBlank(minusIdsx)) {
			map.put("minusIds", minusIdsx.toString().substring(0, minusIdsx.toString().length() - 1));
		}

		System.out.println("增加：" + map.get("plusIds"));
		System.out.println("减少：" + map.get("minusIds"));
		return map;
	}

	public void checkDevWhetherInstalled() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String areaId = getParameter("areaId", "");
			if (StringUtils.isBlank(areaId)) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String devId = getParameter("devId", "");
			if (StringUtils.isBlank(devId)) {
				result.setSuccess(false);
				result.setMsg("请传入设备ID");
				responseJsonp(result);
				return;
			}

			QuerySysInstallPlaceBO query = new QuerySysInstallPlaceBO();
			query.setAreaId(areaId);
			query.setDevId(devId);
			if (CollectionUtils.isNotEmpty(sysInstallPlaceService.querySysInstallPlaceList(query).getModule())) {
				result.setSuccess(false);
				result.setMsg("此设备已在本区域地图绑定，确认取消？");
				responseJsonp(result);
				return;
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->checkDevWhetherInstalled:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
