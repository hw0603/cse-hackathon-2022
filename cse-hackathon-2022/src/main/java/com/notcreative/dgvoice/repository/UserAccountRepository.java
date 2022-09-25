package com.notcreative.dgvoice.repository;

import com.notcreative.dgvoice.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, String> {
}
