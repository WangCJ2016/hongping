package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAreaPicturesBO;
import com.hp.manage.domain.AreaPicturesDO;

public interface AreaPicturesService {

	public BaseResultDTO createAreaPictures(AreaPicturesDO pictrue);

	public BaseResultDTO modifyAreaPictures(AreaPicturesDO pictrue);

	public BaseResultDTO deleteByAreaId(String areaId);

	public ResultDTO<AreaPicturesDO> queryAreaPicturesById(String id);

	public BatchResultDTO<AreaPicturesDO> queryAreaPicturesList(QueryAreaPicturesBO query);
}
