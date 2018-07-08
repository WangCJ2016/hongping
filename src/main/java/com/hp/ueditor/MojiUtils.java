package com.hp.ueditor;

import java.io.IOException;

import fm.last.moji.spring.SpringMojiBean;


public class MojiUtils {

	 private static SpringMojiBean moji;
	
	public static SpringMojiBean getMoji() throws IOException{
		
		if (moji==null) {
			
			moji = new SpringMojiBean();
			moji.setAddressesCsv("121.40.204.99:7001");
			moji.setDomain("images");
			moji.initialise();
			moji.setTestOnBorrow(true);
		}
        return moji;
        
	}
	
}
