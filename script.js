//id="start" のボタン要素を取得
const button = document.getElementById("start");

//ボタンが押されたら中の処理を実行
button.addEventListener("click", async () => {
    //iPhone のセンサー使用許可を取る
    if (DeviceOrientationEvent.requestPermission) {
        //アクセス許可するか聞く
        //await → 許可されるまで待つ
        const res = await DeviceOrientationEvent.requestPermission();

        //許可されなかったら許可取るダイアログ出す
        if (res === "granted") {
            window.addEventListener("deviceorientation", e => {
                console.log(e.alpha, e.beta, e.gamma);
            });
        }
    }

    //センサーイベントを取得し、表示する
    window.addEventListener("deviceorientation", (event) => {
        //HTML id="指定のid" のタグの中身を書き換える
        document.getElementById("alpha").textContent = "alpha : " + event.alpha;
        document.getElementById("beta").textContent = "beta : " + event.beta;
        document.getElementById("gamma").textContent = "gamma : " + event.gamma;
    });
});
