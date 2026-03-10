let shakeCount = 0;         //スマホを振った回数
let lastShake = 0;          //前回スマホを振った時間

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

/**
 * 加速度センサー値からスマホを振ったかどうか判定
 * @param {*} event 
 * @returns 
 */
function handleMotion(event) {
    const SHAKE_THRESHOLD = 25; //閾値（超えた時 1 カウントとする）
    const COOLDOWN = 500;       //500ms 間隔で 1 回カウント計測

    const acc = event.accelerationIncludingGravity;
    if (!acc) return;

    const x = acc.x || 0;
    const y = acc.y || 0;
    const z = acc.z || 0;
    //x軸 y軸 z軸 の値を合成しひとつの加速度として扱う
    const totalAcceleration = Math.sqrt(x*x + y*y + z*z);

    const now = Date.now();

    //ベクトル値が閾値を超えた && 前回の値取得から 500ms の時間経った
    if (totalAcceleration > SHAKE_THRESHOLD && (now - lastShake) > COOLDOWN) {
        shakeCount++;
        lastShake = now;
        document.getElementById('count').innerText = shakeCount;
    }
}
