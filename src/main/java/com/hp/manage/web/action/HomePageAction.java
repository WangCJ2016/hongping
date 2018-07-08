package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.bo.Page;
import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.Base64Utils;
import com.hp.commons.utils.DateUtils;
import com.hp.commons.utils.PatrolTask;
import com.hp.commons.utils.QuartzManager;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAlarmsBO;
import com.hp.manage.bo.QueryCarsBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.AlarmsDOX;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.domain.CarsDO;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.domain.SysBroadcastHostsDO;
import com.hp.manage.domain.SysCommDevicesDO;
import com.hp.manage.domain.SysCommHostsDO;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemoteHostsDO;
import com.hp.manage.domain.SysServersDO;
import com.hp.manage.service.AccountService;
import com.hp.manage.service.AlarmsService;
import com.hp.manage.service.AreasService;
import com.hp.manage.service.CarsService;
import com.hp.manage.service.SysBroadcastChannelsService;
import com.hp.manage.service.SysBroadcastHostsService;
import com.hp.manage.service.SysCommDevicesService;
import com.hp.manage.service.SysCommHostsService;
import com.hp.manage.service.SysCommPropertiesService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.service.SysRemoteChannelsService;
import com.hp.manage.service.SysRemoteHostsService;
import com.hp.manage.service.SysServersService;
import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.service.RegionService;
import com.hp.manage.tcp.SysServerDatasSync;
import com.hp.manage.web.base.action.BaseAction;
import com.hp.websocket.server.WebSocketMessageInboundPool;

