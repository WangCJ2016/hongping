package com.hp.commons.web.core.http.cookie;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;

public class CookieUtil {

	/**
	 * 设置cookie
	 * 
	 * @param response
	 * @param name
	 *            cookie名字
	 * @param value
	 *            cookie值
	 * @param maxAge
	 *            cookie生命周期 以秒为单位
	 */
	public static void addCookie(HttpServletResponse response, String name, String value, int maxAge, String domain) {
		Cookie cookie = new Cookie(name, value);
		cookie.setPath("/");
		if (StringUtils.isNotBlank(domain)) {
			cookie.setDomain(domain);
		}
		if (maxAge > 0 || maxAge == -1) {
			cookie.setMaxAge(maxAge);
		}
		response.addCookie(cookie);
	}

	/**
	 * 设置加密cookie
	 * 
	 * @param response
	 * @param name
	 *            cookie名字
	 * @param value
	 *            cookie值
	 * @param maxAge
	 *            cookie生命周期 以秒为单位
	 */
	public static void addEncoderCookie(HttpServletResponse response, String name, String value, int maxAge,
			String domain) {
		String cookieValue = null;
		if (null != value) {
			cookieValue = new String(Base64.encodeBase64(value.getBytes()));
		}
		Cookie cookie = new Cookie(name, cookieValue);
		cookie.setPath("/");
		if (StringUtils.isNotBlank(domain)) {
			cookie.setDomain(domain);
		}
		if (maxAge > 0)
			cookie.setMaxAge(maxAge);
		response.addCookie(cookie);
	}

	/**
	 * 根据名字获取cookie
	 * 
	 * @param request
	 * @param name
	 *            cookie名字
	 * @return
	 */
	public static Cookie getCookieByName(HttpServletRequest request, String name) {
		Map<String, Cookie> cookieMap = readCookieMap(request);
		if (cookieMap.containsKey(name)) {
			Cookie cookie = (Cookie) cookieMap.get(name);
			return cookie;
		} else {
			return null;
		}
	}

	/**
	 * 根据cookie名查询value
	 * 
	 * @param request
	 * @param name
	 * @return
	 */
	public static String getCookieValueByName(HttpServletRequest request, String name) {
		Map<String, Cookie> cookieMap = readCookieMap(request);
		if (cookieMap.containsKey(name)) {
			Cookie cookie = (Cookie) cookieMap.get(name);
			return cookie.getValue();
		} else {
			return null;
		}
	}

	/**
	 * 根据cookie名查询value
	 * 
	 * @param request
	 * @param name
	 * @return
	 */
	public static String getDecoderCookieValueByName(HttpServletRequest request, String name) {
		Map<String, Cookie> cookieMap = readCookieMap(request);
		if (cookieMap.containsKey(name)) {
			Cookie cookie = (Cookie) cookieMap.get(name);
			String cookieValue = cookie.getValue();
			if (null != cookieValue) {
				return new String(Base64.decodeBase64(cookieValue.getBytes()));
			}
			return cookie.getValue();
		} else {
			return null;
		}
	}

	/**
	 * 将cookie封装到Map里面
	 * 
	 * @param request
	 * @return
	 */
	private static Map<String, Cookie> readCookieMap(HttpServletRequest request) {
		Map<String, Cookie> cookieMap = new HashMap<String, Cookie>();
		Cookie[] cookies = request.getCookies();
		if (null != cookies) {
			for (Cookie cookie : cookies) {
				cookieMap.put(cookie.getName(), cookie);
			}
		}
		return cookieMap;
	}

	/**
	 * 根据名字删除cookie
	 * 
	 * @param request
	 * @param response
	 * @param name
	 */
	public static void deleteCookieByName(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie cookie = getCookieByName(request, name);
		if (cookie == null) {
			return;
		}
		cookie = new Cookie(name, null);
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

	/**
	 * 根据名字删除cookie
	 * 
	 * @param request
	 * @param response
	 * @param name
	 * @param domain
	 */
	public static void deleteCookieByName(HttpServletRequest request, HttpServletResponse response, String name,
			String domain) {
		Cookie cookie = getCookieByName(request, name);
		if (cookie == null) {
			return;
		}
		cookie = new Cookie(name, null);
		if (StringUtils.isNotBlank(domain)) {
			cookie.setDomain(domain);
		}
		cookie.setPath("/");
		cookie.setMaxAge(0);
		response.addCookie(cookie);
	}

}
