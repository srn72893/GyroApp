package com.example.frfr_app.service;

import org.springframework.stereotype.Service;

import com.example.frfr_app.dto.CommentRequest;
import com.example.frfr_app.dto.ScoreRequest;
import com.example.frfr_app.dto.ScoreResponse;
import com.example.frfr_app.entity.Score;
import com.example.frfr_app.repository.ScoreRepository;

import jakarta.transaction.Transactional;
import java.util.List;

import javax.xml.stream.events.Comment;

@Service
public class ScoreService {
    private final ScoreRepository repository;

    public ScoreService(ScoreRepository repository) {
        this.repository = repository;
    }

    /**
     * スコアデータを DB に追加する
     * @param request
     * @return
     */
    @Transactional
    public ScoreResponse submitScore(ScoreRequest request) {
        //スコアを DB に保存
        Score score = new Score();
        score.setScore(request.getScore());
        repository.save(score);

        //このスコアよりも高いスコアのデータをカウント
        long countHigher = repository.countByScoreGreaterThan(request.getScore());
        //このスコアの順位を求める
        int rank = (int)countHigher + 1;

        //TOP5 に入っていればコメントを残す権利を与える
        boolean commentAllowed = rank <= 5;

        return new ScoreResponse(
            rank,
            commentAllowed,
            score.getId()
        );
    }

    /**
     * ランキングを取得する
     * @return
     */
    public List<Score> getRaking() {
        return repository.findTop5ByOrderByScoreDexc();
    }

    /**
     * コメントを DB に保存する
     * @param request
     */
    @Transactional
    public void saveComment(CommentRequest request) {
        Score score = repository.fintById(request.getScoreId());
    }
}