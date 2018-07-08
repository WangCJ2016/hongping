package com.hp.manage.service;

import java.util.List;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QuerySysRemotePreviewBO;
import com.hp.manage.domain.SysRemotePreviewDO;

public interface SysRemotePreviewService {

	public BaseResultDTO createSysRemotePreview(SysRemotePreviewDO preview);

	public BaseResultDTO batchCreateSrPreview(List<SysRemotePreviewDO> previews);

	public BaseResultDTO modifySysRemotePreview(SysRemotePreviewDO preview);

	public BaseResultDTO deleteSysRemotePreview(SysRemotePreviewDO preview);

	public BaseResultDTO deleteSrPreviewGroup(String id);

	public ResultDTO<SysRemotePreviewDO> querySysRemotePreviewById(String id);

	public BatchResultDTO<SysRemotePreviewDO> querySysRemotePreviewList(QuerySysRemotePreviewBO query);

	public BatchResultDTO<SysRemotePreviewDO> querySysRemotePreviewPage(QuerySysRemotePreviewBO query);
}
