package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryCategorysBO;
import com.hp.manage.dao.CategorysDao;
import com.hp.manage.domain.CategorysDO;
import com.hp.manage.service.CategorysService;

@Service("categorysService")
public class CategorysServiceImpl implements CategorysService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private CategorysDao categorysDao;

	@Override
	@Transactional
	public BaseResultDTO createCategorys(CategorysDO category) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QueryCategorysBO query = new QueryCategorysBO();
			query.setCategory(category.getCategory());
			int count = categorysDao.selectCategorysCount(query);
			if (count > 0) {
				result.setSuccess(false);
				result.setErrorDetail("目录：" + category.getCategory() + "已存在！");
				return result;
			}

			int num = categorysDao.insertCategorys(category);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加目录失败！");
			}

		} catch (Exception e) {
			logger.error("添加目录失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加目录失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyCategorys(CategorysDO category) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = categorysDao.updateCategorys(category);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改目录失败！");
			}
		} catch (Exception e) {
			logger.error("修改目录失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改目录失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<CategorysDO> queryCategorysById(String id) {
		ResultDTO<CategorysDO> result = new ResultDTO<CategorysDO>();
		try {
			CategorysDO category = categorysDao.selectCategorysById(id);
			if (null == category) {
				result.setSuccess(false);
				result.setErrorDetail("该目录不存在！");
				return result;
			}

			result.setModule(category);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CategorysDO> queryCategorysList(QueryCategorysBO query) {
		BatchResultDTO<CategorysDO> result = new BatchResultDTO<CategorysDO>();
		try {
			List<CategorysDO> list = categorysDao.selectCategorysList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CategorysDO> queryCategorysPage(QueryCategorysBO query) {
		BatchResultDTO<CategorysDO> result = new BatchResultDTO<CategorysDO>();
		try {
			int record = categorysDao.selectCategorysCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<CategorysDO> list = categorysDao.selectCategorysPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<CategorysDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录失败！");
		}
		return result;
	}
}
