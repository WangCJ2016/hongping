package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.service.AreasService;
import com.hp.manage.slv.bo.QueryDepartmentBO;
import com.hp.manage.slv.bo.QueryPeopleBO;
import com.hp.manage.slv.bo.QueryPositionBO;
import com.hp.manage.slv.bo.QueryRegionBO;
import com.hp.manage.slv.bo.QueryUWBCurrentPositionReportBO;
import com.hp.manage.slv.bo.QueryUWBPositionReportBO;
import com.hp.manage.slv.bo.QueryUWBRegionMapBO;
import com.hp.manage.slv.domain.DepartmentDO;
import com.hp.manage.slv.domain.PeopleDO;
import com.hp.manage.slv.domain.PositionDO;
import com.hp.manage.slv.domain.RegionDO;
import com.hp.manage.slv.domain.UWBCurrentPositionReportDO;
import com.hp.manage.slv.domain.UWBPositionReportDO;
import com.hp.manage.slv.domain.UWBRegionMapDO;
import com.hp.manage.slv.service.AlarmReportService;
import com.hp.manage.slv.service.AlarmTypeService;
import com.hp.manage.slv.service.DepartmentService;
import com.hp.manage.slv.service.PeopleService;
import com.hp.manage.slv.service.PositionService;
import com.hp.manage.slv.service.RankService;
import com.hp.manage.slv.service.RegionService;
import com.hp.manage.slv.service.UWBCurrentPositionReportService;
import com.hp.manage.slv.service.UWBPositionReportService;
import com.hp.manage.slv.service.UWBRegionMapService;
import com.hp.manage.slv.service.UWBRegionReportService;
import com.hp.manage.slv.service.WorkTypeService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sLVAction")
public class SLVAction extends BaseAction {

	private static final long serialVersionUID = -1464377441135895793L;

	@Autowired
	PositionService positionService;// 基站

	@Autowired
	RegionService regionService;// 区域

	@Autowired
	UWBRegionMapService uwbRegionMapService;// 地图

	@Autowired
	UWBCurrentPositionReportService currentPositionService;// 实时位置

	@Autowired
	UWBPositionReportService hisPositionService;// 历史位置

	@Autowired
	UWBRegionReportService uwbRegionReportService;// 历史进出区域

	@Autowired
	PeopleService peopleService;// 人员

	@Autowired
	DepartmentService departmentService;// 部门

	@Autowired
	WorkTypeService workTypeService;// 工种

	@Autowired
	RankService rankService;// 职务

	@Autowired
	AlarmTypeService alarmTypeService;// 报警类型

	@Autowired
	AlarmReportService alarmReportService;// 报警信息

	@Autowired
	AreasService areasService;

	/** －－－－－－－－－人员实时动态－－－－－－－－ */
	public void queryPersonnelDynamics() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<RegionDO> regions = regionService.queryRegionList(new QueryRegionBO()).getModule();
			if (CollectionUtils.isNotEmpty(regions)) {
				for (RegionDO region : regions) {
					QueryAreasBO queryx = new QueryAreasBO();
					queryx.setName(region.getRegionName());
					List<AreasDO> areas = areasService.queryAreasList(queryx).getModule();
					if (CollectionUtils.isNotEmpty(areas)) {
						region.setAreaId(areas.get(0).getId());
					}

					QueryUWBCurrentPositionReportBO query = new QueryUWBCurrentPositionReportBO();
					query.setRegionId(region.getRegionId());
					List<UWBCurrentPositionReportDO> postions = currentPositionService
							.queryUWBCurrentPositionReportListx(query).getModule();

					if (CollectionUtils.isNotEmpty(postions)) {
						Integer personCount = 0;
						for (UWBCurrentPositionReportDO report : postions) {
							PeopleDO people = peopleService.queryPeopleById(report.getPeopleIdEx()).getModule();
							if (null != people) {
								DepartmentDO department = departmentService.queryDepartmentById(people.getDeptId())
										.getModule();
								if (null != department) {
									people.setDepartment(department);
								}

								report.setPeople(people);
								personCount++;
							}
						}

						region.setPersonCount(personCount);
						region.setPostions(postions);
					}
				}
			}

			result.setDataObject(regions);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryPersonnelDynamics:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－部门人员－－－－－－－－ */
	public void queryDepartments() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<DepartmentDO> departments = departmentService.queryDepartmentList(new QueryDepartmentBO()).getModule();
			if (CollectionUtils.isNotEmpty(departments)) {
				for (DepartmentDO department : departments) {
					QueryPeopleBO query = new QueryPeopleBO();
					query.setDeptId(department.getDeptId());
					List<PeopleDO> peoples = peopleService.queryPeopleList(query).getModule();
					if (CollectionUtils.isNotEmpty(peoples)) {
						department.setPeoples(peoples);
						department.setPeopleCount(peoples.size());
					}
				}
			}

