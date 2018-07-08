package com.hp.commons.web.core.http.session;

import com.hp.commons.exception.SessionException;
import com.hp.commons.exception.SessionTimeOutException;

public interface BPSession {

	void setAttribute(String key, Object value) throws SessionException, SessionTimeOutException;

	void removeAttribute(String key) throws SessionException, SessionTimeOutException;

	Object getAttribute(String key) throws SessionException, SessionTimeOutException;

	void invalidate() throws SessionException, SessionTimeOutException;
}
