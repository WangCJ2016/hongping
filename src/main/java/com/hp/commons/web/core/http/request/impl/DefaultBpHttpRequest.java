package com.hp.commons.web.core.http.request.impl;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hp.commons.web.core.http.cookie.CookieUtil;
import com.hp.commons.web.core.http.request.BpHttpRequest;
import com.hp.commons.web.core.http.session.BPSession;

public class DefaultBpHttpRequest implements BpHttpRequest {

	private Logger logger = LoggerFactory.getLogger(getClass());

	public DefaultBpHttpRequest() {
	}

	private BPSession bpSession;

	public BPSession getBpSession() {
		return bpSession;
	}

	@Override
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}

	@Override
	public String getParameter(String p) {
		return getParameter(p, "");
	}

	@Override
	public String getParameter(String p, String def) {
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			value = def;
		} else {
			value.trim();
		}
		return value;
	}

	@Override
	public String getDeCodeParameter(String p, String def) {
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			value = def;
		} else {
			value = value.trim();
		}
		if (null == value) {
			return null;
		}
		try {
			return URLDecoder.decode(value, "utf-8").trim();
		} catch (UnsupportedEncodingException e) {
			logger.error("转码失败", e);
		}
		return value;
	}

	@Override
	public long getParameter(String p, long def) {
		long val = 0;
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			val = def;
		} else {
			try {
				val = Long.parseLong(value);
			} catch (Exception e) {
				logger.error("转换long类型参数错误，输入为[" + val + "]", e);
				val = 0;
			}
		}
		return val;
	}

	@Override
	public float getParameter(String p, float def) {
		float val = 0;
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			val = def;
		} else {
			try {
				val = Float.parseFloat(value);
			} catch (Exception e) {
				logger.error("转换float类型参数错误，输入为[" + val + "]", e);
				val = 0;
			}
		}
		return val;
	}

	@Override
	public int getParameter(String p, int def) {
		int val = 0;
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			val = def;
		} else {
			try {
				val = Integer.parseInt(value);
			} catch (Exception e) {
				logger.error("转换int类型参数错误，输入为[" + val + "]", e);
				val = 0;
			}
		}
		return val;
	}

	@Override
	public double getParameter(String p, double def) {
		double val = 0;
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			val = def;
		} else {
			try {
				val = Double.parseDouble(value);
			} catch (Exception e) {
				logger.error("转换double类型参数错误，输入为[" + val + "]", e);
				val = 0;
			}
		}
		return val;
	}

	@Override
	public boolean getParameter(String p, boolean def) {
		Boolean val = null;
		String value = getRequest().getParameter(p);
		if (StringUtils.isBlank(value)) {
			val = def;
		} else {
			val = Boolean.parseBoolean(value);
		}
		return val;
	}

	@Override
	public Date getParameterDate(String p, Date def) {
		String val = getDeCodeParameter(p, "");
		if (StringUtils.isNotBlank(val)) {
			Date date = null;
			try {
				date = DateUtils.parseDate(val, new String[] { "yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss" });
			} catch (Exception e) {
				logger.error("转换日期参数错误，输入为[" + val + "]", e);
				date = null;
			}
			return date;
		} else {
			return def;
		}
	}

	@Override
	public String[] getParameterValues(String p) {
		return getRequest().getParameterValues(p);
	}

	@Override
	public void setAttribute(String name, Object o) {
		this.getRequest().setAttribute(name, o);
	}

	@Override
	public String getServletPath() {
		return getRequest().getServletPath();
	}

	@Override
	public BPSession getSession() {
		return this.bpSession;
	}

	@Override
	public String getCookie(String name) {
		return CookieUtil.getCookieValueByName(getRequest(), name);
	}

	@Override
	public Object getAttribute(String p) {
		return getRequest().getAttribute(p);
	}

	@Override
	public String getHeader(String name) {
		return getRequest().getHeader(name);
	}

	@Override
	public boolean isJsonRequest() {
		return this.getHeader("x-requested-with") != null
				&& this.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest");
	}
}
