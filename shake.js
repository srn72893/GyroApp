//TODO : 現状傾けただけでもカウントが進む。センサー値のノイズ除去必要

let shakeCount = 0;
let lastShake = 0;
const SHAKE_THRESHOLD = 20; //このベクトルの大きさを超えた時 1 カウントとする
const COOLDOWN = 500;       //500ms 間隔で 1 回カウント

//id="shake" ボタン要素取得
const shakeBtn = document.getElementById('shake');
//押されたら
shakeBtn.addEventListener('click', async () => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        //アクセス許可されるまで待つ
        const res = await DeviceMotionEvent.requestPermission();
        //許可なければ終了
        if (res !== "granted") return;
    }

    //モーションイベント開始
    window.addEventListener("devicemotion", handleMotion);

    //ボタン無効化
    shakeBtn.disabled = true;
    shakeBtn.innerText = '計測中...';
});

function handleMotion(event) {
    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;
    //3 方向ベクトルを合成
    const totalAcceleration = Math.sqrt(x*x + y*y + z*z);
    const now = Date.now();

    //ベクトル値が閾値を超えた && 前回の値取得から 500ms の時間経った
    if (totalAcceleration > SHAKE_THRESHOLD && (now - lastShake) > COOLDOWN) {
        shakeCount++;
        lastShake = now;
        document.getElementById('count').innerText = shakeCount;
    }
}
