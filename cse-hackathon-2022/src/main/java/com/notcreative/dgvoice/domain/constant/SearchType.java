package com.notcreative.dgvoice.domain.constant;

import lombok.Getter;

public enum SearchType {

    TITLE("제목"),
    CONTENT("본문"),
    ID("유저 ID"),
    USERNAME("유저 이름"),
    WORK("업무"),
    REGION("지역");
    @Getter private final String description;
    SearchType(String description) {
        this.description = description;
    }
}