@Scope("prototype")
@Controller("homePageAction")
public class HomePageAction extends BaseAction {
	/** －－－－－－－－－－－－－－首页管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	private static Map<String, Object> key = new HashMap<String, Object>();
	static {
		key.put("WB", "VmpCSmRGVXhSWFJTUlc5MFUwWkJlVTFFUlRNPQ==");
	}

	@Autowired
	CarsService carsService;

	@Autowired
	AlarmsService alarmsService;

	@Autowired
	SysRemoteChannelsService sysRemoteChannelsService;

	@Autowired
	SysRemoteHostsService sysRemoteHostsService;

	@Autowired
	SysBroadcastChannelsService sysBroadcastChannelsService;

	@Autowired
	SysBroadcastHostsService sysBroadcastHostsService;

	@Autowired
	SysCommPropertiesService sysCommPropertiesService;

	@Autowired
	SysCommDevicesService sysCommDevicesService;

	@Autowired
	SysCommHostsService sysCommHostsService;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	@Autowired
	SysServersService sysServersService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	@Autowired
	RegionService regionService;

	@Autowired
	AccountService accountService;

	@Autowired
	AreasService areasService;

	public void test() {
		WebSocketMessageInboundPool.sendMessageToClient("666469dc9f8f47555a03a7f41b5cd888");
	}

	public void v() {
		ActionResult re = new ActionResult();
		try {
			re.setDataObject(regionService.queryRegionList(new QueryRegionBO()));
			responseJsonp(re);
		} catch (Exception e) {
			logger.error("HomePageAction-->v:", e);
		}
	}

	public void addJob() {
		String JOB_NAME = "A";
		String TRIGGER_NAME = "AX";
		String JOB_GROUP_NAME = "XLXXCC_JOB_GROUP";
		String TRIGGER_GROUP_NAME = "XLXXCC_JOB_GROUP";
		QuartzManager.addJob(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME, PatrolTask.class,
				"0/10 * * * * ?");
	}

	public void modifyJob() {
		String JOB_NAME = "A";
		String TRIGGER_NAME = "AX";
		String JOB_GROUP_NAME = "XLXXCC_JOB_GROUP";
		String TRIGGER_GROUP_NAME = "XLXXCC_JOB_GROUP";
		QuartzManager.modifyJobTime(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME, "0/50 * * * * ?");
	}

	/** －－－－－－－－－－－－－－车辆－－－－－－－－－－－－－－ */
	public void createCar() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!whetherLegal()) {
				result.setSuccess(false);
				result.setDataObject("非法请求");
				responseJsonp(result);
				return;
			}

			String carNo = getParameter("carNo", "");
			String gate = getParameter("gate", "");
			String outline = getParameter("outline", "");
			Integer action = getParameter("action", 0);// 进出 1 进 2 出
			String time = getParameter("time", "");
			String picture = getParameter("picture", "");

			if (StringUtils.isNotBlank(carNo)) {
				carNo = URLDecoder.decode(carNo, "UTF-8");
			}
			if (StringUtils.isNotBlank(gate)) {
				gate = URLDecoder.decode(gate, "UTF-8");
			}
			if (StringUtils.isNotBlank(outline)) {
				outline = URLDecoder.decode(outline, "UTF-8");
			}

			String deviceId = getParameter("deviceId", "");
			Integer deviceType = getParameter("deviceType", 0);

			WebSocketMessageInboundPool.sendMessageToClient("CAR");

			CarsDO car = new CarsDO();
			car.setId(TokenUtil.getInstance().generateID());
			car.setCarNo(carNo);
			car.setGate(gate);
			car.setOutline(outline);
			car.setAction(action);
			car.setTime(DateUtils.getFormatDate(time, "yyyy-MM-dd HH:mm:ss"));
			car.setPicture(picture);
			car.setDeviceId(deviceId);
			car.setDeviceType(deviceType);

			BaseResultDTO resultx = carsService.createCars(car);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(car);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->createCars:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getCarDetail() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String carId = getParameter("carId", "");

			CarsDO car = carsService.queryCarsById(carId).getModule();

			result.setSuccess(true);
			result.setDataObject(car);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->getCarDetail:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryCarsPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<CarsDO> page = new Page<CarsDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			String carNo = getParameter("carNo", "");
			String devId = getParameter("deviceId", "");
			String startTime = getParameter("startTime", "");
			String endTime = getParameter("endTime", "");

			QueryCarsBO query = new QueryCarsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(carNo)) {
				query.setCarNo(carNo);
			}
			if (StringUtils.isNotBlank(devId)) {
				query.setDeviceId(devId);
			}
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			BatchResultDTO<CarsDO> result = carsService.queryCarsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("HomePageAction-->queryCarsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	/** －－－－－－－－－－－－－－报警－－－－－－－－－－－－－－ */
	public void createAlarm() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!whetherLegal()) {
				result.setSuccess(false);
				result.setDataObject("非法请求");
				responseJsonp(result);
				return;
			}

			String event = getParameter("event", "");
			Integer degree = getParameter("degree", 0);// 0 正常 1 非紧急 2 紧急
			String place = getParameter("place", "");
			String time = getParameter("time", "");
			String device = getParameter("device", "");

			if (StringUtils.isNotBlank(event)) {
				event = URLDecoder.decode(event, "UTF-8");
			}
			if (StringUtils.isNotBlank(place)) {
				place = URLDecoder.decode(place, "UTF-8");
			}
			if (StringUtils.isNotBlank(device)) {
				device = URLDecoder.decode(device, "UTF-8");
			}
			Integer type = getParameter("type", 0);// 1 消防报警 2 红外报警 3 移动侦测报警
													// 4 紧急呼叫
			String deviceId = getParameter("deviceId", "");
			Integer deviceType = getParameter("deviceType", 0);

			WebSocketMessageInboundPool.sendMessageToClient("ALARM");

			AlarmsDO alarm = new AlarmsDO();
			alarm.setId(TokenUtil.getInstance().generateID());
			alarm.setEvent(event);
			alarm.setDegree(degree);
			alarm.setPlace("－");
			alarm.setTime(DateUtils.getFormatDate(time, "yyyy-MM-dd HH:mm:ss"));
			alarm.setDevice(device);
			alarm.setType(type);
			alarm.setDeviceId(deviceId);
			alarm.setDeviceType(deviceType);

			if (StringUtils.isNotBlank(deviceId) && deviceType > 0) {
				QuerySysInstallPlaceBO queryx = new QuerySysInstallPlaceBO();
				queryx.setDevId(alarm.getDeviceId());
				queryx.setType(alarm.getDeviceType());
				List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(installs)) {
					AreasDO area = areasService.queryAreasById(installs.get(0).getAreaId()).getModule();
					alarm.setPlace(area.getName());
				}
			}

			BaseResultDTO resultx = alarmsService.createAlarms(alarm);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(alarm);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->createAlarms:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－－－－－－报警－－－－－－－－－－－－－－ */
	public void getAlarmInfo() {
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

			AlarmsDO alarm = alarmsService.queryAlarmsById(id).getModule();
			if (null == alarm) {
				result.setSuccess(false);
				result.setMsg("报警信息不存在！");
				responseJsonp(result);
				return;
			}

			if (null != alarm.getDeviceId() && null != alarm.getDeviceType()) {
				QuerySysInstallPlaceBO query = new QuerySysInstallPlaceBO();
				query.setDevId(alarm.getDeviceId());
				query.setType(alarm.getDeviceType());
				List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(query).getModule();
				if (CollectionUtils.isNotEmpty(installs)) {
					SysInstallPlaceDO install = installs.get(0);
					// 报警设备位置
					alarm.setInstall(install);

					// 报警设备区域 摄像头
					query = new QuerySysInstallPlaceBO();
					query.setAreaId(install.getAreaId());
					query.setType(1);
					List<SysInstallPlaceDO> installsx = sysInstallPlaceService.querySysInstallPlaceList(query)
							.getModule();

					List<SysRemoteChannelsDO> channels = new ArrayList<SysRemoteChannelsDO>();
					for (SysInstallPlaceDO installx : installsx) {
						SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
								installx.getDevId()).getModule();
						if (null != channel) {
							SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(
									channel.getRemoteHostId()).getModule();
							if (null != host) {
								channel.setHost(host);
								List<SysServersDO> servers = new ArrayList<SysServersDO>();
								if (StringUtils.isNoneBlank(host.getMediaServer1Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer1Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								if (StringUtils.isNoneBlank(host.getMediaServer2Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer2Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								if (StringUtils.isNoneBlank(host.getMediaServer3Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer3Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								host.setServers(servers);
							}

							channels.add(channel);
						}
					}

					if (CollectionUtils.isNotEmpty(channels)) {
						alarm.setChannels(channels);
					}
				}
			}

			result.setDataObject(alarm);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->getAlarmInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－－－－－－报警关联设备－－－－－－－－－－－－－－ */
	public void getAlarmLinkageDevices() {
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
			String type = getParameter("type", "");

			QuerySysInstallPlaceBO query = new QuerySysInstallPlaceBO();
			if (type.equals("broadcast")) {
				query.setType(4);// 设备类型 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防 8 对讲
			} else if (type.equals("gate")) {
				query.setType(3);
			} else if (type.equals("guard")) {
				query.setType(5);
			}

			query.setAreaId(areaId);

			List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(query).getModule();
			if (type.equals("broadcast")) {
				List<SysBroadcastChannelsDO> channels = new ArrayList<SysBroadcastChannelsDO>();
				for (SysInstallPlaceDO installx : installs) {
					SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(
							installx.getDevId()).getModule();
					if (null != channel) {
						SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(
								channel.getHostId()).getModule();
						if (null != host) {
							channel.setHost(host);
						}
						channels.add(channel);
					}
				}
				result.setDataObject(channels);
			} else if (type.equals("gate")) {
				List<SysRemoteChannelsDO> channels = new ArrayList<SysRemoteChannelsDO>();
				for (SysInstallPlaceDO installx : installs) {
					SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
							installx.getDevId()).getModule();
					if (null != channel) {
						SysRemoteHostsDO host = sysRemoteHostsService
								.querySysRemoteHostsById(channel.getRemoteHostId()).getModule();
						if (null != host) {
							channel.setHost(host);
							List<SysServersDO> servers = new ArrayList<SysServersDO>();
							if (StringUtils.isNoneBlank(host.getMediaServer1Id())) {
								SysServersDO server = sysServersService.querySysServersById(host.getMediaServer1Id())
										.getModule();
								if (null != server) {
									servers.add(server);
								}
							}
							if (StringUtils.isNoneBlank(host.getMediaServer2Id())) {
								SysServersDO server = sysServersService.querySysServersById(host.getMediaServer2Id())
										.getModule();
								if (null != server) {
									servers.add(server);
								}
							}
							if (StringUtils.isNoneBlank(host.getMediaServer3Id())) {
								SysServersDO server = sysServersService.querySysServersById(host.getMediaServer3Id())
										.getModule();
								if (null != server) {
									servers.add(server);
								}
							}
							host.setServers(servers);
						}

						channels.add(channel);
					}
				}

				result.setDataObject(channels);
			} else if (type.equals("guard")) {
				List<SysCommPropertiesDO> properties = new ArrayList<SysCommPropertiesDO>();
				for (SysInstallPlaceDO installx : installs) {
					SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(
							installx.getDevId()).getModule();
					if (null != property) {
						SysCommDevicesDO device = sysCommDevicesService
								.querySysCommDevicesById(property.getDevHostId()).getModule();

						if (null != device) {
							property.setDevice(device);

							SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(device.getHostId())
									.getModule();
							if (null != host) {
								property.setHost(host);
							}
						}
					}

					properties.add(property);
				}
				result.setDataObject(properties);
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->getAlarmLinkageDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyAlarm() {
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
			String accountId = getParameter("accountId", "");
			String suggest = getParameter("suggest", "");

			AlarmsDO alarm = alarmsService.queryAlarmsById(id).getModule();
			if (null != alarm) {
				alarm.setDealPerson(accountId);
				if (StringUtils.isNotBlank(suggest)) {
					suggest = URLDecoder.decode(suggest, "UTF-8");
					alarm.setSuggest(suggest);
				}
				alarm.setStatus(1);

				BaseResultDTO resultx = alarmsService.modifyAlarms(alarm);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
			} else {
				result.setSuccess(false);
			}

			result.setDataObject(alarm);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->modifyAlarm:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAlarmsPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<AlarmsDO> page = new Page<AlarmsDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);
			String type = getParameter("type", "");

			QueryAlarmsBO query = new QueryAlarmsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(type)) {
				query.setSearchType("alarms");
			}
			query.setDateStr(DateUtils.getFormatTime(new Date(), "yyyy-MM-dd"));

			BatchResultDTO<AlarmsDO> result = alarmsService.queryAlarmsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			if (CollectionUtils.isNotEmpty(result.getModule())) {
				for (AlarmsDO alarm : result.getModule()) {
					if (null != alarm.getDeviceId() && null != alarm.getDeviceType()) {
						QuerySysInstallPlaceBO queryx = new QuerySysInstallPlaceBO();
						queryx.setDevId(alarm.getDeviceId());
						queryx.setType(alarm.getDeviceType());
						List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(queryx)
								.getModule();
						if (CollectionUtils.isNotEmpty(installs)) {
							SysInstallPlaceDO install = installs.get(0);
							// 报警设备位置
							alarm.setInstall(install);
						}
					}
				}
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("HomePageAction-->queryAlarmsPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	private boolean whetherLegal() {
		boolean result = true;
		String keyx = getParameter("key", "");
		if (StringUtils.isBlank(keyx)) {
			result = false;
		} else {
			if (!key.containsValue(keyx)) {
				result = false;
			}
			if (!Base64Utils.decodeToken(keyx).equals("WB-SQ-DJ-HP2017")) {
				result = false;
			}
		}
		return result;
	}

	public void getDeviceInfo() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
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

			Integer type = getParameter("type", 0);
			if (type <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			// 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防
			if (type == 1 || type == 2 || type == 3) {
				SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(devId).getModule();
				if (null != channel) {
					SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(channel.getRemoteHostId())
							.getModule();
					if (null != host) {
						channel.setHost(host);

						List<SysServersDO> servers = new ArrayList<SysServersDO>();
						if (StringUtils.isNoneBlank(host.getMediaServer1Id())) {
							SysServersDO server = sysServersService.querySysServersById(host.getMediaServer1Id())
									.getModule();
							if (null != server) {
								servers.add(server);
							}
						}
						if (StringUtils.isNoneBlank(host.getMediaServer2Id())) {
							SysServersDO server = sysServersService.querySysServersById(host.getMediaServer2Id())
									.getModule();
							if (null != server) {
								servers.add(server);
							}
						}
						if (StringUtils.isNoneBlank(host.getMediaServer3Id())) {
							SysServersDO server = sysServersService.querySysServersById(host.getMediaServer3Id())
									.getModule();
							if (null != server) {
								servers.add(server);
							}
						}
						host.setServers(servers);
					}

					result.setDataObject(channel);
				}
			} else if (type == 5 || type == 7) {
				SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(devId).getModule();
				if (null != property) {
					SysCommDevicesDO device = sysCommDevicesService.querySysCommDevicesById(property.getDevHostId())
							.getModule();
					if (null != device) {
						property.setDevice(device);
						SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(device.getHostId()).getModule();
						property.setHost(host);
					}

					result.setDataObject(property);
				}
			} else if (type == 4) {
				SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(devId)
						.getModule();
				if (null != channel) {
					SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(channel.getHostId())
							.getModule();
					if (null != host) {
						channel.setHost(host);
					}

					result.setDataObject(channel);
				}
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->getDeviceInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－－－－－－视屏播放 侧栏获取通道－－－－－－－－－－－－－－ */
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

			Integer type = getParameter("type", 0);
			if (type <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			QuerySysDeviceAreaBO query = new QuerySysDeviceAreaBO();
			query.setAreaId(areaId);
			query.setType(type);

			List<SysDeviceAreaDO> devices = sysDeviceAreaService.querySysDeviceAreaList(query).getModule();
			if (CollectionUtils.isNotEmpty(devices)) {
				// 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防
				if (type == 1 || type == 2 || type == 3) {
					List<SysRemoteChannelsDO> channels = new ArrayList<SysRemoteChannelsDO>();
					for (SysDeviceAreaDO area : devices) {
						SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
								area.getDevId()).getModule();
						if (null != channel) {
							SysRemoteHostsDO host = sysRemoteHostsService.querySysRemoteHostsById(
									channel.getRemoteHostId()).getModule();
							if (null != host) {
								List<SysServersDO> servers = new ArrayList<SysServersDO>();
								if (StringUtils.isNoneBlank(host.getMediaServer1Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer1Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								if (StringUtils.isNoneBlank(host.getMediaServer2Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer2Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								if (StringUtils.isNoneBlank(host.getMediaServer3Id())) {
									SysServersDO server = sysServersService.querySysServersById(
											host.getMediaServer3Id()).getModule();
									if (null != server) {
										servers.add(server);
									}
								}
								host.setServers(servers);

								channel.setHost(host);
							}

							channels.add(channel);
						}
					}

					result.setDataObject(channels);
				} else if (type == 5 || type == 7) {
					List<SysCommPropertiesDO> properties = new ArrayList<SysCommPropertiesDO>();
					for (SysDeviceAreaDO area : devices) {
						SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(
								area.getDevId()).getModule();
						if (null != property) {
							SysCommDevicesDO device = sysCommDevicesService.querySysCommDevicesById(
									property.getDevHostId()).getModule();
							if (null != device) {
								property.setDevice(device);
								SysCommHostsDO host = sysCommHostsService.querySysCommHostsById(device.getHostId())
										.getModule();
								property.setHost(host);
							}
							properties.add(property);
						}
					}

					result.setDataObject(properties);
				} else if (type == 4) {
					List<SysBroadcastChannelsDO> channels = new ArrayList<SysBroadcastChannelsDO>();
					for (SysDeviceAreaDO area : devices) {
						SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(
								area.getDevId()).getModule();
						if (null != channel) {
							SysBroadcastHostsDO host = sysBroadcastHostsService.querySysBroadcastHostsById(
									channel.getHostId()).getModule();
							if (null != host) {
								channel.setHost(host);
							}

							channels.add(channel);
						}
					}

					result.setDataObject(channels);
				}
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysDeviceAreaAction-->queryAreaDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAlarmsFStatistics() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<AlarmsDO> page = new Page<AlarmsDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			QueryAlarmsBO query = new QueryAlarmsBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			query.setSearchType("statistics");

			String place = getParameter("place", "");
			if (StringUtils.isNotBlank(place)) {
				place = URLDecoder.decode(place, "UTF-8");
				query.setPlace(place);
			}

			Integer type = getParameter("type", 0);
			if (type > 0) {
				query.setType(type);
			}

			String startTime = getParameter("startTime", "");
			if (StringUtils.isNotBlank(startTime)) {
				query.setDateStr(startTime);
			}

			String endTime = getParameter("endTime", "");
			if (StringUtils.isNotBlank(endTime)) {
				query.setDateStrx(endTime);
			}

			BatchResultDTO<AlarmsDO> result = alarmsService.queryAlarmsPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			for (AlarmsDO alarm : result.getModule()) {
				if (StringUtils.isNotBlank(alarm.getDealPerson())) {
					AccountDO account = accountService.queryAccountById(alarm.getDealPerson()).getModule();
					if (null != account) {
						alarm.setDealPerson(account.getName());
					}
				}
				// if (StringUtils.isNotBlank(alarm.getDeviceId())) {
				// QuerySysInstallPlaceBO queryx = new QuerySysInstallPlaceBO();
				// queryx.setDevId(alarm.getDeviceId());
				// queryx.setType(alarm.getDeviceType());
				// List<SysInstallPlaceDO> installs =
				// sysInstallPlaceService.querySysInstallPlaceList(queryx)
				// .getModule();
				// if (CollectionUtils.isNotEmpty(installs)) {
				// AreasDO area =
				// areasService.queryAreasById(installs.get(0).getAreaId()).getModule();
				// alarm.setPlace(area.getName());
				// } else {
				// alarm.setPlace("－");
				// }
				// } else {
				// alarm.setPlace("－");
				// }
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("HomePageAction-->queryAlarmsFStatistics:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void queryAlarmsStatisticsChart() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String searchType = getParameter("searchType", "");
			String date = getParameter("date", "");

			QueryAlarmsBO query = new QueryAlarmsBO();
			if (StringUtils.isBlank(searchType)) {
				result.setSuccess(false);
				responseJsonp(result);
				return;
			}
			query.setSearchType(searchType);

			Integer type = getParameter("type", 0);
			if (type > 0) {
				query.setType(type);
			}
			if (StringUtils.isNotBlank(date)) {
				query.setDateStr(date);
			}

			List<AlarmsDOX> alamrs = alarmsService.queryAlarmsChart(query).getModule();

			result.setSuccess(true);
			result.setDataObject(alamrs);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->queryAlarmsStatisticsChart:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void syncServerDatas() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String funNo = getParameter("funNo", "");
			if (funNo.equals("GetSoftServer")) {
				List<SysServersDO> servers = sysServersService.querySysServersList(new QuerySysServersBO()).getModule();
				if (CollectionUtils.isNotEmpty(servers)) {
					for (SysServersDO server : servers) {
						server = (SysServersDO) SysServerDatasSync.syncDatas(server.getInnerIp(),
								Integer.valueOf(server.getPort()), server);
					}
				}
				result.setDataObject(servers);
			} else if (funNo.equals("HBRemoteHost") || funNo.equals("HBRemoteChannel")
					|| funNo.equals("HBBroadcastHosts") || funNo.equals("HBAuxiliaryDevice")) {
				QuerySysServersBO query = new QuerySysServersBO();
				query.setType(7);// 辅助服务
				List<SysServersDO> servers = sysServersService.querySysServersList(query).getModule();
				if (CollectionUtils.isNotEmpty(servers)) {
					result.setDataObject(SysServerDatasSync.syncDatas(servers.get(0).getInnerIp(),
							Integer.valueOf(servers.get(0).getPort()), funNo));
				}
			}
			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->syncServerDatas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void ctrlEntranceGuard() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}
			String vid = getParameter("vid", "");
			String deviceType = getParameter("deviceType", "");
			String controlValue = getParameter("controlValue", "");

			SysServerDatasSync.ctrlEntranceGuard(sysServersService, vid, deviceType, controlValue);

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->ctrlEntranceGuard:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getAlarmsCount() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			QueryAlarmsBO query = new QueryAlarmsBO();
			query.setDateStr(DateUtils.getFormatTime(new Date(), "yyyy-MM-dd"));
			Integer total = Integer.valueOf(alarmsService.queryAlarmsCount(query).getResultCode());

			query = new QueryAlarmsBO();
			query.setStatus(0);
			query.setDateStr(DateUtils.getFormatTime(new Date(), "yyyy-MM-dd"));
			Integer undo = Integer.valueOf(alarmsService.queryAlarmsCount(query).getResultCode());

			Map<String, Object> map = new HashMap<String, Object>();
			map.put("total", total);
			map.put("undo", undo);

			result.setDataObject(map);
			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->getAlarmsCount:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

}
