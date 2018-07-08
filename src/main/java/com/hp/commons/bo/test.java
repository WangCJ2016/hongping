package com.hp.commons.bo;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

public class test {
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		String strx = "{'header':{'namespace':'test','name':'test','messageId':'test','payLoadVersion':1},'playload':{'accessToken':'test'}}";

		Map<String, JSONObject> maps = (Map<String, JSONObject>) JSON.parse(strx);

		JSONObject header = maps.get("header");
		System.out.println("namespace:" + header.get("namespace"));
		System.out.println("name:" + header.get("name"));
		System.out.println("messageId:" + header.get("messageId"));
		System.out.println("payLoadVersion:" + header.get("payLoadVersion"));

		JSONObject playload = maps.get("playload");
		System.out.println("accessToken:" + playload.get("accessToken"));

		maps = new HashMap<String, JSONObject>();
		header = new JSONObject();
		header.put("namespace", "testx");
		header.put("name", "testx");
		header.put("messageId", "testx");
		header.put("payLoadVersion", 1);

		playload = new JSONObject();
		playload.put("accessToken", "testx");

		maps.put("header", header);
		maps.put("playload", playload);
		System.out.println(JSON.toJSON(maps));

		// String str = "a,b,c,d";
		// String strPM = "a,b,c,f";
		// getPMIds(str, strPM);
		//
		// System.out.println(Base64Utils.encodeToken("WB-SQ-DJ-HP2017"));
		// System.out.println(Base64Utils.decodeToken("VmpCSmRGVXhSWFJTUlc5MFUwWkJlVTFFUlRNPQ=="));
	}

	private static Map<String, Object> getPMIds(String ids, String idsx) {
		String plusIds = idsx;
		for (String s : ids.split(",")) {
			plusIds = plusIds.replace(s, "");
		}

		StringBuffer plusIdsx = new StringBuffer();
		for (String s : plusIds.split(",")) {
			if (StringUtils.isNotBlank(s)) {
				plusIdsx.append(s + ",");
			}
		}

		String minusIds = ids;
		for (String s : idsx.split(",")) {
			minusIds = minusIds.replace(s, "");
		}

		StringBuffer minusIdsx = new StringBuffer();
		for (String s : minusIds.split(",")) {
			if (StringUtils.isNotBlank(s)) {
				minusIdsx.append(s + ",");
			}
		}

		Map<String, Object> map = new HashMap<String, Object>();
		if (StringUtils.isNotBlank(plusIdsx)) {
			map.put("plusIds", plusIdsx.toString().substring(0, plusIdsx.toString().length() - 1));
		}
		if (StringUtils.isNotBlank(minusIdsx)) {
			map.put("minusIds", minusIdsx.toString().substring(0, minusIdsx.toString().length() - 1));
		}

		System.out.println("增加：" + map.get("plusIds"));
		System.out.println("减少：" + map.get("minusIds"));
		return map;
	}
}
