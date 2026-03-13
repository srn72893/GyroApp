package com.example.frfr_app.dto;

public class ScoreResponse {
    private int rank;               //ユーザーの順位
    private boolean commentAllowed; //TOP5 入りならコメント可
    private Long scoreId;

    public ScoreResponse(int rank, boolean commentAllowed, Long scoreId) {
        this.rank = rank;
        this.commentAllowed = commentAllowed;
        this.scoreId = scoreId;
    }
}
