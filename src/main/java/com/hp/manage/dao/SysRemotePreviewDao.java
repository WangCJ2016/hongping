package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QuerySysRemotePreviewBO;
import com.hp.manage.domain.SysRemotePreviewDO;

@Repository
public interface SysRemotePreviewDao {

	public int insertSysRemotePreview(SysRemotePreviewDO preview);

	public int batchInsertSrPreview(List<SysRemotePreviewDO> previews);

	public int updateSysRemotePreview(SysRemotePreviewDO preview);

	public int deleteSysRemotePreview(SysRemotePreviewDO preview);

	public int deleteSrPreviewGroup(String id);

	public SysRemotePreviewDO selectSysRemotePreviewById(String id);

	public List<SysRemotePreviewDO> selectSysRemotePreviewList(QuerySysRemotePreviewBO query);

	public int selectSysRemotePreviewCount(QuerySysRemotePreviewBO query);

	public List<SysRemotePreviewDO> selectSysRemotePreviewPage(QuerySysRemotePreviewBO query);

}
