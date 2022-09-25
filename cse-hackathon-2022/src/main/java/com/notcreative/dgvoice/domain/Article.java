package com.notcreative.dgvoice.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;;
import java.util.LinkedHashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@ToString(callSuper = true)
@Table(indexes = {
        @Index(columnList = "title"),
        @Index(columnList = "work"),
        @Index(columnList = "region"),
        @Index(columnList = "readCount"),
        @Index(columnList = "heartCount"),
        @Index(columnList = "createdAt"),
        @Index(columnList = "createdBy")
})
@Entity
public class Article extends AuditingFields{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter @ManyToOne(optional = false) @JoinColumn(name = "userId") private UserAccount userAccount; // 유저 정보 (ID)
    @Setter @Column(nullable = false) private String title; // 제목
    @Setter @Column(nullable = false, length = 10000) private String content; // 본문
    @Setter @Column(nullable = false) private String work; // 업무
    @Setter @Column(nullable = false) private String region; // 지역
    @Setter @Column(nullable = false) private Long readCount; // 조회수
    @Setter @Column(nullable = false) private Long heartCount; // 공감수


    @ToString.Exclude
    @OrderBy("createdAt DESC")
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    private final Set<ArticleComment> articleComments = new LinkedHashSet<>();

    protected Article() {}

    private Article(UserAccount userAccount, String title, String content, String work, String region, Long readCount, Long heartCount) {
        this.userAccount = userAccount;
        this.title = title;
        this.content = content;
        this.work = work;
        this.region = region;
        this.readCount = readCount;
        this.heartCount = heartCount;
    }

    public static Article of(UserAccount userAccount, String title, String content, String work, String region, Long readCount, Long heartCount) {
        return new Article(userAccount, title, content, work, region, readCount, heartCount);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Article that)) return false;
        return id != null && id.equals(that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}
