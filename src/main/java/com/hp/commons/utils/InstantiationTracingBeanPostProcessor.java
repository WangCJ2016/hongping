package com.hp.commons.utils;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

import com.hp.manage.bo.QueryPatrolTasksBO;
import com.hp.manage.domain.PatrolTasksDO;
import com.hp.manage.service.PatrolTasksService;

public class InstantiationTracingBeanPostProcessor implements ApplicationListener<ContextRefreshedEvent> {
	@Autowired
	PatrolTasksService patrolTasksService;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
		String JOB_NAME = "TSK";
		String TRIGGER_NAME = "TSKTRG";
		String JOB_GROUP_NAME = "TSK_JOB_GROUP";
		String TRIGGER_GROUP_NAME = "TSKTRG_JOB_GROUP";

		List<PatrolTasksDO> tasks = patrolTasksService.queryPatrolTasksList(new QueryPatrolTasksBO()).getModule();
		if (CollectionUtils.isNotEmpty(tasks)) {
			if (StringUtils.isNotBlank(tasks.get(0).getEndTime()) && !tasks.get(0).getEndTime().equals("-")) {
				String timex = "0" + " " + tasks.get(0).getEndTime().split(":")[1] + " "
						+ tasks.get(0).getEndTime().split(":")[0] + " " + "* * ?";

				QuartzManager.addJob(JOB_NAME, JOB_GROUP_NAME, TRIGGER_NAME, TRIGGER_GROUP_NAME, PatrolTask.class,
						timex);
			}
		}
	}
}
