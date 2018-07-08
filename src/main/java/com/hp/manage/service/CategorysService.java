package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryCategorysBO;
import com.hp.manage.domain.CategorysDO;

public interface CategorysService {

	public BaseResultDTO createCategorys(CategorysDO category);

	public BaseResultDTO modifyCategorys(CategorysDO category);

	public ResultDTO<CategorysDO> queryCategorysById(String id);

	public BatchResultDTO<CategorysDO> queryCategorysList(QueryCategorysBO query);

	public BatchResultDTO<CategorysDO> queryCategorysPage(QueryCategorysBO query);
}
