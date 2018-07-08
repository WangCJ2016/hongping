package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryCategoryFilesBO;
import com.hp.manage.bo.QueryCategorysBO;
import com.hp.manage.domain.CategoryFilesDO;
import com.hp.manage.domain.CategorysDO;
import com.hp.manage.service.CategoryFilesService;
import com.hp.manage.service.CategorysService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("categorysAction")
public class CategorysAction extends BaseAction {
	/** －－－－－－－－－－－－－－目录管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	CategorysService categorysService;

	@Autowired
	CategoryFilesService categoryFilesService;

	public void getCategorysInfo() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String id = getParameter("id", "");
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入目录ID");
				responseJsonp(result);
				return;
			}

			CategorysDO category = categorysService.queryCategorysById(id).getModule();
			if (null != category) {
				result.setDataObject(category);
			}

			result.setSuccess(true);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->getCategorysInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createCategorys() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String categoryx = getParameter("category", "");
			String parentId = getParameter("parentId", "");
			Integer level = getParameter("level", 0);

			CategorysDO category = new CategorysDO();
			category.setId(TokenUtil.getInstance().generateID());

			if (StringUtils.isNotBlank(categoryx)) {
				categoryx = URLDecoder.decode(categoryx, "UTF-8");
			}
			category.setCategory(categoryx);
			category.setParentId(parentId);
			category.setLevel(level);

			BaseResultDTO resultx = categorysService.createCategorys(category);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}

			result.setSuccess(true);
			result.setDataObject(category);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->createCategorys:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyCategorys() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String id = getParameter("id", "");
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入目录ID");
				responseJsonp(result);
				return;
			}

			String categoryx = getParameter("category", "");
			if (StringUtils.isNotBlank(categoryx)) {
				categoryx = URLDecoder.decode(categoryx, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", -1);

			CategorysDO category = categorysService.queryCategorysById(id).getModule();
			if (isDelete > 0) {
				QueryCategorysBO queryx = new QueryCategorysBO();
				queryx.setParentId(category.getId());
				List<CategorysDO> categorys = categorysService.queryCategorysList(queryx).getModule();
				if (CollectionUtils.isNotEmpty(categorys)) {
					result.setSuccess(false);
					result.setMsg("该目录下已存在子目录，请先删除子目录！");
					responseJsonp(result);
					return;
				}

				QueryCategoryFilesBO query = new QueryCategoryFilesBO();
				query.setCategoryId(category.getId());
				List<CategoryFilesDO> files = categoryFilesService.queryCategoryFilesList(query).getModule();
				if (CollectionUtils.isNotEmpty(files)) {
					result.setSuccess(false);
					result.setMsg("该目录下已存在文件，请先删除文件！");
					responseJsonp(result);
					return;
				}

				category.setIsDelete(1);
			} else {
				QueryCategorysBO query = null;
				if (!category.getCategory().equals(categoryx)) {
					query = new QueryCategorysBO();
					query.setCategory(categoryx);

					List<CategorysDO> categorys = categorysService.queryCategorysList(query).getModule();
					if (CollectionUtils.isNotEmpty(categorys)) {
						result.setSuccess(false);
						result.setMsg("该目录已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				category.setCategory(categoryx);
			}

			BaseResultDTO resultx = categorysService.modifyCategorys(category);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}

			result.setSuccess(true);
			result.setDataObject(category);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->modifyCategorys:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryCategorysByParentId() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String parentId = getParameter("parentId", "");

			QueryCategorysBO query = new QueryCategorysBO();
			if (StringUtils.isNotBlank(parentId)) {
				query.setParentId(parentId);
			}

			BatchResultDTO<CategorysDO> resultx = categorysService.queryCategorysList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
				responseJsonp(result);
				return;
			}

			result.setSuccess(true);
			result.setDataObject(resultx.getModule());
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->queryCategorysByParentId:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryCategorys() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String type = getParameter("type", "");// top
			QueryCategorysBO query = new QueryCategorysBO();
			if (StringUtils.isNotBlank(type) && type.equals("top")) {
				query.setLevel(0);
			}

			BatchResultDTO<CategorysDO> resultx = categorysService.queryCategorysList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
				responseJsonp(result);
				return;
			}

			result.setSuccess(true);
			result.setDataObject(resultx.getModule());
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->queryCategorys:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createCategoryFile() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String title = getParameter("title", "");
			String categoryId = getParameter("categoryId", "");
			String content = getParameter("content", "");

			if (StringUtils.isNotBlank(title)) {
				title = URLDecoder.decode(title, "UTF-8");
			}

			CategoryFilesDO file = new CategoryFilesDO();
			file.setId(TokenUtil.getInstance().generateID());
			file.setTitle(title);
			file.setCategoryId(categoryId);
			file.setContent(content);

			BaseResultDTO resultx = categoryFilesService.createCategoryFiles(file);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}

			result.setSuccess(true);
			result.setDataObject(file);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->createCategoryFile:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyCategoryFile() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String id = getParameter("id", "");
			if (StringUtils.isBlank(id)) {
				result.setSuccess(false);
				result.setMsg("请传入目录ID");
				responseJsonp(result);
				return;
			}

			CategoryFilesDO file = categoryFilesService.queryCategoryFilesById(id).getModule();
			file.setIsDelete(1);

			BaseResultDTO resultx = categoryFilesService.modifyCategoryFiles(file);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}

			result.setSuccess(true);
			result.setDataObject(file);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->modifyCategoryFile:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryCategoryFiles() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String categoryId = getParameter("categoryId", "");

			QueryCategoryFilesBO query = new QueryCategoryFilesBO();
			query.setCategoryId(categoryId);

			BatchResultDTO<CategoryFilesDO> resultx = categoryFilesService.queryCategoryFilesList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
				responseJsonp(result);
				return;
			}

			result.setSuccess(true);
			result.setDataObject(resultx.getModule());
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("CategorysAction-->queryCategoryFiles:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
