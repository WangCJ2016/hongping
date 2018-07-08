package com.hp.manage.slv.service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryDepartmentBO;
import com.hp.manage.slv.domain.DepartmentDO;

public interface DepartmentService {
	public ResultDTO<DepartmentDO> queryDepartmentById(Integer id);

	public BatchResultDTO<DepartmentDO> queryDepartmentList(QueryDepartmentBO query);
}
