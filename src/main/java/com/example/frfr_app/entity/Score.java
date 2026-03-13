package com.example.frfr_app.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Score {
    @Id
    @Getter
    @Column(name = "id")
    @GeneratedValue
    private Long id;        //主キー

    @Setter
    @Column(name = "score")
    private double score;   //スコア

    @Column(name = "comment")
    private String comment; //コメント

    @Column(name = "created_at")
    private LocalDateTime createdAt;    //DB 書き込みタイムスタンプ

    public Score() {}
}
