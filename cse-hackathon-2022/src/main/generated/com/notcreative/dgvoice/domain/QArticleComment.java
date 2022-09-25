package com.notcreative.dgvoice.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticleComment is a Querydsl query type for ArticleComment
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticleComment extends EntityPathBase<ArticleComment> {

    private static final long serialVersionUID = -552397989L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticleComment articleComment = new QArticleComment("articleComment");

    public final QAuditingFields _super = new QAuditingFields(this);

    public final QArticle article;

    public final StringPath content = createString("content");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath createdBy = _super.createdBy;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    //inherited
    public final StringPath modifiedBy = _super.modifiedBy;

    public final QUserAccount userAccount;

    public QArticleComment(String variable) {
        this(ArticleComment.class, forVariable(variable), INITS);
    }

    public QArticleComment(Path<? extends ArticleComment> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticleComment(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticleComment(PathMetadata metadata, PathInits inits) {
        this(ArticleComment.class, metadata, inits);
    }

    public QArticleComment(Class<? extends ArticleComment> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.article = inits.isInitialized("article") ? new QArticle(forProperty("article"), inits.get("article")) : null;
        this.userAccount = inits.isInitialized("userAccount") ? new QUserAccount(forProperty("userAccount")) : null;
    }

}

