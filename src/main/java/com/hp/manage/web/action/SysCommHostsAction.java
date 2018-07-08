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
import com.hp.manage.bo.QuerySysCommDevicesBO;
import com.hp.manage.bo.QuerySysCommHostsBO;
import com.hp.manage.bo.QuerySysCommPropertiesBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.domain.SysCommDevicesDO;
import com.hp.manage.domain.SysCommHostsDO;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.service.SysCommDevicesService;
import com.hp.manage.service.SysCommHostsService;
import com.hp.manage.service.SysCommPropertiesService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysCommHostsAction")
public class SysCommHostsAction extends BaseAction {
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysCommHostsService sysCommHostsService;

	@Autowired
	SysCommDevicesService sysCommDevicesService;

	@Autowired
	SysCommPropertiesService sysCommPropertiesService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	/** －－－－－－－－－－－－－－通信主机管理－－－－－－－－－－－－－－ */
	public void getSysCommHostsInfo() {
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
				result.setMsg("请传入通信主机ID");
				responseJsonp(result);
				return;
			}

			SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->getSysCommHostsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysCommHosts() {
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
				result.setMsg("请传入通信主机名称");
				responseJsonp(result);
				return;
			}

			Integer devType = getParameter("devType", 0);
			if (devType <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
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

			String protocol = getParameter("protocol", "");
			if (StringUtils.isBlank(protocol)) {
				result.setSuccess(false);
				result.setMsg("请传入协议");
				responseJsonp(result);
				return;
			}

			String ip = getParameter("ip", "");
			if (StringUtils.isBlank(ip)) {
				result.setSuccess(false);
				result.setMsg("请传入IP");
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

			Integer comIndex = getParameter("comIndex", -1);
			if (comIndex <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入COM序号");
				responseJsonp(result);
				return;
			}

			String baudrate = getParameter("baudrate", "");
			if (StringUtils.isBlank(baudrate)) {
				result.setSuccess(false);
				result.setMsg("请传入波特率");
				responseJsonp(result);
				return;
			}

			String databit = getParameter("databit", "");
			if (StringUtils.isBlank(databit)) {
				result.setSuccess(false);
				result.setMsg("请传入数据位");
				responseJsonp(result);
				return;
			}

			Integer parity = getParameter("parity", -1);
			if (parity <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入校验位");
				responseJsonp(result);
				return;
			}

			String stopbit = getParameter("stopbit", "");
			if (StringUtils.isBlank(stopbit)) {
				result.setSuccess(false);
				result.setMsg("请传入停止位");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			String icon = getParameter("icon", "");

			SysCommHostsDO host = new SysCommHostsDO();
			host.setId(TokenUtil.getInstance().generateID());
			host.setName(name);
			host.setDevType(devType);
			host.setType(type);
			host.setProtocol(protocol);
			host.setIp(ip);
			host.setPort(port);
			host.setComIndex(comIndex);
			host.setBaudrate(baudrate);
			host.setDatabit(databit);
			host.setParity(parity);
			host.setStopbit(stopbit);
			host.setIcon(icon);
			host.setCreateUserId(accountId);

			BaseResultDTO resultx = sysCommHostsService.createSysCommHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->createSysCommHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysCommHosts() {
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
				result.setMsg("请传入通信主机ID");
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
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			Integer devType = getParameter("devType", 0);
			Integer type = getParameter("type", 0);
			String protocol = getParameter("protocol", "");
			String ip = getParameter("ip", "");
			String port = getParameter("port", "");
			Integer comIndex = getParameter("comIndex", -1);
			String baudrate = getParameter("baudrate", "");
			String databit = getParameter("databit", "");
			Integer parity = getParameter("parity", -1);
			String stopbit = getParameter("stopbit", "");
			String icon = getParameter("icon", "");

			Integer isDelete = getParameter("isDelete", -1);

			SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(id).getModule();
			host.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysCommDevicesBO query = new QuerySysCommDevicesBO();
				query.setHostId(host.getId());
				List<SysCommDevicesDO> devices = sysCommDevicesService.querySysCommDevicesList(query).getModule();
				if (CollectionUtils.isNotEmpty(devices)) {
					result.setSuccess(false);
					result.setMsg("该主机已存在关联设备，请先删除设备！");
					responseJsonp(result);
					return;
				}

				host.setIsDelete(isDelete);
			} else {
				QuerySysCommHostsBO query = new QuerySysCommHostsBO();
				if (!host.getName().equals(name)) {
					query.setName(name);

					List<SysCommHostsDO> hosts = sysCommHostsService.querySysCommHostsList(query).getModule();
					if (CollectionUtils.isNotEmpty(hosts)) {
						result.setSuccess(false);
						result.setMsg("该通信主机已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}
				if (!host.getIp().equals(ip)) {
					query = new QuerySysCommHostsBO();
					query.setIp(ip);
					List<SysCommHostsDO> hosts = sysCommHostsService.querySysCommHostsList(query).getModule();
					if (CollectionUtils.isNotEmpty(hosts)) {
						result.setSuccess(false);
						result.setMsg("该通信主机IP已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				host.setName(name);
				host.setDevType(devType);
				host.setType(type);
				host.setProtocol(protocol);
				host.setIp(ip);
				host.setPort(port);
				host.setComIndex(comIndex);
				host.setBaudrate(baudrate);
				host.setDatabit(databit);
				host.setParity(parity);
				host.setStopbit(stopbit);
				host.setIcon(icon);
			}

			BaseResultDTO resultx = sysCommHostsService.modifySysCommHosts(host);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(host);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->modifySysCommHosts:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysCommHostsPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<SysCommHostsDO> page = new Page<SysCommHostsDO>();
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
			Integer devType = getParameter("devType", 0);

			QuerySysCommHostsBO query = new QuerySysCommHostsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}
			if (StringUtils.isNotBlank(ip)) {
				query.setIp(ip);
			}
			if (devType > 0) {
				query.setDevType(devType);
			}

			BatchResultDTO<SysCommHostsDO> result = sysCommHostsService.querySysCommHostsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->querySysCommHostsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void querySysCommPropertiesByKeyword() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");

			QuerySysCommPropertiesBO query = new QuerySysCommPropertiesBO();

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}

			List<SysCommPropertiesDO> properties = sysCommPropertiesService.querySysCommPropertiesList(query)
					.getModule();
			if (CollectionUtils.isNotEmpty(properties)) {
				for (SysCommPropertiesDO property : properties) {
					SysCommDevicesDO device = sysCommDevicesService.querySysCommDevicesById(property.getDevHostId())
							.getModule();
					if (null != device) {
						property.setDevice(device);

						SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(device.getHostId()).getModule();
						if (null != host) {
							property.setHost(host);
						}
					}

					QuerySysInstallPlaceBO queryz = new QuerySysInstallPlaceBO();
					queryz.setDevId(property.getId());
					queryz.setType(5);
					List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(queryz)
							.getModule();
					if (CollectionUtils.isNotEmpty(installs)) {
						property.setInstall(installs.get(0));
					} else {
						property.setInstall(new SysInstallPlaceDO());
					}
				}
			}

			result.setSuccess(true);
			result.setDataObject(properties);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->querySysCommPropertiesByKeyword:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－－－－－－通信设备管理－－－－－－－－－－－－－－ */
	public void getSysCommDeviceInfo() {
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
				result.setMsg("请传入通信设备ID");
				responseJsonp(result);
				return;
			}

			SysCommDevicesDO host = sysCommDevicesService.querySysCommDevicesById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->getSysCommDevicesInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysCommDevice() {
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
				result.setMsg("请传入通信设备名称");
				responseJsonp(result);
				return;
			}

			String areaCode = getParameter("areaCode", "");
			if (StringUtils.isBlank(areaCode)) {
				result.setSuccess(false);
				result.setMsg("请传入区域编号");
				responseJsonp(result);
				return;
			}

			String hostId = getParameter("hostId", "");
			if (StringUtils.isBlank(hostId)) {
				result.setSuccess(false);
				result.setMsg("请传入通信主机ID");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			String icon = getParameter("icon", "");

			SysCommDevicesDO device = new SysCommDevicesDO();
			device.setId(TokenUtil.getInstance().generateID());
			device.setName(name);
			device.setAreaCode(areaCode);
			device.setHostId(hostId);
			device.setIcon(icon);
			device.setCreateUserId(accountId);

			BaseResultDTO resultx = sysCommDevicesService.createSysCommDevices(device);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(device);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->createSysCommDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysCommDevice() {
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
				result.setMsg("请传入通信设备ID");
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
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			String areaCode = getParameter("areaCode", "");
			String hostId = getParameter("hostId", "");
			String icon = getParameter("icon", "");

			Integer isDelete = getParameter("isDelete", -1);

			SysCommDevicesDO device = sysCommDevicesService.querySysCommDevicesById(id).getModule();
			device.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysCommPropertiesBO query = new QuerySysCommPropertiesBO();
				query.setDevHostId(device.getId());
				List<SysCommPropertiesDO> properties = sysCommPropertiesService.querySysCommPropertiesList(query)
						.getModule();
				if (CollectionUtils.isNotEmpty(properties)) {
					result.setSuccess(false);
					result.setMsg("该设备已存在设备属性，请先删除属性！");
					responseJsonp(result);
					return;
				}

				device.setIsDelete(isDelete);
			} else {
				QuerySysCommDevicesBO query = new QuerySysCommDevicesBO();
				if (!device.getName().equals(name)) {
					query.setName(name);
					query.setHostId(device.getHostId());

					List<SysCommDevicesDO> devices = sysCommDevicesService.querySysCommDevicesList(query).getModule();
					if (CollectionUtils.isNotEmpty(devices)) {
						result.setSuccess(false);
						result.setMsg("该通信设备已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}
				if (!device.getAreaCode().equals(areaCode)) {
					query = new QuerySysCommDevicesBO();
					query.setAreaCode(areaCode);
					query.setHostId(device.getHostId());

					List<SysCommDevicesDO> devices = sysCommDevicesService.querySysCommDevicesList(query).getModule();
					if (CollectionUtils.isNotEmpty(devices)) {
						result.setSuccess(false);
						result.setMsg("该通信设备区号已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				device.setName(name);
				device.setAreaCode(areaCode);
				device.setIcon(icon);
				device.setHostId(hostId);
			}

			BaseResultDTO resultx = sysCommDevicesService.modifySysCommDevices(device);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(device);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->modifySysCommDevice:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysCommDevices() {
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
				result.setMsg("请传入通信主机ID");
				responseJsonp(result);
				return;
			}

			QuerySysCommDevicesBO query = new QuerySysCommDevicesBO();
			query.setHostId(hostId);
			List<SysCommDevicesDO> devices = sysCommDevicesService.querySysCommDevicesList(query).getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				result.setDataObject(devices);
			} else {
				result.setDataObject(new ArrayList<SysCommDevicesDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->querySysCommDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAllSysCommDevices() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<SysCommDevicesDO> devices = sysCommDevicesService.querySysCommDevicesList(new QuerySysCommDevicesBO())
					.getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				result.setDataObject(devices);
			} else {
				result.setDataObject(new ArrayList<SysCommDevicesDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->queryAllSysCommDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－－－－－－通信属性管理－－－－－－－－－－－－－－ */
	public void getSysCommPropertiyInfo() {
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
				result.setMsg("请传入通信设备ID");
				responseJsonp(result);
				return;
			}

			SysCommPropertiesDO host = sysCommPropertiesService.querySysCommPropertiesById(id).getModule();
			if (null != host) {
				result.setDataObject(host);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->getSysCommPropertiyInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysCommProperty() {
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
				result.setMsg("请传入通信属性名称");
				responseJsonp(result);
				return;
			}

			String type = getParameter("type", "");
			if (StringUtils.isBlank(type)) {
				result.setSuccess(false);
				result.setMsg("请传入类型");
				responseJsonp(result);
				return;
			}

			String addressCode = getParameter("addressCode", "");
			if (StringUtils.isBlank(addressCode)) {
				result.setSuccess(false);
				result.setMsg("请传入地址编号");
				responseJsonp(result);
				return;
			}

			String devHostId = getParameter("devHostId", "");
			if (StringUtils.isBlank(devHostId)) {
				result.setSuccess(false);
				result.setMsg("请传入通信设备ID");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			String icon = getParameter("icon", "");

			SysCommPropertiesDO property = new SysCommPropertiesDO();
			property.setId(TokenUtil.getInstance().generateID());
			property.setName(name);
			property.setType(type);
			property.setAddressCode(addressCode);
			property.setDevHostId(devHostId);
			property.setIcon(icon);
			property.setCreateUserId(accountId);

			BaseResultDTO resultx = sysCommPropertiesService.createSysCommProperties(property);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(property);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->createSysCommProperty:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysCommProperty() {
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
				result.setMsg("请传入通信设备ID");
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
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			String type = getParameter("type", "");
			String addressCode = getParameter("addressCode", "");
			String devHostId = getParameter("devHostId", "");
			String icon = getParameter("icon", "");

			Integer isDelete = getParameter("isDelete", -1);

			SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(id).getModule();
			property.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysDeviceAreaBO query = new QuerySysDeviceAreaBO();
				query.setDevId(id);
				List<SysDeviceAreaDO> devices = sysDeviceAreaService.querySysDeviceAreaList(query).getModule();
				if (CollectionUtils.isNotEmpty(devices)) {
					result.setSuccess(false);
					result.setMsg("该属性已绑定区域，请先解除绑定后再删除！");
					responseJsonp(result);
					return;
				}

				property.setIsDelete(isDelete);
			} else {
				QuerySysCommPropertiesBO query = new QuerySysCommPropertiesBO();
				if (!property.getName().equals(name)) {
					query.setName(name);
					query.setDevHostId(property.getDevHostId());

					List<SysCommPropertiesDO> properties = sysCommPropertiesService.querySysCommPropertiesList(query)
							.getModule();
					if (CollectionUtils.isNotEmpty(properties)) {
						result.setSuccess(false);
						result.setMsg("通信属性名称已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}
				if (!property.getAddressCode().equals(addressCode)) {
					query = new QuerySysCommPropertiesBO();
					query.setAddressCode(addressCode);
					query.setDevHostId(property.getDevHostId());

					List<SysCommPropertiesDO> properties = sysCommPropertiesService.querySysCommPropertiesList(query)
							.getModule();
					if (CollectionUtils.isNotEmpty(properties)) {
						result.setSuccess(false);
						result.setMsg("通信属性地址编号已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				property.setName(name);
				property.setType(type);
				property.setAddressCode(addressCode);
				property.setDevHostId(devHostId);
				property.setIcon(icon);
			}

			BaseResultDTO resultx = sysCommPropertiesService.modifySysCommProperties(property);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(property);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->modifySysCommProperty:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysCommProperties() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String devHostId = getParameter("devHostId", "");
			if (StringUtils.isBlank(devHostId)) {
				result.setSuccess(false);
				result.setMsg("请传入设备主机ID");
				responseJsonp(result);
				return;
			}

			QuerySysCommPropertiesBO query = new QuerySysCommPropertiesBO();
			query.setDevHostId(devHostId);
			List<SysCommPropertiesDO> devices = sysCommPropertiesService.querySysCommPropertiesList(query).getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				result.setDataObject(devices);
			} else {
				result.setDataObject(new ArrayList<SysCommPropertiesDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->querySysCommProperties:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAllSysCommProperties() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<SysCommPropertiesDO> devices = sysCommPropertiesService.querySysCommPropertiesList(
					new QuerySysCommPropertiesBO()).getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				result.setDataObject(devices);
			} else {
				result.setDataObject(new ArrayList<SysCommPropertiesDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysCommHostsAction-->queryAllSysCommProperties:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

}
