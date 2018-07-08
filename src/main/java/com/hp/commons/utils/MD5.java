package com.hp.commons.utils;

import java.security.MessageDigest;

public class MD5 {

	private MD5() {

	}

	// convert input String to a char[]
	// convert that char[] to byte[]
	// get the md5 digest as byte[]
	// bit-wise AND that byte[] with 0xff
	// prepend "0" to the output StringBuffer to make sure that we don't end
	// up with
	// something like "e21ff" instead of "e201ff"
	public static String compute(String inStr) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		char[] charArray = inStr.toCharArray();
		byte[] byteArray = new byte[charArray.length];

		for (int i = 0; i < charArray.length; i++)
			byteArray[i] = (byte) charArray[i];

		byte[] md5Bytes = md5.digest(byteArray);

		StringBuffer hexValue = new StringBuffer();

		for (int i = 0; i < md5Bytes.length; i++) {
			int val = ((int) md5Bytes[i]) & 0xff;
			if (val < 16)
				hexValue.append("0");
			hexValue.append(Integer.toHexString(val));
		}

		return hexValue.toString().toUpperCase();
	}

	
}
