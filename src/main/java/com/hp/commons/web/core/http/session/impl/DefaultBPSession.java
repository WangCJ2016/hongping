package com.hp.commons.web.core.http.session.impl;

import javax.servlet.http.HttpServletRequest;

import com.hp.commons.exception.SessionException;
import com.hp.commons.exception.SessionTimeOutException;
import com.hp.commons.web.core.http.session.BPSession;

public class DefaultBPSession implements BPSession {

	private HttpServletRequest request;

	public DefaultBPSession() {
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	@Override
	public void setAttribute(String key, Object value) throws SessionException, SessionTimeOutException {
		this.request.getSession().setAttribute(key, value);
	}

	@Override
	public void removeAttribute(String key) throws SessionException, SessionTimeOutException {
		this.request.getSession().removeAttribute(key);
	}

	@Override
	public Object getAttribute(String key) throws SessionException, SessionTimeOutException {
		return this.request.getAttribute(key);
	}

	@Override
	public void invalidate() throws SessionException, SessionTimeOutException {
		this.request.getSession().invalidate();
	}

}
