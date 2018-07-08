package com.hp.commons.utils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import com.hp.manage.bo.QueryPatrolHistoryBO;
import com.hp.manage.bo.QueryPatrolPointsBO;
import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.PatrolHistoryDO;
import com.hp.manage.domain.PatrolPointsDO;
import com.hp.manage.domain.PatrolTasksDO;
import com.hp.manage.service.AlarmsService;
import com.hp.manage.service.PatrolHistoryService;
import com.hp.manage.service.PatrolPointsService;
import com.hp.manage.service.PatrolTasksService;
import com.hp.websocket.server.WebSocketMessageInboundPool;

public class PatrolTask implements Job {
	@Autowired
	PatrolTasksService patrolTasksService;

	@Autowired
	PatrolPointsService patrolPointsService;

	@Autowired
	PatrolHistoryService patrolHistoryService;

	@Autowired
	AlarmsService alarmsService;

	@Override
	public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
		System.out.println("--------patrol--------");
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
		String week = DateUtils.getWeek();

		QueryPatrolTasksBO query = new QueryPatrolTasksBO();
		query.setDay(Integer.valueOf(week));
		List<PatrolTasksDO> tasks = patrolTasksService.queryPatrolTasksList(query).getModule();

		if (CollectionUtils.isNotEmpty(tasks)) {
			PatrolTasksDO task = tasks.get(0);
			if (null != task) {
				QueryPatrolPointsBO queryx = new QueryPatrolPointsBO();
				queryx.setTaskId(task.getId());
				List<PatrolPointsDO> points = patrolPointsService.queryPatrolPointsList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(points)) {
					List<String> pointsx = new ArrayList<String>();// 巡更任务点位集合
					for (PatrolPointsDO point : points) {
						pointsx.add(point.getPoint());
					}

					QueryPatrolHistoryBO queryv = new QueryPatrolHistoryBO();
					queryv.setTimeStr(DateUtils.getFormatTime(new Date(), "yyyy-MM-dd"));
					List<PatrolHistoryDO> histories = patrolHistoryService.queryPatrolHistoryList(queryv).getModule();
					if (CollectionUtils.isNotEmpty(histories)) {// 历史巡更点位
						for (PatrolHistoryDO history : histories) {
							pointsx.remove(history.getPoint());
						}

						if (CollectionUtils.isNotEmpty(pointsx)) {// 历史巡更点位未全部覆盖任务点位
							WebSocketMessageInboundPool.sendMessageToClient("ALARM");

							AlarmsDO alarm = new AlarmsDO();
							alarm.setId(TokenUtil.getInstance().generateID());
							alarm.setEvent("巡更任务：" + task.getTitle() + "未完成");
							alarm.setDegree(1);
							alarm.setTime(new Date());
							alarm.setType(5);
							alarm.setPlace("－");
							alarm.setDevice("－");

							alarmsService.createAlarms(alarm);
						}
					} else {
						WebSocketMessageInboundPool.sendMessageToClient("ALARM");

						AlarmsDO alarm = new AlarmsDO();
						alarm.setId(TokenUtil.getInstance().generateID());
						alarm.setEvent("巡更任务：" + task.getTitle() + "未完成");
						alarm.setDegree(1);
						alarm.setTime(new Date());
						alarm.setType(5);
						alarm.setPlace("－");
						alarm.setDevice("－");

						alarmsService.createAlarms(alarm);
					}
				}
			}
		}
	}
}
