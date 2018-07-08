package com.hp.commons.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class TokenUtil {

	private static TokenUtil instance = new TokenUtil();

	private Long previous;

	protected TokenUtil() {
	}

	public static TokenUtil getInstance() {
		return instance;
	}

	public static void main(String[] args) {
		UUID uuid = UUID.randomUUID();
		System.out.println(uuid);
	}

	// UUID
	public synchronized String generateTokenUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public synchronized String generateID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	// MD5
	public synchronized String generateToken(String id) {
		try {
			Long current = System.currentTimeMillis();
			if (current == previous) {
				current++;
			}
			previous = current;

			// byte now[] = (current+"").toString().getBytes();
			byte now[] = (new Long(current)).toString().getBytes();
			MessageDigest md = MessageDigest.getInstance("MD5");

			md.update(id.getBytes());
			md.update(now);
			return toHex(md.digest());
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}

	private String toHex(byte buffer[]) {
		StringBuffer sb = new StringBuffer(buffer.length * 2);
		for (int i = 0; i < buffer.length; i++) {
			sb.append(Character.forDigit((buffer[i] & 240) >> 4, 16));
			sb.append(Character.forDigit(buffer[i] & 15, 16));
		}

		return sb.toString();
	}

}
