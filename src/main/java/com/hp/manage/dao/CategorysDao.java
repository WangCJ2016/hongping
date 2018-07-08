package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryCategorysBO;
import com.hp.manage.domain.CategorysDO;

@Repository
public interface CategorysDao {

	public int insertCategorys(CategorysDO category);

	public int updateCategorys(CategorysDO category);

	public CategorysDO selectCategorysById(String id);

	public List<CategorysDO> selectCategorysList(QueryCategorysBO query);

	public int selectCategorysCount(QueryCategorysBO query);

	public List<CategorysDO> selectCategorysPage(QueryCategorysBO query);

}