			result.setSuccess(true);
			result.setDataObject(departments);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryDepartments:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－人员关键字搜索－－－－－－－－ */
	public void queryPeopleByKeyword() {
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

			QueryPeopleBO query = new QueryPeopleBO();
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				if (name.matches(".*[\u4e00-\u9faf].*")) {
					query.setPeopleName(name);
				} else {
					query.setLinkmanName(name);
				}
			}

			List<PeopleDO> peoples = peopleService.queryPeopleList(query).getModule();

			if (CollectionUtils.isNotEmpty(peoples)) {
				for (PeopleDO people : peoples) {
					DepartmentDO department = departmentService.queryDepartmentById(people.getDeptId()).getModule();
					if (null != department) {
						people.setDepartment(department);
					}

					QueryUWBCurrentPositionReportBO queryx = new QueryUWBCurrentPositionReportBO();
					queryx.setPeopleIdEx(people.getPeopleIdEx());

					List<UWBCurrentPositionReportDO> hisPostions = currentPositionService
							.queryUWBHisPositionsGpByRegion(queryx).getModule();
					if (CollectionUtils.isNotEmpty(hisPostions)) {
						UWBCurrentPositionReportDO postion = hisPostions.get(0);

						QueryRegionBO queryz = new QueryRegionBO();
						queryz.setRegionId(postion.getRegionId());
						List<RegionDO> regions = regionService.queryRegionList(queryz).getModule();
						if (CollectionUtils.isNotEmpty(regions)) {
							QueryAreasBO queryv = new QueryAreasBO();
							queryv.setName(regions.get(0).getRegionName());
							List<AreasDO> areas = areasService.queryAreasList(queryv).getModule();
							if (CollectionUtils.isNotEmpty(areas)) {
								people.setAreaId(areas.get(0).getId());
							}
						}
					}
				}
				result.setDataObject(peoples);
			} else {
				result.setDataObject(new ArrayList<PeopleDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryPeopleByKeyword:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－人员实时轨迹－－－－－－－－ */
	public void queryRealtimeTrajectory() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String peopleIdEx = getParameter("peopleIdEx", "");
			if (StringUtils.isBlank(peopleIdEx)) {
				result.setSuccess(false);
				result.setMsg("请传入人员定位卡号");
				responseJsonp(result);
				return;
			}
			String startTime = getParameter("startTime", "");
			String endTime = getParameter("endTime", "");// 2017-12-17 08:00:00

			QueryUWBCurrentPositionReportBO query = new QueryUWBCurrentPositionReportBO();
			query.setPeopleIdEx(peopleIdEx);
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			List<UWBCurrentPositionReportDO> hisPostions = currentPositionService.queryUWBHisPositionsGpByRegion(query)
					.getModule();
			if (CollectionUtils.isNotEmpty(hisPostions)) {
				for (UWBCurrentPositionReportDO postion : hisPostions) {
					RegionDO region = regionService.queryRegionById(postion.getRegionId()).getModule();
					if (null != region) {
						QueryAreasBO queryx = new QueryAreasBO();
						queryx.setName(region.getRegionName());
						List<AreasDO> areas = areasService.queryAreasList(queryx).getModule();
						if (CollectionUtils.isNotEmpty(areas)) {
							postion.setAreaId(areas.get(0).getId());
						}
						postion.setRegionName(region.getRegionName());
					}
				}
				result.setDataObject(hisPostions);
			} else {
				result.setDataObject(new ArrayList<UWBCurrentPositionReportDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryRealtimeTrajectory:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－人员实时轨迹详情－－－－－－－－ */
	public void queryRealtimeTrajectoryDetail() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String peopleIdEx = getParameter("peopleIdEx", "");
			if (StringUtils.isBlank(peopleIdEx)) {
				result.setSuccess(false);
				result.setMsg("请传入人员定位卡号");
				responseJsonp(result);
				return;
			}

			Integer regionId = getParameter("regionId", -1);
			if (regionId <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String startTime = getParameter("startTime", "");
			String endTime = getParameter("endTime", "");// 2017-12-17 08:00:00

			QueryUWBCurrentPositionReportBO query = new QueryUWBCurrentPositionReportBO();
			query.setPeopleIdEx(peopleIdEx);
			query.setRegionId(regionId);
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			List<UWBCurrentPositionReportDO> hisPostions = currentPositionService.queryUWBCurrentPositionReportList(
					query).getModule();
			if (CollectionUtils.isNotEmpty(hisPostions)) {
				result.setDataObject(hisPostions);
			} else {
				result.setDataObject(new ArrayList<UWBCurrentPositionReportDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryRealtimeTrajectoryDetail:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－人员历史轨迹－－－－－－－－ */
	public void queryPersonnelTrajectory() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String peopleIdEx = getParameter("peopleIdEx", "");
			if (StringUtils.isBlank(peopleIdEx)) {
				result.setSuccess(false);
				result.setMsg("请传入人员定位卡号");
				responseJsonp(result);
				return;
			}
			String startTime = getParameter("startTime", "");
			String endTime = getParameter("endTime", "");// 2017-12-17 08:00:00

			QueryUWBPositionReportBO query = new QueryUWBPositionReportBO();
			query.setPeopleIdEx(peopleIdEx);
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			List<UWBPositionReportDO> hisPostions = hisPositionService.queryUWBHisPositionsGpByRegion(query)
					.getModule();
			if (CollectionUtils.isNotEmpty(hisPostions)) {
				for (UWBPositionReportDO postion : hisPostions) {
					RegionDO region = regionService.queryRegionById(postion.getRegionId()).getModule();
					if (null != region) {
						QueryAreasBO queryx = new QueryAreasBO();
						queryx.setName(region.getRegionName());
						List<AreasDO> areas = areasService.queryAreasList(queryx).getModule();
						if (CollectionUtils.isNotEmpty(areas)) {
							postion.setAreaId(areas.get(0).getId());
						}
						postion.setRegionName(region.getRegionName());
					}
				}
				result.setDataObject(hisPostions);
			} else {
				result.setDataObject(new ArrayList<UWBPositionReportDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryPersonnelTrajectory:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－人员历史轨迹详情－－－－－－－－ */
	public void queryTrajectoryDetail() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String peopleIdEx = getParameter("peopleIdEx", "");
			if (StringUtils.isBlank(peopleIdEx)) {
				result.setSuccess(false);
				result.setMsg("请传入人员定位卡号");
				responseJsonp(result);
				return;
			}

			Integer regionId = getParameter("regionId", -1);
			if (regionId <= -1) {
				result.setSuccess(false);
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String startTime = getParameter("startTime", "");
			String endTime = getParameter("endTime", "");// 2017-12-17 08:00:00

			QueryUWBPositionReportBO query = new QueryUWBPositionReportBO();
			query.setPeopleIdEx(peopleIdEx);
			query.setRegionId(regionId);
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			List<UWBPositionReportDO> hisPostions = hisPositionService.queryUWBPositionReportList(query).getModule();
			if (CollectionUtils.isNotEmpty(hisPostions)) {
				result.setDataObject(hisPostions);
			} else {
				result.setDataObject(new ArrayList<UWBPositionReportDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->queryTrajectorys:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryPositionPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			QueryPositionBO query = new QueryPositionBO();
			BatchResultDTO<PositionDO> resultx = positionService.queryPositionList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				responseJsonp(result);
				return;
			}

			List<PositionDO> positions = new ArrayList<PositionDO>();
			if (CollectionUtils.isNotEmpty(resultx.getModule())) {
				for (PositionDO position : resultx.getModule()) {
					PositionDO positionx = new PositionDO();
					positionx.setCode(position.getPositionIdEx());
					positionx
							.setArea(regionService.queryRegionById(position.getRegionId()).getModule().getRegionName());

					if (StringUtils.isNotBlank(position.getStatus())) {
						positionx.setStatus(position.getStatus());
					} else {
						positionx.setStatus("-");
					}

					positions.add(positionx);
				}
			}

			result.setDataObject(positions);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("HomePageAction-->queryPositionPage:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	/** －－－－－－－－－获取地图尺寸－－－－－－－－ */
	public void getUwbRegionMap() {
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
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}
			QueryRegionBO query = new QueryRegionBO();
			query.setRegionName(name);
			List<RegionDO> regions = regionService.queryRegionList(query).getModule();
			if (CollectionUtils.isNotEmpty(regions)) {
				QueryUWBRegionMapBO queryx = new QueryUWBRegionMapBO();
				queryx.setRegionId(regions.get(0).getRegionId());
				List<UWBRegionMapDO> maps = uwbRegionMapService.queryUWBRegionMapList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(maps)) {
					maps.get(0).setPicture(null);
					result.setDataObject(maps.get(0));
				} else {
					result.setDataObject(new UWBRegionMapDO());
				}
			}

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SLVAction-->getUwbRegionMap:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
