package com.notcreative.dgvoice.service;

//게시판 , 게시글, 댓글, 정렬, + 공감기능, 위치인증을 못 했는데(안되면 회원가입시 입력하는 걸로 해야 할 ㄷ읏?)

import com.notcreative.dgvoice.domain.Heart;
import com.notcreative.dgvoice.domain.UserAccount;
import com.notcreative.dgvoice.dto.HeartDto;
import com.notcreative.dgvoice.repository.ArticleRepository;
import com.notcreative.dgvoice.repository.HeartRepository;
import com.notcreative.dgvoice.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class HeartService {

    private final HeartRepository heartRepository;
    private final UserAccountRepository userAccountRepository;
    private final ArticleRepository articleRepository;
    private final UserAccount userAccount;

    public void heart(HeartDto heartDto) throws IOException {

        Heart heart = Heart.builder()
                .articleId(heartDto.getArticleId())
                .userAccount(userAccountRepository.findById(heartDto.getUserId()).get())
                .build();
        heartRepository.save(heart);

        updateHeartCount(heartDto.getArticleId(), 1);
    }

    public void unHeart(HeartDto heartDto) throws IOException {

        Optional<Heart> heartOpt = findHeartWithUserAndArticleId(heartDto);
//        if (heartOpt.isEmpty()) {
//            throw new CustomException(HEART_NOT_FOUND);
//        }
        heartRepository.delete(heartOpt.get());

        updateHeartCount(heartDto.getArticleId(), -1);
    }

    public Optional<Heart> findHeartWithUserAndArticleId(HeartDto heartDto) {
        return heartRepository
                .findHeartByUserAndArticleId(userAccount, heartDto.getArticleId());
    }

    public void updateHeartCount(String articleId, Integer plusOrMinus) throws IOException {
        // Elasticsearch 업데이트 하는 부분
        // 필요한 분들이 별로 없을것같아 생략합니다. 필요하시면 맨아래 깃헙 링크 참고하세요!
        // MySQL만으로 구현하실때에는 JPA로 업데이트 하는 코드 넣어주세요~!
    }


}
