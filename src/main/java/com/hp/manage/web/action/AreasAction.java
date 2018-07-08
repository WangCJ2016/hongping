package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.bo.Page;
import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QueryAreaPicturesBO;
import com.hp.manage.bo.QueryAreasBO;
import com.hp.manage.bo.QuerySysDeviceAreaBO;
import com.hp.manage.domain.AreaPicturesDO;
import com.hp.manage.domain.AreasDO;
import com.hp.manage.service.AreaPicturesService;
import com.hp.manage.service.AreasService;
import com.hp.manage.service.SysDeviceAreaService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("areasAction")
public class AreasAction extends BaseAction {
	/** －－－－－－－－－－－－－－区域管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	AreasService areasService;

	@Autowired
	SysDeviceAreaService sysDeviceAreaService;

	@Autowired
	AreaPicturesService areaPicturesService;

	public void getAreasInfo() {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			AreasDO areas = areasService.queryAreasById(id).getModule();
			if (null != areas) {
				result.setDataObject(areas);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->getAreasInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createAreas() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			if (StringUtils.isBlank(accountId)) {
				result.setSuccess(false);
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String name = getParameter("name", "");
			if (StringUtils.isBlank(name)) {
				result.setSuccess(false);
				result.setMsg("请传入区域名称");
				responseJsonp(result);
				return;
			}

			String parentId = getParameter("parentId", "");
			Integer level = getParameter("level", 0);

			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			AreasDO areasx = new AreasDO();
			areasx.setId(TokenUtil.getInstance().generateID());
			areasx.setParentId(parentId);
			areasx.setLevel(level);
			areasx.setName(name);

			areasx.setCreateUserId(accountId);

			BaseResultDTO resultx = areasService.createAreas(areasx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(areasx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->createAreas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifyAreas() {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String accountId = getParameter("accountId", "");
			if (StringUtils.isBlank(accountId)) {
				result.setSuccess(false);
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			String parentId = getParameter("parentId", "");

			Integer level = getParameter("level", 0);
			String name = getParameter("name", "");
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
			}

			Integer isDelete = getParameter("isDelete", -1);

			AreasDO areasx = areasService.queryAreasById(id).getModule();
			areasx.setModifyUserId(accountId);
			if (isDelete > 0) {
				QuerySysDeviceAreaBO query = new QuerySysDeviceAreaBO();
				query.setAreaId(id);
				if (CollectionUtils.isNotEmpty(sysDeviceAreaService.querySysDeviceAreaList(query).getModule())) {
					result.setSuccess(false);
					result.setMsg("此区域已绑定设备，请取消绑定后删除！");
					responseJsonp(result);
					return;
				}

				areasx.setIsDelete(isDelete);
			} else {
				QueryAreasBO query = new QueryAreasBO();
				if (!areasx.getName().equals(name)) {
					query.setName(name);

					List<AreasDO> areas = areasService.queryAreasList(query).getModule();
					if (CollectionUtils.isNotEmpty(areas)) {
						result.setSuccess(false);
						result.setMsg("该区域已存在，请重新输入！");
						responseJsonp(result);
						return;
					}
				}

				areasx.setParentId(parentId);
				areasx.setLevel(level);
				areasx.setName(name);
			}

			BaseResultDTO resultx = areasService.modifyAreas(areasx);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			result.setDataObject(areasx);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->modifyAreas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryAreasPage() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		Page<AreasDO> page = new Page<AreasDO>();
		try {
			if (!checkWhetherLogin()) {
				page.setSuccess(false);
				page.setMsg("未登录");
				responseJsonp(page);
				return;
			}

			int pageNo = getParameter("pageNo", 0);
			int pageSize = getParameter("pageSize", 15);

			String name = getParameter("name", "");

			QueryAreasBO query = new QueryAreasBO();
			query.setPageNo(pageNo);
			query.setPageSize(pageSize);
			if (StringUtils.isNotBlank(name)) {
				name = URLDecoder.decode(name, "UTF-8");
				query.setName(name);
			}

			BatchResultDTO<AreasDO> result = areasService.queryAreasPage(query);
			if (result.isFailed()) {
				page.setSuccess(false);
				page.setMsg(result.getErrorDetail());
				responseJsonp(page);
				return;
			}

			createPage(page, result.getModule(), query);
			responseJsonp(page);
		} catch (Exception e) {
			logger.error("AreasAction-->queryAreasPage:", e);
			page.setSuccess(false);
			responseJsonp(page);
		}
	}

	public void queryAreas() {
		response.setHeader("Access-Control-Allow-Origin", "*");
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String parentId = getParameter("parentId", "");

			QueryAreasBO query = new QueryAreasBO();
			query.setParentId(parentId);

			BatchResultDTO<AreasDO> resultx = areasService.queryAreasList(query);
			if (resultx.isFailed()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
				responseJsonp(result);
				return;
			}
			result.setDataObject(resultx.getModule());
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->queryAreas:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void queryPictureByAreaId() {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			QueryAreaPicturesBO query = new QueryAreaPicturesBO();
			query.setAreaId(id);
			List<AreaPicturesDO> pictures = areaPicturesService.queryAreaPicturesList(query).getModule();
			if (CollectionUtils.isNotEmpty(pictures)) {
				AreaPicturesDO picturez = pictures.get(0);
				result.setDataObject(picturez);
			} else {
				result.setSuccess(false);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->queryPictureByAreaId:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void uploadAreaImg() {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			String picture = getParameter("picture", "");
			String pictureX = getParameter("pictureX", "");

			QueryAreaPicturesBO query = new QueryAreaPicturesBO();
			query.setAreaId(id);
			List<AreaPicturesDO> pictures = areaPicturesService.queryAreaPicturesList(query).getModule();
			if (CollectionUtils.isNotEmpty(pictures)) {
				AreaPicturesDO picturez = pictures.get(0);

				if (StringUtils.isNotBlank(picture)) {
					picturez.setPicture(picture);
				}
				if (StringUtils.isNotBlank(pictureX)) {
					picturez.setPicturex(pictureX);
				}

				areaPicturesService.modifyAreaPictures(picturez);
				result.setDataObject(picturez);
			} else {
				AreaPicturesDO picturez = new AreaPicturesDO();
				picturez.setId(TokenUtil.getInstance().generateID());
				if (StringUtils.isNotBlank(picture)) {
					picturez.setPicture(picture);
				}
				if (StringUtils.isNotBlank(pictureX)) {
					picturez.setPicturex(pictureX);
				}
				picturez.setAreaId(id);

				areaPicturesService.createAreaPictures(picturez);
				result.setDataObject(picturez);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->uploadAreaImg:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void deleteAreaImg() {
		response.setHeader("Access-Control-Allow-Origin", "*");
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
				result.setMsg("请传入区域ID");
				responseJsonp(result);
				return;
			}

			BaseResultDTO resultx = areaPicturesService.deleteByAreaId(id);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg(resultx.getErrorDetail());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("AreasAction-->deleteAreaImg:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
