package com.hp.websocket.server;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SuppressWarnings("deprecation")
public class WebSocketMessageInboundPool {
	static Logger logger = LoggerFactory.getLogger(WebSocketMessageInboundPool.class);

	public static final Map<String, WebSocketMessageInbound> connections = new HashMap<String, WebSocketMessageInbound>();

	public static void addMessageInbound(WebSocketMessageInbound inbound) {
		logger.info("CLIENT : " + inbound.getAccountId() + " join..");
		if (StringUtils.isNotBlank(inbound.getAccountId())) {
			connections.put(inbound.getAccountId(), inbound);
		}
	}

	public static void removeMessageInbound(WebSocketMessageInbound inbound) {
		logger.info("CLIENT : " + inbound.getAccountId() + " exit..");
		if (StringUtils.isNotBlank(inbound.getAccountId())) {
			connections.remove(inbound.getAccountId());
		}
	}

	public static void sendMessageToClient(String message) {
		// logger.info("Send message to account : " + accountId +
		// " ,message content : " + message);
		// WebSocketMessageInbound inbound = connections.get(accountId);
		// if (inbound != null) {
		// inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(message));
		// }
		try {
			if (connections.size() > 0) {
				for (Entry<String, WebSocketMessageInbound> set : connections.entrySet()) {
					WebSocketMessageInbound inbound = set.getValue();
					if (inbound != null) {
						inbound.getWsOutbound().writeTextMessage(CharBuffer.wrap(message));
					}
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}