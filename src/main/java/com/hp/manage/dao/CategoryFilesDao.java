package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryCategoryFilesBO;
import com.hp.manage.domain.CategoryFilesDO;

@Repository
public interface CategoryFilesDao {

	public int insertCategoryFiles(CategoryFilesDO file);

	public int updateCategoryFiles(CategoryFilesDO file);

	public CategoryFilesDO selectCategoryFilesById(String id);

	public List<CategoryFilesDO> selectCategoryFilesList(QueryCategoryFilesBO query);

	public int selectCategoryFilesCount(QueryCategoryFilesBO query);

	public List<CategoryFilesDO> selectCategoryFilesPage(QueryCategoryFilesBO query);

}
