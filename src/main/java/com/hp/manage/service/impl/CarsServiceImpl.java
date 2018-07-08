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
import com.hp.manage.bo.QueryCarsBO;
import com.hp.manage.dao.CarsDao;
import com.hp.manage.domain.CarsDO;
import com.hp.manage.service.CarsService;

@Service("carsService")
public class CarsServiceImpl implements CarsService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private CarsDao carsDao;

	@Override
	@Transactional
	public BaseResultDTO createCars(CarsDO cars) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = carsDao.insertCars(cars);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加车辆信息失败！");
			}

		} catch (Exception e) {
			logger.error("添加车辆信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加车辆信息失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyCars(CarsDO cars) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = carsDao.updateCars(cars);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改车辆信息失败！");
			}
		} catch (Exception e) {
			logger.error("修改车辆信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改车辆信息失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<CarsDO> queryCarsById(String id) {
		ResultDTO<CarsDO> result = new ResultDTO<CarsDO>();
		try {
			CarsDO cars = carsDao.selectCarsById(id);
			if (null == cars) {
				result.setSuccess(false);
				result.setErrorDetail("该车辆信息不存在！");
				return result;
			}

			result.setModule(cars);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询车辆信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询车辆信息失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CarsDO> queryCarsList(QueryCarsBO query) {
		BatchResultDTO<CarsDO> result = new BatchResultDTO<CarsDO>();
		try {
			List<CarsDO> list = carsDao.selectCarsList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询车辆信息列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询车辆信息列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<CarsDO> queryCarsPage(QueryCarsBO query) {
		BatchResultDTO<CarsDO> result = new BatchResultDTO<CarsDO>();
		try {
			int record = carsDao.selectCarsCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<CarsDO> list = carsDao.selectCarsPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<CarsDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询车辆信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询车辆信息失败！");
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO deleteCars(String dateStr) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = carsDao.deleteCars(dateStr);
			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("删除车辆信息失败！");
			}
		} catch (Exception e) {
			logger.error("删车辆信息失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("删车辆信息失败！");
			throw e;
		}
		return result;
	}
}
