package com.notcreative.dgvoice.dto.response;

import com.notcreative.dgvoice.dto.ArticleDto;

import java.time.LocalDateTime;

public record ArticleResponse(
        Long id,
        String title,
        String content,
        String work,
        String region,
        Long readCount,
        Long heartCount,
        LocalDateTime createdAt,
        String email,
        String nickname
) {

    public static ArticleResponse of(Long id, String title, String content, String work, String region, Long readCount, Long heartCount, LocalDateTime createdAt, String email, String nickname) {
        return new ArticleResponse(id, title, content, work, region, readCount, heartCount, createdAt, email, nickname);
    }

    public static ArticleResponse from(ArticleDto dto) {
        String nickname = dto.userAccountDto().nickname();
        if (nickname == null || nickname.isBlank()) {
            nickname = dto.userAccountDto().userId();
        }

        return new ArticleResponse(
                dto.id(),
                dto.title(),
                dto.content(),
                dto.work(),
                dto.region(),
                dto.readCount(),
                dto.heartCount(),
                dto.createdAt(),
                dto.userAccountDto().email(),
                nickname
        );
    }

}
