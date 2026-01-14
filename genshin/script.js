let countdown = setInterval(function(){
    document.querySelectorAll('.countdown').forEach(function (elem) {
        const now = new Date()  //今の日時
        const targetTime = new Date(elem.getAttribute("data-target-time"))  //ターゲット日時を取得
        const remainTime = targetTime - now  //差分を取る（ミリ秒で返ってくる

        // 指定の日時を過ぎていたらスキップ
        if(remainTime < 0) return true

        // //差分の日・時・分・秒を取得
        const difYear = Math.floor(remainTime / 1000 / 60 / 60 / 24 / 365) 
        const difDay = Math.floor(remainTime / 1000 / 60 / 60 / 24) % 365
        const difHour = Math.floor(remainTime / 1000 / 60 / 60 ) % 24
        const difMin = Math.floor(remainTime / 1000 / 60) % 60
        const difSec = Math.floor(remainTime / 1000) % 60

        // //残りの日時を上書き
        elem.querySelectorAll('.countdown-year')[0].textContent = difYear
        elem.querySelectorAll('.countdown-day')[0].textContent = difDay
        elem.querySelectorAll('.countdown-hour')[0].textContent = difHour
        elem.querySelectorAll('.countdown-min')[0].textContent = difMin
        elem.querySelectorAll('.countdown-sec')[0].textContent = difSec
    });
}, 1000)    //1秒間に1度処理

let countdown1 = setInterval(function(){
    const now = new Date()  //今の日時
    const target = new Date(now.getFullYear(), now.getMonth() + 1, 0,'23','59','59') //ターゲット日時を取得
    const remainTime = target - now  //差分を取る（ミリ秒で返ってくる

    //指定の日時を過ぎていたら処理をしない
    if(remainTime < 0) return false 

    //差分の日・時・分・秒を取得
    const difDay  = Math.floor(remainTime / 1000 / 60 / 60 / 24)
    const difHour = Math.floor(remainTime / 1000 / 60 / 60 ) % 24
    const difMin  = Math.floor(remainTime / 1000 / 60) % 60
    const difSec  = Math.floor(remainTime / 1000) % 60

    //残りの日時を上書き
    document.getElementById("countdown-day").textContent  = difDay
    document.getElementById("countdown-hour").textContent = difHour
    document.getElementById("countdown-min").textContent  = difMin
    document.getElementById("countdown-sec").textContent  = difSec

    //指定の日時になればカウントを止める
    if(remainTime < 0) clearInterval(countdown)

}, 1000)    //1秒間に1度処理