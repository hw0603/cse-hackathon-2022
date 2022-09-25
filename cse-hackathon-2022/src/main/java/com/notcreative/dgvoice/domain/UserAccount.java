package com.notcreative.dgvoice.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Objects;

@Getter
@ToString
@Table(indexes = {
        @Index(columnList = "email", unique = true),
        @Index(columnList = "userRegion"),
        @Index(columnList = "createdAt"),
        @Index(columnList = "createdBy")
})
@Entity
public class UserAccount extends AuditingFields {
    @Id
    @Column(length = 50)
    private String userId;

    @Setter @Column(nullable = false) private String userPassword;
    @Setter @Column(length = 100) private String email;
    @Setter @Column(length = 100) private String nickname;
    @Setter @Column private String userRegion;
    @Setter private String memo;
    protected UserAccount() {}
    private UserAccount(String userId, String userPassword, String email, String nickname, String userRegion, String memo) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.email = email;
        this.nickname = nickname;
        this.userRegion = userRegion;
        this.memo = memo;
    }
    public static UserAccount of(String userId, String userPassword, String email, String nickname, String userRegion, String memo) {
        return new UserAccount(userId, userPassword, email, nickname, userRegion, memo);
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserAccount that)) return false;
        return userId != null && userId.equals(that.getUserId());
    }
    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

}
