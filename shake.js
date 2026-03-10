//TODO : 現状傾けただけでもカウントが進む。センサー値のノイズ除去必要

let shakeCount = 0;
let lastShake = 0;
const SHAKE_THRESHOLD = 1000000000; //このベクトルの大きさを超えた時 1 カウントとする
const COOLDOWN = 500;       //500ms 間隔で 1 回カウント

//id="shake" ボタン要素取得
const shakeBtn = document.getElementById('shake');
//押されたら
shakeBtn.addEventListener('click', () => {
    window.addEventListener('devicemotion', (event) => {
    const gyro = event.rotationRate;
    const now = Date.now();

    if (!gyro) return;

    //3 方向ベクトルを合成
    const totalRotation = Math.sqrt(
        gyro.alpha * gyro.alpha +
        gyro.beta * gyro.beta +
        gyro.gamma * gyro.gamma
    );

    //ベクトル値が閾値を超えた && 前回の値取得から 500ms の時間経った
    if (totalRotation > SHAKE_THRESHOLD && (now - lastShake) > COOLDOWN) {
        shakeCount++;
        document.getElementById('count').innerText = shakeCount;
    }
});

shakeBtn.disabled = true;
shakeBtn.innerText = '計測中...';
});
