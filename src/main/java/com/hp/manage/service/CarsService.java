package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryCarsBO;
import com.hp.manage.domain.CarsDO;

public interface CarsService {

	public BaseResultDTO createCars(CarsDO cars);

	public BaseResultDTO modifyCars(CarsDO cars);

	public BaseResultDTO deleteCars(String dateStr);

	public ResultDTO<CarsDO> queryCarsById(String id);

	public BatchResultDTO<CarsDO> queryCarsList(QueryCarsBO query);

	public BatchResultDTO<CarsDO> queryCarsPage(QueryCarsBO query);
}
