package com.notcreative.dgvoice.dto;

import com.notcreative.dgvoice.domain.Article;
import com.notcreative.dgvoice.domain.UserAccount;

import java.time.LocalDateTime;

public record ArticleDto(
        Long id,
        UserAccountDto userAccountDto,
        String title,
        String content,
        String work,
        String region,
        Long readCount,
        Long heartCount,
        LocalDateTime createdAt,
        String createdBy,
        LocalDateTime modifiedAt,
        String modifiedBy
) {

    public static ArticleDto of(UserAccountDto userAccountDto, String title, String content, String work, String region, Long readCount, Long heartCount) {
        return new ArticleDto(null, userAccountDto, title, content, work, region, 1L, 1L, null, null, null, null);
    }

    public static ArticleDto of(Long id, UserAccountDto userAccountDto, String title, String content, String work, String region, Long readCount, Long heartCount, LocalDateTime createdAt, String createdBy, LocalDateTime modifiedAt, String modifiedBy) {
        return new ArticleDto(id, userAccountDto, title, content, work, region, readCount, heartCount, createdAt, createdBy, modifiedAt, modifiedBy);
    }

    public static ArticleDto from(Article entity) {
        return new ArticleDto(
                entity.getId(),
                UserAccountDto.from(entity.getUserAccount()),
                entity.getTitle(),
                entity.getContent(),
                entity.getWork(),
                entity.getRegion(),
                entity.getReadCount(),
                entity.getHeartCount(),
                entity.getCreatedAt(),
                entity.getCreatedBy(),
                entity.getModifiedAt(),
                entity.getModifiedBy()
        );
    }

    public Article toEntity(UserAccount userAccount) {
        return Article.of(
                userAccount,
                title,
                content,
                work,
                region,
                readCount,
                heartCount
        );
    }

}
