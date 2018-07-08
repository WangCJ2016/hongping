package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.domain.AreasDO;

@Repository
public interface AreasDao {

	public int insertAreas(AreasDO areas);

	public int updateAreas(AreasDO areas);

	public AreasDO selectAreasById(String id);

	public List<AreasDO> selectAreasList(QueryAreasBO query);

	public int selectAreasCount(QueryAreasBO query);

	public List<AreasDO> selectAreasPage(QueryAreasBO query);

}
