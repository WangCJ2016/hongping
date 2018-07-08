package com.hp.commons.utils;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class HttpClientUtil {

	private static final Log log = LogFactory.getLog(HttpClientUtil.class);

	public static String getHttp(String url) {
		String responseMsg = "";

		HttpClient httpClient = new HttpClient();

		GetMethod getMethod = new GetMethod(url);

		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());

		try {
			httpClient.executeMethod(getMethod);

			byte[] responseBody = getMethod.getResponseBody();

			responseMsg = new String(responseBody);
			log.info(responseMsg);
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			getMethod.releaseConnection();
		}
		return responseMsg;
	}

	public static String getScienerToken(PostMethod postMethod) {
		String responseMsg = "";

		HttpClient httpClient = new HttpClient();

		httpClient.getParams().setContentCharset("GBK");

		try {
			httpClient.executeMethod(postMethod);

			responseMsg = postMethod.getResponseBodyAsString().trim();
			log.info(responseMsg);
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			postMethod.releaseConnection();
		}
		return responseMsg;
	}

	public static String postHttp(String url, Map<String, String> params) {
		String responseMsg = "";

		HttpClient httpClient = new HttpClient();

		httpClient.getParams().setContentCharset("GBK");

		PostMethod postMethod = new PostMethod(url);

		for (Entry<String, String> entry : params.entrySet()) {
			postMethod.addParameter(entry.getKey(), entry.getValue());
		}

		try {
			httpClient.executeMethod(postMethod);// 200

			responseMsg = postMethod.getResponseBodyAsString().trim();
			log.info(responseMsg);
		} catch (HttpException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 7.释放连接
			postMethod.releaseConnection();
		}
		return responseMsg;
	}
}