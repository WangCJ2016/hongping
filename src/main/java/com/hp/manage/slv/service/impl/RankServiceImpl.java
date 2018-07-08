package com.hp.manage.slv.service.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.slv.bo.QueryRankBO;
import com.hp.manage.slv.dao.RankDao;
import com.hp.manage.slv.domain.RankDO;
import com.hp.manage.slv.service.RankService;

@Service("rankService")
public class RankServiceImpl implements RankService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RankDao rankDao;

	@Override
	public ResultDTO<RankDO> queryRankById(Integer id) {
		ResultDTO<RankDO> result = new ResultDTO<RankDO>();
		try {
			RankDO rank = rankDao.selectRankById(id);
			if (null == rank) {
				result.setSuccess(false);
				result.setErrorDetail("该SLV职务不存在！");
				return result;
			}

			result.setModule(rank);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV职务失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV职务失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<RankDO> queryRankList(QueryRankBO query) {
		BatchResultDTO<RankDO> result = new BatchResultDTO<RankDO>();
		try {
			List<RankDO> list = rankDao.selectRankList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询SLV职务列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询SLV职务列表失败！");
		}
		return result;
	}

}
