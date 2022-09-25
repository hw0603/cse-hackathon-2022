package com.notcreative.dgvoice.repository;

import com.notcreative.dgvoice.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
