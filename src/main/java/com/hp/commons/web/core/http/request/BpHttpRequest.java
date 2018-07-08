package com.hp.commons.web.core.http.request;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.hp.commons.web.core.http.session.BPSession;

public interface BpHttpRequest {

	/**
	 * 获取request
	 * 
	 * @return
	 */
	HttpServletRequest getRequest();

	/**
	 * 获取请求参数
	 * 
	 * @return
	 */
	String getParameter(String p);

	/**
	 * 获取请求参数
	 * 
	 * @return
	 */
	String getParameter(String p, String def);

	/**
	 * 获取请求参数（解码）
	 * 
	 * @return
	 */
	String getDeCodeParameter(String p, String def);

	/**
	 * 获取请求参数（long类型）
	 * 
	 * @return
	 */
	long getParameter(String p, long def);

	/**
	 * 获取请求参数（float类型）
	 * 
	 * @return
	 */
	float getParameter(String p, float def);

	/**
	 * 获取请求参数（int类型）
	 * 
	 * @return
	 */
	int getParameter(String p, int def);

	/**
	 * 获取请求参数（doulbe类型）
	 * 
	 * @return
	 */
	double getParameter(String p, double def);

	/**
	 * 获取请求参数（boolean类型）
	 * 
	 * @return
	 */
	boolean getParameter(String p, boolean def);

	/**
	 * 获取请求参数（日期类型）
	 * 
	 * @return
	 */
	Date getParameterDate(String p, Date def);

	/**
	 * 获取请求参数
	 * 
	 * @return
	 */
	String[] getParameterValues(String p);

	/**
	 * 设置属性
	 */
	void setAttribute(String name, Object o);

	/**
	 * 获取请求相对路径
	 * 
	 * @return
	 */
	String getServletPath();

	/**
	 * 获取session
	 * 
	 * @return
	 */
	BPSession getSession();

	/**
	 * 获取cookie值
	 * 
	 * @return
	 */
	String getCookie(String name);

	/**
	 * 获取请求属性值
	 * 
	 * @return
	 */
	Object getAttribute(String p);

	/**
	 * 获取请求Header
	 * 
	 * @return
	 */
	String getHeader(String name);

	/**
	 * 判断请求是否是ajax请求
	 * 
	 * @return boolean 返回类型
	 */
	boolean isJsonRequest();
}
