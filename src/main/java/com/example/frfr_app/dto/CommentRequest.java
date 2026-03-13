package com.example.frfr_app.dto;

import lombok.Getter;

public class CommentRequest {
    @Getter
    private Long scoreId;
    private String comment; //ユーザーが入力したコメント
}
