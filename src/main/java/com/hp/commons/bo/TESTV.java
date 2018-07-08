package com.hp.commons.bo;

import java.io.File;
import java.io.IOException;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.SCPClient;

public class TESTV {

	private static String IP = "47.100.123.83";
	private static int PORT = 22;
	private static String USER = "root";// 登录用户名
	private static String PASSWORD = "a-j-k-6-8-0571";// 生成私钥的密码和登录密码，这两个共用这个密码
	private static Connection connection = new Connection(IP, PORT);

	/**
	 * ssh用户登录验证，使用用户名和密码来认证
	 * 
	 * @param user
	 * @param password
	 * @return
	 */
	public static boolean isAuthedWithPassword(String user, String password) {
		try {
			return connection.authenticateWithPassword(user, password);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * ssh用户登录验证，使用用户名、私钥、密码来认证 其中密码如果没有可以为null，生成私钥的时候如果没有输入密码，则密码参数为null
	 * 
	 * @param user
	 * @param privateKey
	 * @param password
	 * @return
	 */
	public static boolean isAuthedWithPublicKey(String user, File privateKey, String password) {
		try {
			return connection.authenticateWithPublicKey(user, privateKey, password);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}

	public static boolean isAuth() {
		return isAuthedWithPassword(USER, PASSWORD);
	}

	public static void getFile(String remoteFile, String path) {
		try {
			connection.connect();
			boolean isAuthed = isAuth();
			if (isAuthed) {
				System.out.println("认证成功!");
				SCPClient scpClient = connection.createSCPClient();
				scpClient.get(remoteFile, path);
			} else {
				System.out.println("认证失败!");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			connection.close();
		}
	}

	public static void putFile(String localFile, String remoteTargetDirectory) {
		try {
			connection.connect();
			boolean isAuthed = isAuth();
			if (isAuthed) {
				SCPClient scpClient = connection.createSCPClient();
				scpClient.put(localFile, remoteTargetDirectory);
			} else {
				System.out.println("认证失败!");
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			connection.close();
		}
	}

	public static void main(String[] args) {
		try {
			//getFile("/usr/FILE/timg.jpeg", "/Users/jujunpo/Desktop/A");
			putFile("/Users/jujunpo/Desktop/A/", "/usr/FILE/");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}