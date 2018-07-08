package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryCategoryFilesBO;
import com.hp.manage.domain.CategoryFilesDO;

public interface CategoryFilesService {

	public BaseResultDTO createCategoryFiles(CategoryFilesDO file);

	public BaseResultDTO modifyCategoryFiles(CategoryFilesDO file);

	public ResultDTO<CategoryFilesDO> queryCategoryFilesById(String id);

	public BatchResultDTO<CategoryFilesDO> queryCategoryFilesList(QueryCategoryFilesBO query);

	public BatchResultDTO<CategoryFilesDO> queryCategoryFilesPage(QueryCategoryFilesBO query);
}
