//SpringBoot API 呼び出し用
//JSON を送受信する

/**
 * スコアを送信する
 * @param {*} score 
 * @returns 
 */
export function sendScore(score) {
    //fetch (url, options) : HTTP リクエストを送るためのメソッド
    //url : SpringBoot の Controller につけたアノテーションのパスを指定するとそのメソッドが叩ける
    return fetch("/api/score", {
        method: "POST",
        //リクエストヘッダ
        headers: {
            // body が JSON 形式であることを示す
            "Content-Type": "application/json"
        },
        //リクエストボディ 引数で渡された score 文字列で入れて渡す
        body: JSON.stringify({score: score})
        })
        //処理が終わったらサーバから ScoreResponse(JSON) を受け取るので、JS のオブジェクトに変換
        //response(JSON) に入っているのは rank, commentAllowed, scoreId
        .then(response => response.json());
        
}

/**
 * コメントを送信する
 * @param {*} scoreId 
 * @param {*} comment 
 */
export function sendComment(scoreId, comment) {
    return fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scoreId, comment})
    });
}

/**
 * ランキングを取得する
 */
export function getRanking() {
    //GET なので option は省略可
    return fetch("/api/rangking").then(res => res.json());  //サーバから Score List(JSON) を受け取る
}
