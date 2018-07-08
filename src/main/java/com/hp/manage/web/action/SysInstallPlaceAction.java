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
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.bo.QuerySysInstallPlaceBO;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.domain.SysBroadcastChannelsDO;
import com.hp.manage.domain.SysCommPropertiesDO;
import com.hp.manage.domain.SysDeviceAreaDO;
import com.hp.manage.domain.SysInstallPlaceDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.service.AreasService;
import com.hp.manage.service.SysBroadcastChannelsService;
import com.hp.manage.service.SysCommPropertiesService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.service.SysInstallPlaceService;
import com.hp.manage.service.SysRemoteChannelsService;
import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.bo.QueryUWBCurrentPositionReportBO;
import com.hp.manage.slv.domain.DepartmentDO;
import com.hp.manage.slv.domain.PeopleDO;
import com.hp.manage.slv.domain.RegionDO;
import com.hp.manage.slv.domain.UWBCurrentPositionReportDO;
import com.hp.manage.slv.service.DepartmentService;
import com.hp.manage.slv.service.PeopleService;
import com.hp.manage.slv.service.RegionService;
import com.hp.manage.slv.service.UWBCurrentPositionReportService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysInstallPlaceAction")
public class SysInstallPlaceAction extends BaseAction {
	/** －－－－－－－－－－－－－－设备安装位置管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysInstallPlaceService sysInstallPlaceService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	@Autowired
	SysRemoteChannelsService sysRemoteChannelsService;

	@Autowired
	SysCommPropertiesService sysCommPropertiesService;

	@Autowired
	SysBroadcastChannelsService sysBroadcastChannelsService;

	@Autowired
	RegionService regionService;

	@Autowired
	UWBCurrentPositionReportService currentPositionService;// 实时位置

	@Autowired
	PeopleService peopleService;

	@Autowired
	DepartmentService departmentService;

	@Autowired
	AreasService areasService;

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
			query.setStatus(0);
			BatchResultDTO<SysDeviceAreaDO> resultx = sysDeviceAreaService.querySysDeviceAreaList(query);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}

			for (SysDeviceAreaDO device : resultx.getModule()) {
				Integer type = device.getType();
				// 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防
				if (type == 1 || type == 2 || type == 3) {
					SysRemoteChannelsDO channel = sysRemoteChannelsService
							.querySysRemoteChannelsById(device.getDevId()).getModule();
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

			result.setDataObject(resultx.getModule());
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysInstallPlaceAction-->queryAreaDevices:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAreaBindAreas() {
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

			QueryAreasBO queryx = new QueryAreasBO();
			queryx.setParentId(areaId);
			List<AreasDO> areas = areasService.queryAreasList(queryx).getModule();

			List<AreasDO> areasx = new ArrayList<AreasDO>();
			if (CollectionUtils.isNotEmpty(areas)) {
				for (AreasDO area : areas) {
					areasx.add(area);
				}

				QuerySysInstallPlaceBO query = new QuerySysInstallPlaceBO();
				query.setType(10);
				List<SysInstallPlaceDO> installs = sysInstallPlaceService.querySysInstallPlaceList(query).getModule();
				if (CollectionUtils.isNotEmpty(installs)) {
					for (AreasDO area : areas) {
						for (SysInstallPlaceDO install : installs) {
							if (area.getId().equals(install.getDevId())) {
								areasx.remove(area);
							}
						}
					}
				}
			}

			result.setDataObject(areasx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysInstallPlaceAction-->queryAreaBindAreas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysInstallPlace() {
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

			String x = getParameter("x", "");
			if (StringUtils.isBlank(x)) {
				result.setSuccess(false);
				result.setMsg("请传入x坐标");
				responseJsonp(result);
				return;
			}

			String y = getParameter("y", "");
			if (StringUtils.isBlank(y)) {
				result.setSuccess(false);
				result.setMsg("请传入y坐标");
				responseJsonp(result);
				return;
			}

			BaseResultDTO resultz = sysInstallPlaceService.deleteSysIntPlace(areaId);
			if (resultz.isSuccess()) {
				List<SysDeviceAreaDO> deviceAreas = new ArrayList<SysDeviceAreaDO>();

				SysDeviceAreaDO deviceAreax = new SysDeviceAreaDO();
				deviceAreax.setStatus(0);
				deviceAreax.setAreaId(areaId);
				deviceAreax.setModifyUserId(accountId);
				deviceAreas.add(deviceAreax);

				resultz = sysDeviceAreaService.batchModifySysDeviceArea(deviceAreas);

				if (resultz.isSuccess()) {
					List<SysInstallPlaceDO> places = new ArrayList<SysInstallPlaceDO>();

					String[] devIdsx = devIds.split(",");
					String[] typesx = types.split(",");
					String[] xs = x.split(",");
					String[] ys = y.split(",");

					for (int i = 0; i < devIdsx.length; i++) {
						SysInstallPlaceDO place = new SysInstallPlaceDO();
						place.setId(TokenUtil.getInstance().generateID());
						place.setAreaId(areaId);
						place.setDevId(devIdsx[i]);
						place.setType(Integer.valueOf(typesx[i]));
						place.setX(xs[i]);
						place.setY(ys[i]);
						place.setCreateUserId(accountId);

						places.add(place);

						SysDeviceAreaDO deviceArea = new SysDeviceAreaDO();
						deviceArea.setStatus(1);
						deviceArea.setAreaId(areaId);
						deviceArea.setDevId(devIdsx[i]);
						deviceArea.setModifyUserId(accountId);
						deviceAreas.add(deviceArea);
					}

					BaseResultDTO resultx = sysInstallPlaceService.batchCreateSysIntPlace(places);
					if (!resultx.isSuccess()) {
						result.setSuccess(false);
						result.setMsg(resultx.getErrorDetail());
					}

					resultx = sysDeviceAreaService.batchModifySysDeviceArea(deviceAreas);
					if (!resultx.isSuccess()) {
						result.setSuccess(false);
						result.setMsg(resultx.getErrorDetail());
					}
				}
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysInstallPlaceAction-->createSysInstallPlace:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysInstallPlace() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String ids = getParameter("ids", "");
			if (StringUtils.isBlank(ids)) {
				result.setSuccess(false);
				result.setMsg("请传入ID");
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

			String x = getParameter("x", "");
			String y = getParameter("y", "");

			String type = getParameter("type", "");

			List<SysInstallPlaceDO> places = new ArrayList<SysInstallPlaceDO>();
			List<SysDeviceAreaDO> deviceAreas = new ArrayList<SysDeviceAreaDO>();
			if (type.equals("delete")) {
				String[] idsx = ids.split(",");
				for (int i = 0; i < idsx.length; i++) {
					SysInstallPlaceDO install = sysInstallPlaceService.querySysInstallPlaceById(idsx[i]).getModule();
					install.setIsDelete(1);
					install.setModifyUserId(accountId);
					places.add(install);

					SysDeviceAreaDO deviceArea = new SysDeviceAreaDO();
					deviceArea.setStatus(0);
					deviceArea.setAreaId(install.getAreaId());
					deviceArea.setDevId(install.getDevId());
					deviceArea.setModifyUserId(accountId);
					deviceAreas.add(deviceArea);
				}
				BaseResultDTO resultx = sysInstallPlaceService.batchModifySysIntPlace(places);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}

				resultx = sysDeviceAreaService.batchModifySysDeviceArea(deviceAreas);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
			} else if (type.equals("modify")) {
				String[] idsx = ids.split(",");
				String[] xs = x.split(",");
				String[] ys = y.split(",");

				for (int i = 0; i < idsx.length; i++) {
					SysInstallPlaceDO place = new SysInstallPlaceDO();
					place.setId(idsx[i]);
					place.setX(xs[i]);
					place.setY(ys[i]);
					place.setModifyUserId(accountId);
					places.add(place);
				}

				BaseResultDTO resultx = sysInstallPlaceService.batchModifySysIntPlace(places);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysInstallPlaceAction-->modifySysInstallPlace:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysInstallPlaces() {
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

			QuerySysInstallPlaceBO query = new QuerySysInstallPlaceBO();
			query.setAreaId(areaId);
			List<SysInstallPlaceDO> places = sysInstallPlaceService.querySysInstallPlaceList(query).getModule();
			if (CollectionUtils.isNotEmpty(places)) {
				for (SysInstallPlaceDO install : places) {
					Integer type = install.getType();
					// 1 视频 2 红外 3 道闸 4 广播 5 门禁 6 人员 7 消防
					if (type == 1 || type == 2 || type == 3) {
						SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
								install.getDevId()).getModule();
						if (null != channel) {
							install.setDevName(channel.getName());
							install.setDevIcon(channel.getIcon());
							install.setIndex(channel.getIndex());
						}
					} else if (type == 5 || type == 7) {
						SysCommPropertiesDO property = sysCommPropertiesService.querySysCommPropertiesById(
								install.getDevId()).getModule();
						if (null != property) {
							install.setDevName(property.getName());
							install.setDevIcon(property.getIcon());
						}
					} else if (type == 4) {
						SysBroadcastChannelsDO channel = sysBroadcastChannelsService.querySysBroadcastChannelsById(
								install.getDevId()).getModule();
						if (null != channel) {
							install.setDevName(channel.getName());
							install.setDevIcon(channel.getIcon());
							install.setIndex(channel.getIndex());
						}
					} else if (type == 10) {
						AreasDO area = areasService.queryAreasById(install.getDevId()).getModule();
						if (null != area) {
							install.setDevName(area.getName());
						}
					}
				}

				Map<String, Object> map = getPersons(areaId, places);
				result.setDataObject(map);
			} else {
				Map<String, Object> map = getPersons(areaId, new ArrayList<SysInstallPlaceDO>());
				result.setDataObject(map);
			}

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysInstallPlaceAction-->querySysInstallPlaces:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public Map<String, Object> getPersons(String areaId, List<SysInstallPlaceDO> installs) {
		Map<String, Object> map = new HashMap<String, Object>();
		// 区域人员
		QueryRegionBO queryz = new QueryRegionBO();
		queryz.setRegionName(areasService.queryAreasById(areaId).getModule().getName());

		// try {
		// Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		//
		// DriverManager.setLoginTimeout(1);
		// Connection conn = DriverManager.getConnection(
		// "jdbc:sqlserver://192.168.0.1:1433;databaseName=KJ07", "sa",
		// "654321");
		// conn.close();
		// } catch (Exception e) {
		// map.put("devices", places);
		// result.setDataObject(map);
		// responseJsonp(result);
		// return;
		// }

		List<RegionDO> regions = regionService.queryRegionList(queryz).getModule();
		if (CollectionUtils.isNotEmpty(regions)) {
			RegionDO region = regions.get(0);
			QueryUWBCurrentPositionReportBO queryx = new QueryUWBCurrentPositionReportBO();
			queryx.setRegionId(region.getRegionId());
			List<UWBCurrentPositionReportDO> postions = currentPositionService.queryUWBCurrentPositionReportListx(
					queryx).getModule();

			if (CollectionUtils.isNotEmpty(postions)) {
				map.put("personCount", postions.size());
				for (UWBCurrentPositionReportDO report : postions) {
					SysInstallPlaceDO install = new SysInstallPlaceDO();
					install.setType(6);
					install.setRegionId(region.getRegionId());
					install.setX(String.valueOf(report.getLocationX()));
					install.setY(String.valueOf(report.getLocationY()));

					PeopleDO people = peopleService.queryPeopleById(report.getPeopleIdEx()).getModule();
					if (null != people) {
						install.setPeopleIdEx(people.getPeopleIdEx());
						install.setName(people.getPeopleName());
						install.setTelephone(people.getPhone());

						DepartmentDO department = departmentService.queryDepartmentById(people.getDeptId()).getModule();
						if (null != department) {
							install.setDepartment(department.getDeptName());
						}
					}

					installs.add(install);
				}
			} else {
				map.put("personCount", 0);
			}
		}
		map.put("devices", installs);
		return map;
	}
}
