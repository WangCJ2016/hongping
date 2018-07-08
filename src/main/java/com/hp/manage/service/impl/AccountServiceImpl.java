package com.hp.manage.service.impl;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.dao.AccountDao;
import com.hp.manage.dao.RoleDao;
import com.hp.manage.domain.AccountDO;
import com.hp.manage.domain.RoleDO;
import com.hp.manage.service.AccountService;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private RoleDao roleDao;

	@Override
	@Transactional
	public BaseResultDTO createAccount(AccountDO account) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			QueryAccountBO query = new QueryAccountBO();
			query.setAccountNo(account.getAccountNo());

			List<AccountDO> accounts = accountDao.selectAccountList(query);
			if (CollectionUtils.isNotEmpty(accounts)) {
				result.setSuccess(false);
				result.setErrorDetail("该账号已存在，请重新输入！");
				return result;
			}

			query = new QueryAccountBO();
			query.setTelephone(account.getTelephone());
			accounts = accountDao.selectAccountList(query);
			if (CollectionUtils.isNotEmpty(accounts)) {
				result.setSuccess(false);
				result.setErrorDetail("该手机号码已存在，请重新输入！");
				return result;
			}

			int num = accountDao.insertAccount(account);
			if (num == 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("添加帐号失败！");
			}

		} catch (Exception e) {
			logger.error("添加帐号失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("添加帐号失败！");
			throw e;
		}
		return result;
	}

	@Override
	@Transactional
	public BaseResultDTO modifyAccount(AccountDO account) {
		BaseResultDTO result = new BaseResultDTO();
		try {
			int num = accountDao.updateAccount(account);

			if (num >= 1) {
				result.setSuccess(true);
			} else {
				result.setSuccess(false);
				result.setErrorDetail("修改帐号失败！");
			}
		} catch (Exception e) {
			logger.error("修改帐号失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("修改帐号失败！");
			throw e;
		}
		return result;
	}

	@Override
	public ResultDTO<AccountDO> queryAccountById(String id) {
		ResultDTO<AccountDO> result = new ResultDTO<AccountDO>();
		try {
			AccountDO account = accountDao.selectAccountById(id);
			if (null == account) {
				result.setSuccess(false);
				result.setErrorDetail("该帐号不存在！");
				return result;
			}

			result.setModule(account);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询帐号失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询帐号失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AccountDO> queryAccountList(QueryAccountBO query) {
		BatchResultDTO<AccountDO> result = new BatchResultDTO<AccountDO>();
		try {
			List<AccountDO> list = accountDao.selectAccountList(query);

			result.setModule(list);
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询帐号列表失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询帐号列表失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AccountDO> queryAccountPage(QueryAccountBO query) {
		BatchResultDTO<AccountDO> result = new BatchResultDTO<AccountDO>();
		try {
			String ids = accountDao.selectAllChildAccountIds(query.getId());
			if (StringUtils.isNotBlank(ids)) {
				StringBuffer idsx = new StringBuffer();
				for (String id : ids.split(",")) {
					idsx.append("'" + id + "'" + ",");
				}

				query.setIds(idsx.toString().substring(0, idsx.toString().length() - 1));
			} else {
				query.setIds("-1");
			}

			int record = accountDao.selectAccountCount(query);
			query.setRecord(record);
			if (record > 0) {
				List<AccountDO> list = accountDao.selectAccountPage(query);
				if (CollectionUtils.isNotEmpty(list)) {
					for (AccountDO account : list) {
						RoleDO role = roleDao.selectRoleById(account.getRoleId());
						if (null != role) {
							account.setRoleName(role.getRoleName());
						}
					}
					result.setModule(list);
				}

			} else {
				result.setModule(Collections.<AccountDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询帐号失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询帐号失败！");
		}
		return result;
	}

	@Override
	public BatchResultDTO<AccountDO> queryAccounts(QueryAccountBO query) {
		BatchResultDTO<AccountDO> result = new BatchResultDTO<AccountDO>();
		try {
			int record = accountDao.selectAccountCountx(query);
			query.setRecord(record);
			if (record > 0) {
				List<AccountDO> list = accountDao.selectAccountPagex(query);
				if (CollectionUtils.isNotEmpty(list)) {
					result.setModule(list);
				}
			} else {
				result.setModule(Collections.<AccountDO> emptyList());
			}
			result.setSuccess(true);
		} catch (Exception e) {
			logger.error("查询帐号失败！", e);
			result.setSuccess(false);
			result.setErrorDetail("查询帐号失败！");
		}
		return result;
	}
}
