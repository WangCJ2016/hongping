package com.hp.manage.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAreaPicturesBO;
import com.hp.manage.dao.AreaPicturesDao;
import com.hp.manage.domain.AreaPicturesDO;
import com.hp.manage.service.AreaPicturesService;

@Service("areaPicturesService")
public class AreaPicturesServiceImpl implements AreaPicturesService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AreaPicturesDao areaPicturesDao;

	@Override
	@Transactional
	public BaseResultDTO createAreaPictures(AreaPicturesDO picture) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = areaPicturesDao.insertAreaPictures(picture);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加区域图片失败！");
			}

		} catch (Exception e) {
			logger.error("添加区域图片失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加区域图片失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyAreaPictures(AreaPicturesDO picture) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = areaPicturesDao.updateAreaPictures(picture);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改区域图片失败！");
			}
		} catch (Exception e) {
			logger.error("修改区域图片失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改区域图片失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<AreaPicturesDO> queryAreaPicturesById(String id) {
		ResultDTO<AreaPicturesDO> result = new ResultDTO<AreaPicturesDO>();
		try {
			AreaPicturesDO picture = areaPicturesDao.selectAreaPicturesById(id);
			if (null == picture) {
				result.setSuccess(false);
				result.setErrorDetail("该区域图片不存在！");
				return result;
			}

			result.setModule(picture);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询区域图片失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询区域图片失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AreaPicturesDO> queryAreaPicturesList(QueryAreaPicturesBO query) {
		BatchResultDTO<AreaPicturesDO> result = new BatchResultDTO<AreaPicturesDO>();
		try {
			List<AreaPicturesDO> list = areaPicturesDao.selectAreaPicturesList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询区域图片失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询区域图片失败！");
		}
		return result;
	}

	@Override
	public BaseResultDTO deleteByAreaId(String areaId) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = areaPicturesDao.deleteByAreaId(areaId);

			if (num >= 0) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除区域图片失败！");
			}
		} catch (Exception e) {
			logger.error("删除区域图片失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删除区域图片失败！");
			throw e;
		}
		return result;
	}

}
