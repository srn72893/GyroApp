package com.example.frfr_app.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.frfr_app.dto.CommentRequest;
import com.example.frfr_app.dto.ScoreRequest;
import com.example.frfr_app.dto.ScoreResponse;
import com.example.frfr_app.service.ScoreService;
import com.example.frfr_app.entity.Score;

@RestController
@CrossOrigin
public class ScoreController {
    private final ScoreService scoreService;

    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }
    
    /**
     * フロントからスコアデータを受け取り、 Service に回す
     * @param request
     * @return
     */
    @PostMapping("/api/score")
    public ScoreResponse submitScore(@RequestBody ScoreRequest request) {
        return scoreService.submitScore(request);
    }

    /**
     * フロントからコメントデータを受け取り Service に回す
     * @param entity
     * @return
     */
    @PostMapping("/api/comment")
    public void comment(@RequestBody CommentRequest request) {
        //コメントを DB に保存
        scoreService.saveComment(request);
    }
    
    /**
     * 現在のランキングをフロントへ返す
     * @param param
     * @return
     */
    @GetMapping("/api/ranking")
    public List<Score> ranking() {
        return scoreService.getRanking();
    }
    
}
