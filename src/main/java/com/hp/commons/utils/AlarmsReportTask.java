package com.hp.commons.utils;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.hp.manage.bo.QueryAlarmsBO;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.domain.AlarmsDO;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.service.AlarmsService;
import com.hp.manage.service.AreasService;
import com.hp.manage.slv.bo.QueryAlarmTypeBO;
import com.hp.manage.slv.bo.QueryUWBCurrentAlarmReportBO;
import com.hp.manage.slv.domain.AlarmTypeDO;
import com.hp.manage.slv.domain.RegionDO;
import com.hp.manage.slv.domain.UWBCurrentAlarmReportDO;
import com.hp.manage.slv.service.AlarmTypeService;
import com.hp.manage.slv.service.RegionService;
import com.hp.manage.slv.service.UWBCurrentAlarmReportService;
import com.hp.websocket.server.WebSocketMessageInboundPool;

public class AlarmsReportTask {
	@Autowired
	UWBCurrentAlarmReportService calarmReportService;

	@Autowired
	AlarmTypeService alarmTypeService;// 报警类型

	@Autowired
	AlarmsService alarmsService;

	@Autowired
	RegionService regionService;

	@Autowired
	AreasService areasService;

	public void alarmsReport() {
		QueryAlarmTypeBO query = new QueryAlarmTypeBO();
		query.setAlarmName("电子围栏报警");
		List<AlarmTypeDO> types = alarmTypeService.queryAlarmTypeList(query).getModule();
		if (CollectionUtils.isNotEmpty(types)) {
			AlarmTypeDO type = types.get(0);

			if (null != type) {
				QueryUWBCurrentAlarmReportBO queryx = new QueryUWBCurrentAlarmReportBO();
				queryx.setAlarmType(type.getAlarmType());
				List<UWBCurrentAlarmReportDO> reports = calarmReportService.queryUWBCurrentAlarmReportList(queryx)
						.getModule();
				if (CollectionUtils.isNotEmpty(reports)) {
					for (UWBCurrentAlarmReportDO report : reports) {
						RegionDO region = regionService.queryRegionById(Integer.valueOf(report.getAlarmParam1()))
								.getModule();
						if (null != region) {
							QueryAlarmsBO queryz = new QueryAlarmsBO();
							queryz.setEvent("电子围栏报警");
							queryz.setPlace(region.getRegionName());
							queryz.setSlvPersonId(report.getAlarmParam2());
							queryz.setDateStr(DateUtils.getFormatTime(report.getFirstReportTime(), "yyyy-MM-dd HH:mm"));

							List<AlarmsDO> alarms = alarmsService.queryAlarmsList(queryz).getModule();
							if (CollectionUtils.isEmpty(alarms)) {

								QueryAreasBO queryv = new QueryAreasBO();
								queryv.setName(region.getRegionName());
								List<AreasDO> areas = areasService.queryAreasList(queryv).getModule();
								if (CollectionUtils.isNotEmpty(areas)) {
									AreasDO area = areas.get(0);

									AlarmsDO alarm = new AlarmsDO();
									alarm.setId(TokenUtil.getInstance().generateID());
									alarm.setEvent("电子围栏报警");
									alarm.setDegree(2);
									alarm.setPlace(region.getRegionName());
									alarm.setTime(report.getFirstReportTime());
									alarm.setType(6);
									alarm.setDeviceType(6);
									alarm.setSlvAreaId(area.getId());
									alarm.setSlvPersonId(report.getAlarmParam2());

									alarmsService.createAlarms(alarm);

									WebSocketMessageInboundPool.sendMessageToClient("ALARM");
								}
							}
						}
					}
				}
			}
		}
	}
}
