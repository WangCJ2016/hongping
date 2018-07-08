package com.hp.manage.domain;

public class AlarmsDOX {

	private String date;

	private String count;

	AlarmsDOX(String date, String count) {
		this.date = date;
		this.count = count;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

}