package com.hp.commons.utils;

import java.io.IOException;
import java.util.Properties;


public class PropertiesHelper {

	private static Properties prop=new Properties();
	static{
		try {
			prop.load(PropertiesHelper.class.getClassLoader().getResourceAsStream("config.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
	
	public static String get(String key) {
		return prop.getProperty(key);
		
	}
	
}
