package com.hp.manage.slv.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.slv.bo.QueryDepartmentBO;
import com.hp.manage.slv.domain.DepartmentDO;

@Repository
public interface DepartmentDao {
	public DepartmentDO selectDepartmentById(Integer id);

	public List<DepartmentDO> selectDepartmentList(QueryDepartmentBO query);
}
