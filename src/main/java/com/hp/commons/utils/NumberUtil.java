package com.hp.commons.utils;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NumberUtil extends NumberUtils {

	private final static Logger log = LoggerFactory.getLogger(NumberUtil.class);

	public static Integer toInteger(Long l) {
		Integer i = null;
		try {
			if (l != null) {
				i = l.intValue();
			}
		} catch (Exception e) {
			log.info("call  toInt toInteger  error 转换错误，输入为" + l);
		}
		return i;
	}

	public static Integer toInteger(Boolean b) {
		Integer i = null;
		if (b == null) {
		} else if (b) {
			i = 1;
		} else {
			i = 0;
		}
		return i;
	}

	public static Boolean toBoolean(Integer i) {
		if (i == null) {
			return null;
		}
		switch (i) {
		case 0:
			return false;
		case 1:
			return true;
		default:
			return null;
		}
	}
}
