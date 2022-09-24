package com.notcreative.dgvoice.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "heart")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Heart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "article_id") @NonNull private String articleId;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id") private UserAccount userAccount;

}
