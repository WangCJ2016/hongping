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
import com.hp.manage.bo.QueryCategoryFilesBO;
import com.hp.manage.dao.CategoryFilesDao;
import com.hp.manage.domain.CategoryFilesDO;
import com.hp.manage.service.CategoryFilesService;

@Service("categoryFilesService")
public class CategoryFilesServiceImpl implements CategoryFilesService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private CategoryFilesDao categoryFilesDao;

	@Override
	@Transactional
	public BaseResultDTO createCategoryFiles(CategoryFilesDO file) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = categoryFilesDao.insertCategoryFiles(file);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加目录文件失败！");
			}

		} catch (Exception e) {
			logger.error("添加目录文件失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加目录文件失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyCategoryFiles(CategoryFilesDO file) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = categoryFilesDao.updateCategoryFiles(file);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改目录文件失败！");
			}
		} catch (Exception e) {
			logger.error("修改目录文件失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改目录文件失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<CategoryFilesDO> queryCategoryFilesById(String id) {
		ResultDTO<CategoryFilesDO> result = new ResultDTO<CategoryFilesDO>();
		try {
			CategoryFilesDO file = categoryFilesDao.selectCategoryFilesById(id);
			if (null == file) {
				result.setSuccess(false);
				result.setErrorDetail("该目录文件不存在！");
				return result;
			}

			result.setModule(file);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录文件失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录文件失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CategoryFilesDO> queryCategoryFilesList(QueryCategoryFilesBO query) {
		BatchResultDTO<CategoryFilesDO> result = new BatchResultDTO<CategoryFilesDO>();
		try {
			List<CategoryFilesDO> list = categoryFilesDao.selectCategoryFilesList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录文件列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录文件列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CategoryFilesDO> queryCategoryFilesPage(QueryCategoryFilesBO query) {
		BatchResultDTO<CategoryFilesDO> result = new BatchResultDTO<CategoryFilesDO>();
		try {
			int record = categoryFilesDao.selectCategoryFilesCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<CategoryFilesDO> list = categoryFilesDao.selectCategoryFilesPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<CategoryFilesDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询目录文件失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询目录文件失败！");
		}
		return result;
	}
}
