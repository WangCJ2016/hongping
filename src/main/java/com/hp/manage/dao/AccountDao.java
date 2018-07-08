package com.hp.manage.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.hp.manage.bo.QueryAccountBO;
import com.hp.manage.domain.AccountDO;

@Repository
public interface AccountDao {

	public int insertAccount(AccountDO account);

	public int updateAccount(AccountDO account);

	public AccountDO selectAccountById(String id);

	public List<AccountDO> selectAccountList(QueryAccountBO query);

	public int selectAccountCount(QueryAccountBO query);

	public List<AccountDO> selectAccountPage(QueryAccountBO query);

	public int selectAccountCountx(QueryAccountBO query);

	public List<AccountDO> selectAccountPagex(QueryAccountBO query);

	public String selectAllChildAccountIds(String id);
}
