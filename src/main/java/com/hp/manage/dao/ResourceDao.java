package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryResourceBO;
import com.hp.manage.domain.ResourceDO;

@Repository
public interface ResourceDao {

	public int insertResource(ResourceDO resource);

	public int updateResource(ResourceDO resource);

	public ResourceDO selectResourceById(String id);

	public List<ResourceDO> selectResourceList(QueryResourceBO query);

	public int selectResourceCount(QueryResourceBO query);

	public List<ResourceDO> selectResourcePage(QueryResourceBO query);
}
