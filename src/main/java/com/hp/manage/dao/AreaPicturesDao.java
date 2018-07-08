package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryAreaPicturesBO;
import com.hp.manage.domain.AreaPicturesDO;

@Repository
public interface AreaPicturesDao {

	public int insertAreaPictures(AreaPicturesDO picture);

	public int updateAreaPictures(AreaPicturesDO picture);

	public int deleteByAreaId(String areaId);

	public AreaPicturesDO selectAreaPicturesById(String id);

	public List<AreaPicturesDO> selectAreaPicturesList(QueryAreaPicturesBO query);
}
