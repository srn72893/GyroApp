package com.example.frfr_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.example.frfr_app.entity.Score;

public interface ScoreRepository extends JpaRepository<Score, Long>{
    /**
     * スコア TOP5 を取得する
     * SELECT * FROM scores ORDER BY score DESC LIMIT 5;
     * @return
     */
    List<Score> findTop5ByOrderByScoreDexc();

    /**
     * 入力されたスコアから順位を求める
     * SELECT COUNT(*) FROM scores WHERE score > ?;
     * 結果は rank + 1 として利用
     * @param score
     * @return
     */
    long countByScoreGreaterThan(double score);
}
