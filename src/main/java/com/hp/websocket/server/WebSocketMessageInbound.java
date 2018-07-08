package com.hp.websocket.server;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;

import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

@SuppressWarnings("deprecation")
public class WebSocketMessageInbound extends MessageInbound {

	private final String accountId;

	public WebSocketMessageInbound(String accountId) {
		this.accountId = accountId;
	}

	public String getAccountId() {
		return accountId;
	}

	// 客户端连接 放入连接池
	@Override
	protected void onOpen(WsOutbound outbound) {
		WebSocketMessageInboundPool.addMessageInbound(this);
	}

	// 触发关闭事件，在连接池中移除连接
	@Override
	protected void onClose(int status) {
		WebSocketMessageInboundPool.removeMessageInbound(this);
	}

	@Override
	protected void onBinaryMessage(ByteBuffer message) throws IOException {
		throw new UnsupportedOperationException("Binary message not supported.");
	}

	// 客户端发送消息到服务器时触发事件
	@Override
	protected void onTextMessage(CharBuffer message) throws IOException {
	}
}