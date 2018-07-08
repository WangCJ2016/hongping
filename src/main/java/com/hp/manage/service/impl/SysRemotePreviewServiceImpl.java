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
import com.hp.manage.bo.QuerySysRemotePreviewBO;
import com.hp.manage.dao.SysRemotePreviewDao;
import com.hp.manage.domain.SysRemotePreviewDO;
import com.hp.manage.service.SysRemotePreviewService;

@Service("sysRemotePreviewService")
public class SysRemotePreviewServiceImpl implements SysRemotePreviewService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SysRemotePreviewDao sysRemotePreviewDao;

	@Override
	@Transactional
	public BaseResultDTO createSysRemotePreview(SysRemotePreviewDO preview) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePreviewDao.insertSysRemotePreview(preview);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加预览失败！");
			}

		} catch (Exception e) {
			logger.error("添加预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加预览失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifySysRemotePreview(SysRemotePreviewDO preview) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePreviewDao.updateSysRemotePreview(preview);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改预览失败！");
			}
		} catch (Exception e) {
			logger.error("修改预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改预览失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<SysRemotePreviewDO> querySysRemotePreviewById(String id) {
		ResultDTO<SysRemotePreviewDO> result = new ResultDTO<SysRemotePreviewDO>();
		try {
			SysRemotePreviewDO preview = sysRemotePreviewDao.selectSysRemotePreviewById(id);
			if (null == preview) {
				result.setSuccess(false);
				result.setErrorDetail("该预览不存在！");
				return result;
			}

			result.setModule(preview);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询预览失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemotePreviewDO> querySysRemotePreviewList(QuerySysRemotePreviewBO query) {
		BatchResultDTO<SysRemotePreviewDO> result = new BatchResultDTO<SysRemotePreviewDO>();
		try {
			List<SysRemotePreviewDO> list = sysRemotePreviewDao.selectSysRemotePreviewList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询预览列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询预览列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<SysRemotePreviewDO> querySysRemotePreviewPage(QuerySysRemotePreviewBO query) {
		BatchResultDTO<SysRemotePreviewDO> result = new BatchResultDTO<SysRemotePreviewDO>();
		try {
			int record = sysRemotePreviewDao.selectSysRemotePreviewCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<SysRemotePreviewDO> list = sysRemotePreviewDao.selectSysRemotePreviewPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<SysRemotePreviewDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询预览失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO batchCreateSrPreview(List<SysRemotePreviewDO> previews) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePreviewDao.batchInsertSrPreview(previews);
			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("批量添加预览失败！");
			}

		} catch (Exception e) {
			logger.error("批量添加预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("批量添加预览失败！");
			throw e;
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteSysRemotePreview(SysRemotePreviewDO preview) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePreviewDao.deleteSysRemotePreview(preview);
			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除预览失败！");
			}

		} catch (Exception e) {
			logger.error("删除预览失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删除预览失败！");
			throw e;
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteSrPreviewGroup(String id) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = sysRemotePreviewDao.deleteSrPreviewGroup(id);
			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除预览组失败！");
			}

		} catch (Exception e) {
			logger.error("删除预览组失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删除预览组失败！");
			throw e;
		}
		return result;
	}
}
