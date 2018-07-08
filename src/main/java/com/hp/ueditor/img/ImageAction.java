package com.hp.ueditor.img;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;

import org.apache.log4j.Logger;

import com.hp.commons.utils.PropertiesHelper;
import com.hp.manage.web.base.action.BaseAction;

//@Controller("imageAction")
//@Scope("prototype")
public class ImageAction extends BaseAction {

	private static final long serialVersionUID = -3801693039811277885L;

	private static final Logger log = Logger.getLogger(ImageAction.class);

	@SuppressWarnings("deprecation")
	public void imageDownload() throws IOException {

		// String path = new
		// String(request.getServletPath().getBytes("iso-8859-1"),"UTF-8");

		// String fileName=new
		// String(getRequest().getParameter("fileName").getBytes("iso-8859-1"),"UTF-8");
		String fileName = URLDecoder.decode(getRequest().getParameter("fileName"));
		// log.debug("fileName="+fileName);
		InputStream fis = null;
		OutputStream os = null;
		try {
			File file = new File(PropertiesHelper.get("uediter.filepath"), fileName);
			response.setContentType("text/html; charset=UTF-8");
			response.setContentType("image/jpeg");

			fis = new FileInputStream(file);
			os = response.getOutputStream();

			int count = 0;
			byte[] buffer = new byte[1024 * 1024];
			while ((count = fis.read(buffer)) != -1)
				os.write(buffer, 0, count);
			os.flush();

		} catch (Exception e) {
			log.error("文件下载失败", e);
		} finally {
			if (os != null)
				os.close();
			if (fis != null)
				fis.close();
		}
	}
}
