let countdown = setInterval(function(){
  document.querySelectorAll('.countdown').forEach(function (elem) {
      const now = new Date()  //今の日時
      const targetTime = new Date(elem.getAttribute("data-target-time"))  //ターゲット日時を取得
      const remainTime = targetTime - now  //差分を取る（ミリ秒で返ってくる

      // 指定の日時を過ぎていたらスキップ
      if(remainTime < 0) {
          document.getElementById('greeting').textContent ="おはようございます！";
          return true
      }

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