package com.hp.commons.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class DateUtils {

	public final static String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public final static String DATE_FORMAT_NOTIME = "yyyy-MM-dd";

	/**
	 * 格式化日期
	 * 
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String getFormatTime(Date date, String pattern) {
		try {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
			return simpleDateFormat.format(date).toString();
		} catch (Exception e) {
			return "";
		}
	}

	public static Date getFormatDate(String date, String pattern) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		try {
			return simpleDateFormat.parse(date);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date getFormatDate(String date) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_FORMAT);
		try {
			return simpleDateFormat.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 偏移时间（分钟）
	 * 
	 * @param date
	 *            时间
	 * @param offset
	 *            偏移量，负数代表往前，正数代表往后
	 * @return
	 */
	public static Date offSetMin(Date date, int offset) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, offset);
		return cal.getTime();
	}

	/**
	 * 
	 * @param date
	 * @param field
	 * @param offset
	 * @return
	 */
	public static Date offSet(Date date, int field, int offset) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(field, offset);
		return cal.getTime();

	}

	public static String addSecond(Integer second) {
		Long currentTime = (long) (System.currentTimeMillis() + second * 1000);
		Date date = new Date(currentTime);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowTime = df.format(date);

		return nowTime;
	}

	public static String addDay(Integer days) {
		Calendar ca = Calendar.getInstance();
		ca.add(Calendar.DATE, days);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowTime = df.format(ca.getTime());

		return nowTime;
	}

	public static Long parseDateTomillion(Date date) {
		long millionSeconds = 0;
		try {
			String nowTime = getFormatTime(date, "yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

			millionSeconds = format.parse(nowTime).getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return millionSeconds;
	}

	public static String getWeekDates(int num) {
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		if (num == 1) // 返回星期一所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		else if (num == 2) // 返回星期二所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.TUESDAY);
		else if (num == 3) // 返回星期三所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.WEDNESDAY);
		else if (num == 4) // 返回星期四所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.THURSDAY);
		else if (num == 5) // 返回星期五所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.FRIDAY);
		else if (num == 6) // 返回星期六所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
		else if (num == 0) // 返回星期日所在的日期
			calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		return new SimpleDateFormat("yyyy-MM-dd").format(calendar.getTime());
	}

	@SuppressWarnings("deprecation")
	public static List<String> getMonthDates(int month) {
		Date date = new Date();
		date.setMonth(month - 1);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		int year = calendar.get(Calendar.YEAR);
		int dayNumOfMonth = getDaysByYearMonth(year, month);
		calendar.set(Calendar.DAY_OF_MONTH, 1);// 从一号开始

		List<String> dates = new ArrayList<String>();
		for (int i = 0; i < dayNumOfMonth; i++, calendar.add(Calendar.DATE, 1)) {
			Date d = calendar.getTime();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
			String df = simpleDateFormat.format(d);
			dates.add(df);
		}
		return dates;
	}

	public static int getDaysByYearMonth(int year, int month) {
		Calendar a = Calendar.getInstance();
		a.set(Calendar.YEAR, year);
		a.set(Calendar.MONTH, month - 1);
		a.set(Calendar.DATE, 1);
		a.roll(Calendar.DATE, -1);
		int maxDate = a.get(Calendar.DATE);
		return maxDate;
	}

	public static List<String> getSeasonDates(int season) {
		List<String> dates = new ArrayList<String>();
		if (season == 1) {
			for (int i = 1; i <= 3; i++) {
				List<String> datex = getMonthDates(i);
				for (String date : datex) {
					dates.add(date);
				}
			}
		} else if (season == 2) {
			for (int i = 4; i <= 6; i++) {
				List<String> datex = getMonthDates(i);
				for (String date : datex) {
					dates.add(date);
				}
			}
		} else if (season == 3) {
			for (int i = 7; i <= 9; i++) {
				List<String> datex = getMonthDates(i);
				for (String date : datex) {
					dates.add(date);
				}
			}
		} else if (season == 4) {
			for (int i = 10; i <= 12; i++) {
				List<String> datex = getMonthDates(i);
				for (String date : datex) {
					dates.add(date);
				}
			}
		}
		return dates;
	}

	public static String getWeek() {
		String[] weekDays = { "7", "1", "2", "3", "4", "5", "6" };
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());

		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
		if (w < 0) {
			w = 0;
		}

		return weekDays[w];
	}

	public static void main(String[] args) throws ParseException {
		System.out.println(getWeekDates(0));
	}
}
