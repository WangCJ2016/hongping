package com.hp.commons.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.hp.manage.service.CarsService;

public class ClearCarsTask {
	@Autowired
	CarsService carsService;

	public void clearCars() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = sdf.parse(DateUtils.getFormatTime(new Date(), "yyyy-MM") + "-" + "01");
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);

		carsService.deleteCars(calendar.get(Calendar.YEAR) + "-0" + (calendar.get(Calendar.MONTH) + 1));
	}
}
