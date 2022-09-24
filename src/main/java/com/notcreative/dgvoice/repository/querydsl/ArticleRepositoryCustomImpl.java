package com.notcreative.dgvoice.repository.querydsl;

import com.notcreative.dgvoice.domain.Article;
import com.notcreative.dgvoice.domain.QArticle;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

public class ArticleRepositoryCustomImpl extends QuerydslRepositorySupport implements ArticleRepositoryCustom {

    public ArticleRepositoryCustomImpl() {
        super(Article.class);
    }

    @Override
    public List<String> findAllDistinctRegions() {

        QArticle article = QArticle.article;

        return from(article)
                .distinct()
                .select(article.region)
                .where(article.region.isNotNull())
                .fetch();
    }

}
