package com.hp.commons.bo;

import java.util.Date;

import com.hp.commons.utils.DateUtils;

public class v {
	public static void main(String[] args) {
		Date date = DateUtils.getFormatDate("2018-01-01 11:00:00))", "yyyy-MM-dd HH:mm:ss");

		System.out.println(DateUtils.getFormatTime(date, "yyyy-MM-dd HH:mm:ss"));
	}
}
