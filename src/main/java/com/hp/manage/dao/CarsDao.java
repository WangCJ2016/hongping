package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryCarsBO;
import com.hp.manage.domain.CarsDO;

@Repository
public interface CarsDao {

	public int insertCars(CarsDO cars);

	public int updateCars(CarsDO cars);

	public int deleteCars(String dateStr);

	public CarsDO selectCarsById(String id);

	public List<CarsDO> selectCarsList(QueryCarsBO query);

	public int selectCarsCount(QueryCarsBO query);

	public List<CarsDO> selectCarsPage(QueryCarsBO query);

}
