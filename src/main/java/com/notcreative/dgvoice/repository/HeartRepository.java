package com.notcreative.dgvoice.repository;

import com.notcreative.dgvoice.domain.Heart;
import com.notcreative.dgvoice.domain.UserAccount;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource
public interface HeartRepository extends JpaRepository<Heart, Long>{
    Optional<Heart> findHeartByUserAndArticleId(UserAccount userAccount, String articleId);
}
