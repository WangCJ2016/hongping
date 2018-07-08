package com.hp.websocket.server;

import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

@SuppressWarnings("deprecation")
public class WebSocketMessageServlet extends WebSocketServlet {

	private static final long serialVersionUID = 1L;

	public static int ONLINE_USER_COUNT = 1;

	public String getAccountId(HttpServletRequest request) {
		return (String) request.getParameter("accountId");
	}

	@Override
	protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request) {
		return new WebSocketMessageInbound(getAccountId(request));
	}
}
