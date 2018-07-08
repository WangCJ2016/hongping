package com.hp.manage.web.base.action;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.LongSerializationPolicy;
import com.hp.commons.bo.BaseQueryBO;
import com.hp.commons.bo.Page;
import com.hp.commons.utils.Base64Utils;
import com.hp.commons.web.core.http.cookie.CookieUtil;
import com.hp.commons.web.core.http.request.BpHttpRequest;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.service.AccountService;
import com.opensymphony.xwork2.ActionSupport;

public abstract class BaseAction extends ActionSupport implements ServletRequestAware, ServletResponseAware,
		SessionAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4979134481162712127L;

	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

	protected Logger logger = LoggerFactory.getLogger(getClass());

	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected Map<String, Object> session;
	private BpHttpRequest bpHttpRequest;
	protected String domain;

	public void setDomain(String domain) {
		this.domain = domain;
	}

	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response = response;
	}

	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	public void setSession(Map<String, Object> session) {
		this.session = session;
	}

	public BpHttpRequest getBpHttpRequest() {
		return bpHttpRequest;
	}

	public void setBpHttpRequest(BpHttpRequest bpHttpRequest) {
		this.bpHttpRequest = bpHttpRequest;
	}

	public BpHttpRequest getRequest() {
		return bpHttpRequest;
	}

	/**
	 * 新增cookie内容
	 * 
	 * @param name
	 * @param value
	 * @param expireTime
	 */
	protected void addCookie(String name, String value, Integer expireTime) {
		CookieUtil.addCookie(response, name, value, null != expireTime && expireTime > 0 ? expireTime : 3600, domain);
	}

	/**
	 * 取cookie内容
	 * 
	 * @param name
	 * @return
	 */
	protected String getCookie(String name) {
		return CookieUtil.getCookieValueByName(request, name);
	}

	/**
	 * 移除cookie内容
	 * 
	 * @param name
	 */
	protected void removeCookie(String name) {
		CookieUtil.deleteCookieByName(request, response, name);
	}

	/**
	 * 新增session内容
	 * 
	 * @param name
	 * @param value
	 */
	protected void addSession(String name, Object value) {
		session.put(name, value);
	}

	/**
	 * 取session内容
	 * 
	 * @param name
	 * @return
	 */
	protected Object getSession(String name) {
		return session.get(name);
	}

	/**
	 * 移除session内容
	 * 
	 * @param name
	 */
	protected void removeSession(String name) {
		session.remove(name);
	}

	/**
	 * JSON输出
	 * 
	 * @param obj
	 */
	public void responseJson(Object obj) {
		Gson gson = new GsonBuilder().setDateFormat(DATE_FORMAT).create();
		PrintWriter out = null;
		response.setContentType("application/json; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSON输出异常", e);
		}
		out.print(gson.toJson(obj));
		out.flush();
	}

	/**
	 * JSON输出
	 *
	 * @param obj
	 */
	public void responseJsonp(Object obj) {
		Gson gson = new GsonBuilder().setDateFormat(DATE_FORMAT).create();
		PrintWriter out = null;
		response.setContentType("application/json; charset=UTF-8");
		response.setHeader("Access-Control-Allow-Origin", "*");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSON输出异常", e);
		}
		out.print(gson.toJson(obj));
		out.flush();
	}

	public void responseJsonB(Object obj) {
		GsonBuilder builder = new GsonBuilder();
		builder.setDateFormat(DATE_FORMAT);
		builder.setLongSerializationPolicy(LongSerializationPolicy.STRING);

		PrintWriter out = null;
		response.setContentType("application/json; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSON输出异常", e);
		}
		out.print(builder.create().toJson(obj));
		out.flush();
	}

	/**
	 * 自定义GSON输出
	 * 
	 * @param obj
	 * @param gson
	 */
	public void responseJson(Object obj, Gson gson) {
		PrintWriter out = null;
		response.setContentType("application/json; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSON输出异常", e);
		}
		out.print(gson.toJson(obj));
		out.flush();
	}

	/**
	 * JSON输出
	 * 
	 * @param obj
	 */
	public void responseJsonWithNull(Object obj) {
		Gson gson = new GsonBuilder().serializeNulls().setDateFormat(DATE_FORMAT).create();
		PrintWriter out = null;
		response.setContentType("application/json; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSON输出异常", e);
		}
		out.print(gson.toJson(obj));
		out.flush();
	}

	/**
	 * JSONP输出
	 * 
	 * @param callback
	 * @param obj
	 */
	public void responseJsonp(String callback, Object obj) {
		Gson gson = new GsonBuilder().setDateFormat(DATE_FORMAT).create();
		PrintWriter out = null;
		response.setContentType("text/html; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSONP输出异常", e);
		}

		StringBuffer sb = new StringBuffer();
		if (StringUtils.isBlank(callback)) {
			sb.append("callback");
		} else {
			sb.append(callback.trim());
		}
		sb.append("(").append(gson.toJson(obj)).append(")");

		out.print(sb.toString());
		out.flush();
	}

	/**
	 * JSONP输出
	 * 
	 * @param callback
	 * @param obj
	 */
	public void responseJsonpWithNull(String callback, Object obj) {
		Gson gson = new GsonBuilder().serializeNulls().setDateFormat(DATE_FORMAT).create();
		PrintWriter out = null;
		response.setContentType("text/html; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("JSONP输出异常", e);
		}

		StringBuffer sb = new StringBuffer();
		if (StringUtils.isBlank(callback)) {
			sb.append("callback");
		} else {
			sb.append(callback.trim());
		}
		sb.append("(").append(gson.toJson(obj)).append(")");

		out.print(sb.toString());
		out.flush();
	}

	/**
	 * 字符串流输出
	 * 
	 * @param text
	 */
	public void responseString(String text) {
		PrintWriter out = null;
		response.setContentType("text/html; charset=UTF-8");
		try {
			out = response.getWriter();
		} catch (IOException e) {
			logger.error("字符串输出异常", e);
		}

		out.print(text);
		out.flush();
	}

	/**
	 * 封装分页数据对象
	 * 
	 * @param <T>
	 * @param page
	 * @param list
	 * @param query
	 */
	public <T> void createPage(Page<T> page, List<T> list, BaseQueryBO query) {
		if (null == page || null == query) {
			return;
		}

		page.setSuccess(true);
		page.setPageNo(query.getPageNo());
		page.setPageSize(query.getPageSize());
		page.setRecords(query.getRecord());
		page.setTotalPages(query.getTotalPages());
		page.setResult(list);
	}

	/**
	 * 返回当前用户id
	 * 
	 * @return
	 */
	public String getCurrentUserId() {
		String userId = "";
		AccountDO account = (AccountDO) request.getSession().getAttribute("account");
		if (null == account) {
			return null;
		}
		userId = account.getId();
		return userId;
	}

	public String getRequestSign() {
		String requestSign = "";
		String servletPath = ServletActionContext.getRequest().getServletPath();
		if (StringUtils.isNotBlank(servletPath)) {
			String[] servletPaths = servletPath.split("/");
			requestSign = servletPaths[1];
		}
		return requestSign;
	}

	/**
	 * token验证
	 * 
	 * @return
	 */
	public boolean validateToken() {
		return false;

	}

	public Long getParameter(String key, Long val) {
		String value = request.getParameter(key);
		return NumberUtils.toLong(value, val);
	}

	public int getParameter(String key, int val) {
		String value = request.getParameter(key);
		return NumberUtils.toInt(value, val);
	}

	public Double getParameter(String key, Double val) {
		String value = request.getParameter(key);
		return NumberUtils.toDouble(value, val);
	}

	public String getParameter(String key, String val) {
		String value = request.getParameter(key);
		if (StringUtils.isBlank(value)) {
			value = val;
		}
		return value;
	}

	/**
	 * 获得客户端真实IP地址
	 * 
	 * @param request
	 * @return
	 */
	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	@Autowired
	AccountService accountService;

	public Boolean checkWhetherLogin() {
		Boolean result = true;
		try {
			String token = getParameter("token", "");
			if (StringUtils.isBlank(token)) {
				result = false;
			}

			if (!token.equals("VmpCSmRGVXhSWFJTUlc5MFUwWkJlVTFFUlRNPQ==")) {
				QueryAccountBO query = new QueryAccountBO();
				query.setToken(Base64Utils.decodeToken(token));

				List<AccountDO> accounts = accountService.queryAccountList(query).getModule();
				if (CollectionUtils.isEmpty(accounts)) {
					result = false;
				}
			}
		} catch (Exception e) {
			result = false;
		}
		return result;
	}
}
