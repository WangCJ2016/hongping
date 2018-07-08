package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryDepartmentBO;
import com.hp.manage.slv.dao.DepartmentDao;
import com.hp.manage.slv.domain.DepartmentDO;
import com.hp.manage.slv.service.DepartmentService;

@Service("departmentService")
public class DepartmentServiceImpl implements DepartmentService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private DepartmentDao departmentDao;

	@Override
	public ResultDTO<DepartmentDO> queryDepartmentById(Integer id) {
		ResultDTO<DepartmentDO> result = new ResultDTO<DepartmentDO>();
		try {
			DepartmentDO department = departmentDao.selectDepartmentById(id);
			if (null == department) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV部门不存在！");
				return result;
			}

			result.setModule(department);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV部门失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV部门失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<DepartmentDO> queryDepartmentList(QueryDepartmentBO query) {
		BatchResultDTO<DepartmentDO> result = new BatchResultDTO<DepartmentDO>();
		try {
			List<DepartmentDO> list = departmentDao.selectDepartmentList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV部门列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV部门列表失败！");
		}
		return result;
	}

}
