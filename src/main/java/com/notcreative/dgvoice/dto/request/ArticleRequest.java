package com.notcreative.dgvoice.dto.request;

import com.notcreative.dgvoice.dto.ArticleDto;
import com.notcreative.dgvoice.dto.UserAccountDto;

public record ArticleRequest(
        String title,
        String content,
        String region
) {

    public static ArticleRequest of(String title, String content, String region) {
        return new ArticleRequest(title, content, region);
    }

    public ArticleDto toDto(UserAccountDto userAccountDto) {
        return ArticleDto.of(
                userAccountDto,
                title,
                content,
                region
        );
    }

}