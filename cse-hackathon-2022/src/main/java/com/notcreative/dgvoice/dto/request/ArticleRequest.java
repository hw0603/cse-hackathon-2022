package com.notcreative.dgvoice.dto.request;

import com.notcreative.dgvoice.dto.ArticleDto;
import com.notcreative.dgvoice.dto.UserAccountDto;

public record ArticleRequest(
        String title,
        String content,
        String work,
        String region,
        Long readCount,
        Long heartCount
) {

    public static ArticleRequest of(String title, String content, String work, String region, Long readCount, Long heartCount) {
        return new ArticleRequest(title, content, work, region, readCount, heartCount);
    }

    public ArticleDto toDto(UserAccountDto userAccountDto) {
        return ArticleDto.of(
                userAccountDto,
                title,
                content,
                work,
                region,
                readCount,
                heartCount
        );
    }

}
