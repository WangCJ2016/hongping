package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryAlarmTypeBO;
import com.hp.manage.slv.domain.AlarmTypeDO;

@Repository
public interface AlarmTypeDao {
	public AlarmTypeDO selectAlarmTypeById(Integer id);

	public List<AlarmTypeDO> selectAlarmTypeList(QueryAlarmTypeBO query);
}
