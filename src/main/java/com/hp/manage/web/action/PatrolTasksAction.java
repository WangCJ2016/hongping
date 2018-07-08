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
import com.hp.commons.utils.DateUtils;
import com.hp.commons.utils.PatrolTask;
import com.hp.commons.utils.QuartzManager;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryPatrolHistoryBO;
import com.hp.manage.bo.QueryPatrolPointsBO;
import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.domain.PatrolHistoryDO;
import com.hp.manage.domain.PatrolPointsDO;
import com.hp.manage.domain.PatrolTasksDO;
import com.hp.manage.service.PatrolHistoryService;
import com.hp.manage.service.PatrolPointsService;
import com.hp.manage.service.PatrolTasksService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("patrolTasksAction")
public class PatrolTasksAction extends BaseAction {
	/** －－－－－－－－－－－－－－巡更管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	PatrolTasksService patrolTasksService;

	@Autowired
	PatrolPointsService patrolPointsService;

	@Autowired
	PatrolHistoryService patrolHistoryService;

	public void getPatrolTasksInfo() {
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
				result.setMsg("请传入巡更任务ID");
				responseJsonp(result);
				return;
			}

			PatrolTasksDO task = patrolTasksService.queryPatrolTasksById(id).getModule();
			if (null != task) {
				result.setDataObject(task);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->getPatrolTasksInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createPatrolTasks() {
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

			String title = getParameter("title", "");
			if (StringUtils.isNotBlank(title)) {
				title = URLDecoder.decode(title, "UTF-8");
			}

			Integer day = getParameter("day", 1);

			String endTime = getParameter("endTime", "");

			PatrolTasksDO task = new PatrolTasksDO();
			task.setId(TokenUtil.getInstance().generateID());
			task.setDay(day);
			task.setTitle(title);
			task.setEndTime(endTime);
			task.setCreateUserId(accountId);

			BaseResultDTO resultx = patrolTasksService.createPatrolTasks(task);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(task);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->createPatrolTasks:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyPatrolTasks() {
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
				result.setMsg("请传入巡更任务ID");
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

			String title = getParameter("title", "");
			if (StringUtils.isNotBlank(title)) {
				title = URLDecoder.decode(title, "UTF-8");
			}

			Integer day = getParameter("day", 1);
			String endTime = getParameter("endTime", "");

			Integer isDelete = getParameter("isDelete", 0);

			PatrolTasksDO task = patrolTasksService.queryPatrolTasksById(id).getModule();
			task.setModifyUserId(accountId);
			if (isDelete > 0) {
				QueryPatrolPointsBO query = new QueryPatrolPointsBO();
				query.setTaskId(id);
				List<PatrolPointsDO> points = patrolPointsService.queryPatrolPointsList(query).getModule();
				if (CollectionUtils.isNotEmpty(points)) {
					result.setSuccess(false);
					result.setMsg("该巡更任务已关联点位，无法删除！");
					responseJsonp(result);
					return;
				}

				task.setIsDelete(isDelete);
			} else {
				QueryPatrolTasksBO query = null;
				if (!task.getTitle().equals(title)) {
					query = new QueryPatrolTasksBO();
					query.setTitle(title);

					List<PatrolTasksDO> tasks = patrolTasksService.queryPatrolTasksList(query).getModule();
					if (CollectionUtils.isNotEmpty(tasks)) {
						result.setSuccess(false);
						result.setMsg("该巡更任务已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				task.setDay(day);
				task.setTitle(title);
				task.setEndTime(endTime);
			}

			BaseResultDTO resultx = patrolTasksService.modifyPatrolTasks(task);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			if (isDelete <= 0) {
				result.setDataObject(task);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->modifyPatrolTasks:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryPatrolTasks() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<PatrolTasksDO> tasks = patrolTasksService.queryPatrolTasksList(new QueryPatrolTasksBO()).getModule();
			if (null != tasks) {
				result.setDataObject(tasks);
			} else {
				result.setDataObject(new ArrayList<PatrolTasksDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->queryPatrolTasks:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void getPatrolPointsInfo() {
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
				result.setMsg("请传入巡更点位ID");
				responseJsonp(result);
				return;
			}

			PatrolPointsDO task = patrolPointsService.queryPatrolPointsById(id).getModule();
			if (null != task) {
				result.setDataObject(task);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->getPatrolPointsInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createPatrolPoints() {
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

			String taskId = getParameter("taskId", "");
			if (StringUtils.isBlank(taskId)) {
				result.setSuccess(false);
				result.setMsg("请传入任务ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			String pointx = getParameter("point", "");

			String remark = getParameter("remark", "");
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			PatrolPointsDO point = new PatrolPointsDO();
			point.setId(TokenUtil.getInstance().generateID());
			point.setTaskId(taskId);
			point.setName(name);
			point.setPoint(pointx);
			point.setRemark(remark);

			point.setCreateUserId(accountId);

			BaseResultDTO resultx = patrolPointsService.createPatrolPoints(point);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(point);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->createPatrolPoints:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyPatrolPoints() {
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
				result.setMsg("请传入巡更点位ID");
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

			String taskId = getParameter("taskId", "");

			String pointx = getParameter("point", "");

			String remark = getParameter("remark", "");
			if (StringUtils.isNotBlank(remark)) {
				remark = URLDecoder.decode(remark, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", 0);

			PatrolPointsDO point = patrolPointsService.queryPatrolPointsById(id).getModule();
			point.setModifyUserId(accountId);
			if (isDelete > 0) {
				point.setIsDelete(isDelete);
			} else {
				QueryPatrolPointsBO query = new QueryPatrolPointsBO();
				if (!point.getName().equals(name)) {
					query.setName(name);

					List<PatrolPointsDO> Points = patrolPointsService.queryPatrolPointsList(query).getModule();
					if (CollectionUtils.isNotEmpty(Points)) {
						result.setSuccess(false);
						result.setMsg("该巡更点位已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				point.setTaskId(taskId);
				point.setName(name);
				point.setPoint(pointx);
				point.setRemark(remark);
			}

			BaseResultDTO resultx = patrolPointsService.modifyPatrolPoints(point);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			if (isDelete <= 0) {
				result.setDataObject(point);
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->modifyPatrolPoints:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryPatrolPoints() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String taskId = getParameter("taskId", "");
			if (StringUtils.isBlank(taskId)) {
				result.setSuccess(false);
				result.setMsg("请传入任务ID");
				responseJsonp(result);
				return;
			}

			QueryPatrolPointsBO query = new QueryPatrolPointsBO();
			query.setTaskId(taskId);
			List<PatrolPointsDO> points = patrolPointsService.queryPatrolPointsList(query).getModule();
			if (null != points) {
				result.setDataObject(points);
			} else {
				result.setDataObject(new ArrayList<PatrolPointsDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->queryPatrolPoints:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createPatrolHistorys() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String times = getParameter("times", "");
			if (StringUtils.isBlank(times)) {
				result.setSuccess(false);
				result.setMsg("请传入时间");
				responseJsonp(result);
				return;
			}

			String points = getParameter("points", "");
			if (StringUtils.isBlank(points)) {
				result.setSuccess(false);
				result.setMsg("请传入点位");
				responseJsonp(result);
				return;
			}

			String[] timesx = times.split(",");
			String[] pointsx = points.split(",");

			List<PatrolHistoryDO> historys = new ArrayList<PatrolHistoryDO>();
			for (int i = 0; i < timesx.length; i++) {
				PatrolHistoryDO hsitory = new PatrolHistoryDO();
				hsitory.setId(TokenUtil.getInstance().generateID());
				hsitory.setTime(DateUtils.getFormatDate(timesx[i], "yyyy-MM-dd HH:mm:ss"));
				hsitory.setPoint(pointsx[i]);

				historys.add(hsitory);
			}

			if (CollectionUtils.isNotEmpty(historys)) {
				BaseResultDTO resultx = patrolHistoryService.batchCreatePatrolHistory(historys);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
				result.setDataObject(historys);
			} else {
				result.setSuccess(false);
				result.setDataObject(new ArrayList<PatrolHistoryDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->createPatrolHistorys:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryPatrolHistoryPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<PatrolHistoryDO> page = new Page<PatrolHistoryDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			QueryPatrolHistoryBO query = new QueryPatrolHistoryBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);

			String startTime = getParameter("startTime", "");
			if (StringUtils.isNotBlank(startTime)) {
				query.setStartTime(startTime);
			}

			String endTime = getParameter("endTime", "");
			if (StringUtils.isNotBlank(endTime)) {
				query.setEndTime(endTime);
			}

			BatchResultDTO<PatrolHistoryDO> result = patrolHistoryService.queryPatrolHistoryPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("SysServersAction-->queryPatrolHistoryPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void getPatrolTaskTime() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			List<PatrolTasksDO> tasks = patrolTasksService.queryPatrolTasksList(new QueryPatrolTasksBO()).getModule();
			if (CollectionUtils.isNotEmpty(tasks)) {
				if (StringUtils.isNotBlank(tasks.get(0).getEndTime())) {
					result.setDataObject(tasks.get(0).getEndTime());
				} else {
					result.setDataObject("-");
				}
			} else {
				result.setDataObject("-");
			}

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->getPatrolTaskTime:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void setPatrolTaskTime() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String type = getParameter("type", "");// set modify clear
			String time = getParameter("time", "");

			PatrolTasksDO task = new PatrolTasksDO();
			if (type.equals("set") || type.equals("modify")) {
				if (StringUtils.isBlank(time)) {
					result.setSuccess(false);
					result.setMsg("请传入任务时间");
					responseJsonp(result);
					return;
				}
				task.setEndTime(time);
			} else if (type.equals("clear")) {
				task.setEndTime("-");
			}

			BaseResultDTO resultx = patrolTasksService.modifyPatrolTasksTime(task);
			if (resultx.isSuccess()) {
				String JOB_NAME = "TSK";
				String TRIGGER_NAME = "TSKTRG";
				String JOB_GROUP_NAME = "TSK_JOB_GROUP";
				String TRIGGER_GROUP_NAME = "TSKTRG_JOB_GROUP";

				String timex = "";
				if (!task.getEndTime().equals("-")) {
					timex = "0" + " " + task.getEndTime().split(":")[1] + " " + task.getEndTime().split(":")[0] + " "
							+ "* * ?";
				}
				if (type.equals("set")) {
					QuartzManager.addJob(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME, PatrolTask.class,
							timex);
				} else if (type.equals("modify")) {
					QuartzManager.modifyJobTime(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME, timex);
				} else if (type.equals("clear")) {
					QuartzManager.removeJob(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME);
				}
			}

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("PatrolTasksAction-->setPatrolTaskTime:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
