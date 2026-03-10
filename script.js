console.log("version 1.0");

//id="start" のボタン要素を取得
const startBut = document.getElementById("start");

//ボタンが押されたら中の処理を実行
startBut.addEventListener("click", async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        //アクセス許可されるまで待つ
        const res = await DeviceMotionEvent.requestPermission();

        //許可なければ終了
        if (res !== "granted") return;
    }

    //センサーイベントを取得し、表示する
    window.addEventListener("devicemotion", viewAcc);

    //ボタン無効化
    startBut.disabled = true;
    startBut.innerText = "計測中...";
});

/**
 * センサーの値を表示する
 * @param {*} event 
 * @returns 
 */
function viewAcc(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    //HTML id="指定のid" のタグの中身を書き換える
    document.getElementById("x").textContent = "x : " + acc.x.toFixed(2);
    document.getElementById("y").textContent = "y : " + acc.y.toFixed(2);
    document.getElementById("z").textContent = "z : " + acc.z.toFixed(2);
}
