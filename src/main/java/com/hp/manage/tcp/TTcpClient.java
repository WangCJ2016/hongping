package com.hp.manage.tcp;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

public class TTcpClient {
	private static final SocketAddress SocketAddress = null;
	private static String BindingHandle = "BindingHandle";
	private static String CF_SEND_PARAM = "CF_SEND_PARAM:Id";
	private static String ParamXMLStreamSize = "ParamXMLStreamSize";
	private static String ExtraBufferSize = "ExtraBufferSize";
	private Socket socket;
	private String RemoteIpAddr;
	private int RemotePort;
	private int ExBufferSize;

	public TTcpClient() {
		this.ExBufferSize = 0;
	}

	public String getRemoteIpAddr() {
		return this.RemoteIpAddr;
	}

	public int getRemotePort() {
		return this.RemotePort;
	}

	public int getExBufferSize() {
		return this.ExBufferSize;
	}

	public synchronized void SetRemoteIPPort(String ip, int port) throws Exception {
		if (this.socket != null) {
			if (this.socket.getInetAddress() != null) {
				String _Remoteip = this.socket.getInetAddress().getHostAddress();
				int _remoteport = this.socket.getPort();
				if ((ip.equalsIgnoreCase(_Remoteip)) && (port == _remoteport))
					return;
			}
			if (this.socket.isConnected()) {
				this.socket.close();
			}
		}
		this.socket = new Socket();
		try {
			this.socket.connect(new InetSocketAddress(ip, port), 4000);
		} catch (Exception e) {
			throw new Exception("IP地址(" + ip + ")无效");
		}

		this.RemoteIpAddr = ip;
		this.RemotePort = port;
	}

	public void close() throws Exception {
		if (this.socket.isConnected())
			this.socket.close();
	}

	public synchronized TPack ReuqestPack(TPack Pack0) throws Exception {
		if ((this.socket == null) || (this.socket.isClosed())) {
			this.socket = new Socket();

			SocketAddress socketAddress = new InetSocketAddress(this.RemoteIpAddr, this.RemotePort);
			this.socket.connect(socketAddress, 2000);// 2s
		}
		if (!this.socket.getKeepAlive()) {
			this.socket.setKeepAlive(true);
			if (!this.socket.getKeepAlive()) {
				Pack0.setErrNo("-1");
				Pack0.setErrMsg("未能连接服务器");
				return Pack0;
			}

		}

		String reqxml = Pack0.ExportPackXml();
		String PackHead = GetPackHead(reqxml.length());
		boolean issend = true;
		try {
			this.socket.getOutputStream().write(PackHead.getBytes());
			this.socket.getOutputStream().write(reqxml.getBytes());
			this.socket.getOutputStream().flush();
		} catch (Exception e) {
			issend = false;
		}
		if (!issend) {
			this.socket.close();
		}

		int Packsize = ReadPackHeader();
		if (Packsize < 0) {
			Pack0.setErrNo("-1");
			Pack0.setErrMsg("接收数据超时");
			return Pack0;
		}

		TPack Pack = new TPack();
		if (!ReadPack(Packsize, Pack)) {
			Pack0.setErrNo("-1");
			Pack0.setErrMsg("Pack包加载数据失败");
			return Pack0;
		}
		return Pack;
	}

	private boolean ReadPack(int packsize, TPack pack) throws Exception {
		byte[] getBytes = new byte[packsize];

		StringBuffer buffer = new StringBuffer();
		int pos = 0;
		do {
			int _count = this.socket.getInputStream().read(getBytes, pos, packsize - pos);
			if (_count < 0) {
				this.socket.close();
				this.socket = null;
				return false;
			}
			pos += _count;
		} while (pos < packsize);

		String strRtn = new String(getBytes);
		pack.ImportPackXml(strRtn);
		return true;
	}

	public synchronized int readbuffer(int index, int len, byte[] buf) {
		try {
			/* 148 */int pos = 0;
			do {
				/* 150 */int _count = this.socket.getInputStream().read(buf, index + pos, len - pos);
				/* 151 */if (_count < 0) {
					/* 152 */this.socket.close();
					/* 153 */this.socket = null;
					/* 154 */return -1;
				}
				/* 156 */pos += _count;
				/* 157 */} while (pos < len);
			/* 158 */return pos;
		} catch (IOException e) {
			/* 165 */e.printStackTrace();
		}
		/* 167 */return -1;
	}

	private int ReadPackHeader() throws Exception {
		/* 174 */byte[] getBytes = new byte[103];
		/* 175 */int pos = 0;
		char ln;
		do {
			/* 178 */if (pos >= 103)
				/* 179 */return -1;
			/* 180 */int _count = this.socket.getInputStream().read(getBytes, pos, 1);
			/* 181 */if (_count < 0) {
				/* 182 */this.socket.close();
				/* 183 */this.socket = null;
				/* 184 */return -1;
			}
			/* 186 */pos += _count;
			/* 187 */ln = (char) getBytes[(pos - 1)];
			/* 188 */} while (ln != '\n');

		/* 192 */if (pos <= 78) {
			/* 193 */String strRtn = new String(getBytes, 0, 78);

			/* 195 */int end = strRtn.indexOf("\r\n");
			/* 196 */if (end < 0) {
				/* 197 */return -1;
			}

			/* 200 */int start = strRtn.indexOf(ParamXMLStreamSize);
			/* 201 */if (start < 0)
				/* 202 */return -1;
			/* 203 */String PacksizeStr = strRtn.substring(start + ParamXMLStreamSize.length() + 1, end);
			/* 204 */return Integer.valueOf(PacksizeStr.trim()).intValue();
			/* 205 */}
		if (pos <= 103) {
			/* 206 */String strRtn = new String(getBytes, 0, 103);
			/* 207 */int start = strRtn.indexOf(ParamXMLStreamSize);
			/* 208 */if (start < 0) {
				/* 209 */return -1;
			}
			/* 211 */int end = strRtn.indexOf(ExtraBufferSize);
			/* 212 */if (end < 0)
				/* 213 */return -1;
			/* 214 */String ExtraBufferSizeStr = strRtn.substring(start + ParamXMLStreamSize.length() + 1, end - 1);
			/* 215 */int _xmlsize = Integer.valueOf(ExtraBufferSizeStr.trim()).intValue();

			/* 217 */start = strRtn.indexOf(ExtraBufferSize);
			/* 218 */if (start < 0)
				/* 219 */return -1;
			/* 220 */end = strRtn.indexOf("\r\n");
			/* 221 */if (end < 0)
				/* 222 */return -1;
			/* 223 */String PacksizeStr = strRtn.substring(start + ExtraBufferSize.length() + 1, end);
			/* 224 */this.ExBufferSize = Integer.valueOf(PacksizeStr.trim()).intValue();
			/* 225 */return _xmlsize;
		}
		/* 227 */return -1;
	}

	private String GetFormatString(String str) {
		/* 231 */String _lenstr = "";
		/* 232 */for (int i = 0; i < 8 - str.length(); i++) {
			/* 233 */_lenstr = _lenstr.concat("0");
		}
		/* 235 */_lenstr = _lenstr.concat(str);
		/* 236 */return _lenstr;
	}

	private String GetPackHead(int packlen) {
		/* 240 */String _str = Integer.toString(packlen);
		/* 241 */String _lenstr = GetFormatString(_str);

		/* 243 */String _HeadStr = "BindingHandle=00000000|CF_SEND_PARAM:Id=00000010|ParamXMLStreamSize=" + _lenstr
				+ "\r\n";
		/* 244 */return _HeadStr;
	}
}
