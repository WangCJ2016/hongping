package com.hp.ueditor.upload;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.hp.ueditor.PathFormat;
import com.hp.ueditor.define.AppInfo;
import com.hp.ueditor.define.BaseState;
import com.hp.ueditor.define.FileType;
import com.hp.ueditor.define.State;

public class BinaryUploader {
	static Logger logger = LoggerFactory.getLogger(BinaryUploader.class);

	public static final State save(HttpServletRequest request, Map<String, Object> conf) {
		FileItemStream fileStream = null;
		boolean isAjaxUpload = request.getHeader("X_Requested_With") != null;

		if (!ServletFileUpload.isMultipartContent(request)) {
			return new BaseState(false, AppInfo.NOT_MULTIPART_CONTENT);
		}

		ServletFileUpload upload = new ServletFileUpload(new DiskFileItemFactory());

		if (isAjaxUpload) {
			upload.setHeaderEncoding("UTF-8");
		}

		try {
			FileItemIterator iterator = upload.getItemIterator(request);

			while (iterator.hasNext()) {
				fileStream = iterator.next();

				if (!fileStream.isFormField())
					break;
				fileStream = null;
			}

			if (fileStream == null) {
				return new BaseState(false, AppInfo.NOTFOUND_UPLOAD_DATA);
			}

			String savePath = (String) conf.get("savePath");
			String originFileName = fileStream.getName();
			String suffix = FileType.getSuffixByFilename(originFileName);

			originFileName = originFileName.substring(0, originFileName.length() - suffix.length());
			savePath = savePath + suffix;

			long maxSize = ((Long) conf.get("maxSize")).longValue();

			if (!validType(suffix, (String[]) conf.get("allowFiles"))) {
				return new BaseState(false, AppInfo.NOT_ALLOW_FILE_TYPE);
			}

			savePath = PathFormat.parse(savePath, originFileName);

			String physicalPath = (String) conf.get("rootPath") + savePath;

			InputStream is = fileStream.openStream();
			State storageState = StorageManager.saveFileByInputStream(is, physicalPath, maxSize);
			is.close();

			if (storageState.isSuccess()) {
				storageState.putInfo("url",
						PathFormat.format(savePath).substring(0, PathFormat.format(savePath).lastIndexOf(".")));
				storageState.putInfo("type", suffix);
				storageState.putInfo("original", originFileName + suffix);
			}

			return storageState;
		} catch (FileUploadException e) {
			return new BaseState(false, AppInfo.PARSE_REQUEST_ERROR);
		} catch (IOException e) {
		}
		return new BaseState(false, AppInfo.IO_ERROR);
	}

	private static boolean validType(String type, String[] allowTypes) {
		List<String> list = Arrays.asList(allowTypes);

		return list.contains(type);
	}

	public static State upload(HttpServletRequest request, Map<String, Object> conf) {
		State state = null;
		try {
			request.setCharacterEncoding("UTF-8");
			DiskFileItemFactory factory = new DiskFileItemFactory();
			ServletFileUpload upload = new ServletFileUpload(factory);

			List<FileItem> items = upload.parseRequest(request);
			Iterator<FileItem> itr = items.iterator();
			while (itr.hasNext()) {
				FileItem item = (FileItem) itr.next();
				if (item.isFormField()) {
					return new BaseState(false, AppInfo.NOTFOUND_UPLOAD_DATA);
				} else {
					if (item.getName() != null && !item.getName().equals("")) {

						File tempFile = new File(item.getName());

						String url = request.getSession().getServletContext().getRealPath("/");

						String fileName = uploadFileName() + FileType.getSuffixByFilename(tempFile.getName());

						File file = new File(url + "/hp/", fileName);
						item.write(file);

						state = new BaseState(true);
						state.putInfo("size", tempFile.length());
						state.putInfo("title", tempFile.getName().substring(0, tempFile.getName().indexOf(".")));
						String suffix = FileType.getSuffixByFilename(tempFile.getName());

						state.putInfo("url", request.getContextPath() + "/hp/" + fileName);
						state.putInfo("type", suffix);
						state.putInfo("original", tempFile.getName());
					}

				}
			}
		} catch (FileUploadException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("upload.message", "上传文件失败！");
		}
		return state;
	}

	private static String uploadFileName() {
		SimpleDateFormat sdf = new SimpleDateFormat("yy-M-d mm:ss:SSS");
		Random random = new Random();
		String time = sdf.format(new Date());
		String time1 = time.replaceAll(" ", "-").replaceAll("-", "").replaceAll(":", "");
		int a = random.nextInt(90) + 10;
		String fileName = time1 + a;
		return fileName;
	}
}
