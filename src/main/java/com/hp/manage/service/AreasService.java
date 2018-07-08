package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.domain.AreasDO;

public interface AreasService {

	public BaseResultDTO createAreas(AreasDO areas);

	public BaseResultDTO modifyAreas(AreasDO areas);

	public ResultDTO<AreasDO> queryAreasById(String id);

	public BatchResultDTO<AreasDO> queryAreasList(QueryAreasBO query);

	public BatchResultDTO<AreasDO> queryAreasPage(QueryAreasBO query);
}
