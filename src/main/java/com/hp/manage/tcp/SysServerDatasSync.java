package com.hp.manage.tcp;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import com.hp.manage.bo.QuerySysServersBO;
import com.hp.manage.domain.SysBroadcastHostsDO;
import com.hp.manage.domain.SysCommHostsDO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemoteHostsDO;
import com.hp.manage.domain.SysServersDO;
import com.hp.manage.service.SysServersService;

public class SysServerDatasSync {

	public static Object syncDatas(String ip, Integer port, Object object) throws Exception {
		SysServersDO server = (SysServersDO) object;
		try {
			TTcpClient tcpclient = new TTcpClient();
			tcpclient.SetRemoteIPPort(ip, port);

			TPack pack = new TPack();
			pack.setFunNo("THeartBeat.GetSoftServer");

			pack = tcpclient.ReuqestPack(pack);
			if (!pack.getErrNo().equalsIgnoreCase("1")) {
				tcpclient.close();
				return object;
			}

			for (int i = 1; i <= pack.RecordCount();) {
				int CpuPercent = Integer.valueOf(pack.FieldByName(i, "CpuPercent")).intValue();
				int MemoryPercent = Integer.valueOf(pack.FieldByName(i, "MemoryPercent")).intValue();
				server.setCpuPercent(CpuPercent);
				server.setMemoryPercent(MemoryPercent);
				break;
			}

			tcpclient.close();
		} catch (Exception e) {
			return server;
		}
		return server;
	}

	public static void ctrlEntranceGuard(SysServersService sysServersService, String vid, String deviceType,
			String controlValue) throws Exception {
		TTcpClient tcpclient = new TTcpClient();

		QuerySysServersBO query = new QuerySysServersBO();
		query.setType(7);// 辅助服务
		List<SysServersDO> servers = sysServersService.querySysServersList(query).getModule();
		if (CollectionUtils.isNotEmpty(servers)) {
			tcpclient.SetRemoteIPPort(servers.get(0).getInnerIp(), Integer.valueOf(servers.get(0).getPort()));

			TPack pack = new TPack();

			pack.setFunNo("THeartBeat.Control");
			pack.SetFieldValue(1, "vid", vid);
			pack.SetFieldValue(1, "DeviceType", deviceType);
			pack.SetFieldValue(1, "ControlValue", controlValue);

			pack = tcpclient.ReuqestPack(pack);

			tcpclient.close();
		}
	}

	public static void dataChange(SysServersService sysServersService) throws Exception {
		TTcpClient tcpclient = new TTcpClient();

		QuerySysServersBO query = new QuerySysServersBO();
		query.setType(7);// 辅助服务
		List<SysServersDO> servers = sysServersService.querySysServersList(query).getModule();
		if (CollectionUtils.isNotEmpty(servers)) {
			tcpclient.SetRemoteIPPort(servers.get(0).getInnerIp(), Integer.valueOf(servers.get(0).getPort()));

			TPack pack = new TPack();
			pack.setFunNo("THeartBeat.GetSoftServer");
			pack.SetFieldValue(1, "CMSIP", "http://" + InetAddress.getLocalHost().getHostAddress() + ":8111/hp/manage");
			pack.SetFieldValue(1, "ServerID", String.valueOf(servers.get(0).getVid()));
			pack.SetFieldValue(1, "DataChanged", "1");

			pack = tcpclient.ReuqestPack(pack);

			tcpclient.close();
		}
	}

	public static List<Object> syncDatas(String ip, Integer port, String funNo) throws Exception {
		TTcpClient tcpclient = new TTcpClient();
		tcpclient.SetRemoteIPPort(ip, port);

		TPack pack = new TPack();
		pack.setFunNo("THeartBeat." + funNo);

		pack = tcpclient.ReuqestPack(pack);
		if (!pack.getErrNo().equalsIgnoreCase("1")) {
			// String error = pack.getErrMsg();
			tcpclient.close();
			return null;
		}
		// HBRemoteHost HBRemoteChannel HBBroadcastHosts
		List<Object> objects = new ArrayList<Object>();
		if (funNo.equals("HBRemoteHost")) {
			for (int i = 1; i <= pack.RecordCount(); i++) {
				SysRemoteHostsDO host = new SysRemoteHostsDO();

				String ID = pack.FieldByName(i, "ID");
				String Name = pack.FieldByName(i, "Name");
				String IPAddr = pack.FieldByName(i, "IPAddr");

				if (StringUtils.isNotBlank(pack.FieldByName(i, "Status"))) {
					int Status = Integer.valueOf(pack.FieldByName(i, "Status"));
					host.setStatus(Status);
				} else {
					host.setStatus(-1);
				}

				host.setId(ID);
				host.setName(Name);
				host.setUrl(IPAddr);

				objects.add(host);
			}
		} else if (funNo.equals("HBRemoteChannel")) {
			for (int i = 1; i <= pack.RecordCount(); i++) {
				SysRemoteChannelsDO channel = new SysRemoteChannelsDO();

				String ID = pack.FieldByName(i, "ID");
				String Name = pack.FieldByName(i, "Name");
				String RemoteHostName = pack.FieldByName(i, "RemoteHostName");

				if (StringUtils.isNotBlank(pack.FieldByName(i, "RemoteHostItemIndex"))) {
					String RemoteHostItemIndex = pack.FieldByName(i, "RemoteHostItemIndex");
					channel.setIndex(RemoteHostItemIndex);
				} else {
					channel.setIndex("-1");
				}
				if (StringUtils.isNotBlank(pack.FieldByName(i, "Status"))) {
					int Status = Integer.valueOf(pack.FieldByName(i, "Status"));
					channel.setStatus(Status);
				} else {
					channel.setStatus(-1);
				}

				channel.setId(ID);
				channel.setName(Name);
				channel.setRemoteHostName(RemoteHostName);

				objects.add(channel);
			}
		} else if (funNo.equals("HBBroadcastHosts")) {
			for (int i = 1; i <= pack.RecordCount(); i++) {
				SysBroadcastHostsDO host = new SysBroadcastHostsDO();

				String ID = pack.FieldByName(i, "ID");
				String Name = pack.FieldByName(i, "Name");
				String IPAddr = pack.FieldByName(i, "IPAddr");

				if (StringUtils.isNotBlank(pack.FieldByName(i, "Status"))) {
					int Status = Integer.valueOf(pack.FieldByName(i, "Status"));
					host.setStatus(Status);
				} else {
					host.setStatus(-1);
				}

				host.setId(ID);
				host.setName(Name);
				host.setIp(IPAddr);

				objects.add(host);
			}
		} else if (funNo.equals("HBAuxiliaryDevice")) {
			for (int i = 1; i <= pack.RecordCount(); i++) {
				SysCommHostsDO host = new SysCommHostsDO();

				String DeviceName = pack.FieldByName(i, "DeviceName");
				String DeviceType = pack.FieldByName(i, "DeviceType");

				if (StringUtils.isNotBlank(pack.FieldByName(i, "Status"))) {
					int Status = Integer.valueOf(pack.FieldByName(i, "Status"));
					host.setStatus(Status);
				} else {
					host.setStatus(-1);
				}
				host.setName(DeviceName);
				host.setType(Integer.valueOf(DeviceType));

				objects.add(host);
			}
		}

		tcpclient.close();
		return objects;
	}
}
