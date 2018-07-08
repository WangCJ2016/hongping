package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryPeopleBO;
import com.hp.manage.slv.dao.PeopleDao;
import com.hp.manage.slv.domain.PeopleDO;
import com.hp.manage.slv.service.PeopleService;

@Service("peopleService")
public class PeopleServiceImpl implements PeopleService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private PeopleDao peopleDao;

	@Override
	public ResultDTO<PeopleDO> queryPeopleById(String id) {
		ResultDTO<PeopleDO> result = new ResultDTO<PeopleDO>();
		try {
			PeopleDO people = peopleDao.selectPeopleById(id);
			if (null == people) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV人员不存在！");
				return result;
			}

			result.setModule(people);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV人员失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV人员失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<PeopleDO> queryPeopleList(QueryPeopleBO query) {
		BatchResultDTO<PeopleDO> result = new BatchResultDTO<PeopleDO>();
		try {
			List<PeopleDO> list = peopleDao.selectPeopleList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV人员列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV人员列表失败！");
		}
		return result;
	}

}
