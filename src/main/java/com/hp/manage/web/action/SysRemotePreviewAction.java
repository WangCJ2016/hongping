package com.hp.manage.web.action;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.result.ActionResult;
import com.hp.commons.utils.TokenUtil;
import com.hp.manage.bo.QuerySysRemotePreviewBO;
import com.hp.manage.domain.SysRemoteChannelsDO;
import com.hp.manage.domain.SysRemotePreviewDO;
import com.hp.manage.service.SysRemoteChannelsService;
import com.hp.manage.service.SysRemotePreviewService;
import com.hp.manage.web.base.action.BaseAction;

@Scope("prototype")
@Controller("sysRemotePreviewAction")
public class SysRemotePreviewAction extends BaseAction {
	/** －－－－－－－－－－－－－－服务器管理－－－－－－－－－－－－－－ */
	private static final long serialVersionUID = -1418462209902674147L;

	@Autowired
	SysRemotePreviewService sysRemotePreviewService;

	@Autowired
	SysRemoteChannelsService sysRemoteChannelsService;

	public void getSysRemotePreviewInfo() {
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
				result.setMsg("请传入服务器ID");
				responseJsonp(result);
				return;
			}

			SysRemotePreviewDO preview = sysRemotePreviewService.querySysRemotePreviewById(id).getModule();
			if (null != preview) {
				result.setDataObject(preview);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->getSysRemotePreviewInfo:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSrPreviewGroup() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String title = getParameter("title", "");
			if (StringUtils.isBlank(title)) {
				result.setSuccess(false);
				result.setMsg("请传入预览组名称");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(title)) {
				title = URLDecoder.decode(title, "UTF-8");
			}

			Integer devType = getParameter("devType", 0);
			if (devType <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			SysRemotePreviewDO preview = new SysRemotePreviewDO();
			preview.setId(TokenUtil.getInstance().generateID());
			preview.setTitle(title);
			preview.setDevType(devType);
			preview.setParentId("0");

			sysRemotePreviewService.createSysRemotePreview(preview);

			result.setDataObject(preview);
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->createSrPreviewGroup:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySrPreviewGroups() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			Integer devType = getParameter("devType", 0);
			if (devType <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			QuerySysRemotePreviewBO query = new QuerySysRemotePreviewBO();
			query.setParentId("0");
			query.setDevType(devType);

			List<SysRemotePreviewDO> groups = sysRemotePreviewService.querySysRemotePreviewList(query).getModule();
			if (CollectionUtils.isNotEmpty(groups)) {

				for (SysRemotePreviewDO group : groups) {
					query = new QuerySysRemotePreviewBO();
					query.setParentId(group.getId());
					List<SysRemotePreviewDO> previews = sysRemotePreviewService.querySysRemotePreviewList(query)
							.getModule();
					for (SysRemotePreviewDO preview : previews) {
						SysRemoteChannelsDO channel = sysRemoteChannelsService.querySysRemoteChannelsById(
								preview.getDevId()).getModule();
						if (null != channel) {
							preview.setDevName(channel.getName());
						}
					}

					group.setPreviews(previews);
				}

				result.setDataObject(groups);
			} else {
				result.setDataObject(new ArrayList<SysRemotePreviewDO>());
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->querySrPreviewGroups:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySrPreviewGroup() {
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
				result.setMsg("请传入操作人员ID");
				responseJsonp(result);
				return;
			}

			Integer devType = getParameter("devType", 0);
			Integer isDelete = getParameter("isDelete", -1);

			SysRemotePreviewDO preview = sysRemotePreviewService.querySysRemotePreviewById(id).getModule();
			if (isDelete >= 0) {
				if (devType <= 0) {
					result.setSuccess(false);
					result.setMsg("请传入设备类型");
					responseJsonp(result);
					return;
				}

				SysRemotePreviewDO previewx = new SysRemotePreviewDO();
				previewx.setParentId(preview.getId());
				previewx.setDevType(devType);

				sysRemotePreviewService.deleteSysRemotePreview(previewx);

				sysRemotePreviewService.deleteSrPreviewGroup(id);
			} else {
				String title = getParameter("title", "");
				if (StringUtils.isBlank(title)) {
					result.setSuccess(false);
					result.setMsg("请传入预览组名称");
					responseJsonp(result);
					return;
				}

				if (StringUtils.isNotBlank(title)) {
					title = URLDecoder.decode(title, "UTF-8");
				}

				preview.setTitle(title);
				sysRemotePreviewService.modifySysRemotePreview(preview);
				result.setDataObject(preview);
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->modifySysRemotePreview:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void createSysRemotePreview() {
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

			String groupId = getParameter("groupId", "");
			if (StringUtils.isBlank(groupId)) {
				result.setSuccess(false);
				result.setMsg("请传入预览组ID");
				responseJsonp(result);
				return;
			}

			String devIds = getParameter("devIds", "");
			if (StringUtils.isBlank(devIds)) {
				result.setSuccess(false);
				result.setMsg("请传入设备ID");
				responseJsonp(result);
				return;
			}

			Integer devType = getParameter("devType", 0);
			if (devType <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			String[] devIdsx = devIds.split(",");

			List<SysRemotePreviewDO> previews = new ArrayList<SysRemotePreviewDO>();
			for (int i = 0; i < devIdsx.length; i++) {
				SysRemotePreviewDO preview = new SysRemotePreviewDO();
				preview.setId(TokenUtil.getInstance().generateID());
				preview.setDevId(devIdsx[i]);
				preview.setDevType(devType);

				previews.add(preview);
			}

			if (CollectionUtils.isNotEmpty(previews)) {
				BaseResultDTO resultx = sysRemotePreviewService.batchCreateSrPreview(previews);
				if (!resultx.isSuccess()) {
					result.setSuccess(false);
					result.setMsg(resultx.getErrorDetail());
				}
			} else {
				result.setSuccess(false);
			}
			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->createSysRemotePreview:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void modifySysRemotePreview() {
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

			String groupId = getParameter("groupId", "");
			if (StringUtils.isBlank(groupId)) {
				result.setSuccess(false);
				result.setMsg("请传入预览组ID");
				responseJsonp(result);
				return;
			}

			String devIds = getParameter("devIds", "");

			Integer devType = getParameter("devType", 0);
			if (devType <= 0) {
				result.setSuccess(false);
				result.setMsg("请传入设备类型");
				responseJsonp(result);
				return;
			}

			SysRemotePreviewDO preview = new SysRemotePreviewDO();
			preview.setParentId(groupId);
			preview.setDevType(devType);

			BaseResultDTO resultx = sysRemotePreviewService.deleteSysRemotePreview(preview);
			if (!resultx.isSuccess()) {
				result.setSuccess(false);
				result.setMsg("失败");
				responseJsonp(result);
				return;
			}

			if (StringUtils.isNotBlank(devIds)) {
				String[] devIdsx = devIds.split(",");

				List<SysRemotePreviewDO> previews = new ArrayList<SysRemotePreviewDO>();
				for (int i = 0; i < devIdsx.length; i++) {
					SysRemotePreviewDO previewx = new SysRemotePreviewDO();
					previewx.setId(TokenUtil.getInstance().generateID());
					previewx.setParentId(groupId);
					previewx.setDevId(devIdsx[i]);
					previewx.setDevType(devType);

					previews.add(previewx);
				}

				if (CollectionUtils.isNotEmpty(previews)) {
					BaseResultDTO resultz = sysRemotePreviewService.batchCreateSrPreview(previews);
					if (!resultz.isSuccess()) {
						result.setSuccess(false);
						result.setMsg("失败");
					}
				} else {
					result.setSuccess(false);
				}
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->modifySysRemotePreview:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}

	public void querySysRemotePreviews() {
		ActionResult result = new ActionResult();
		try {
			if (!checkWhetherLogin()) {
				result.setSuccess(false);
				result.setMsg("未登录");
				responseJsonp(result);
				return;
			}

			String parentId = getParameter("parentId", "");
			if (StringUtils.isBlank(parentId)) {
				result.setSuccess(false);
				result.setMsg("请传入预览组ID");
				responseJsonp(result);
				return;
			}

			QuerySysRemotePreviewBO query = new QuerySysRemotePreviewBO();
			query.setParentId(parentId);
			List<SysRemotePreviewDO> previews = sysRemotePreviewService.querySysRemotePreviewList(query).getModule();
			if (CollectionUtils.isNotEmpty(previews)) {
				result.setDataObject(previews);
			} else {
				result.setDataObject(new ArrayList<SysRemotePreviewDO>());
			}

			responseJsonp(result);
		} catch (Exception e) {
			logger.error("SysRemotePreviewAction-->querySysRemotePreviews:", e);
			result.setSuccess(false);
			responseJsonp(result);
		}
	}
}
