package com.hp.manage.service;

import com.hp.commons.dto.BaseResultDTO;
import com.hp.commons.dto.BatchResultDTO;
import com.hp.commons.dto.ResultDTO;
import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.domain.AccountDO;

public interface AccountService {

	public BaseResultDTO createAccount(AccountDO account);

	public BaseResultDTO modifyAccount(AccountDO account);

	public ResultDTO<AccountDO> queryAccountById(String id);

	public BatchResultDTO<AccountDO> queryAccountList(QueryAccountBO query);

	public BatchResultDTO<AccountDO> queryAccountPage(QueryAccountBO query);

	public BatchResultDTO<AccountDO> queryAccounts(QueryAccountBO query);
}
