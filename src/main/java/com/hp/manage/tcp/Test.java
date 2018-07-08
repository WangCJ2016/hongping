package com.hp.manage.tcp;

import java.net.InetAddress;

import com.hp.manage.domain.SysServersDO;

public class Test {
	public static void main(String[] args) throws Exception {
		// SysServerDatasSync.syncDatas("192.168.0.201", 9600,
		// "HBBroadcastHosts");
		System.out.println(InetAddress.getLocalHost().getHostAddress());
	}
}
