var Person = [] || JSON.parse(localStorage.getItem('Person')); //設定一個物件Person用來記錄BMIDate (儲存於localStorage)
var btn = document.querySelector('.btn');
var BMI_text = document.querySelector('#BMI_text');
var list = document.querySelector('.list');

function bmi() { //計算bmi

  var hei = document.getElementById('hei').value;
  var wei = document.getElementById('wei').value;
  var bmi = wei / Math.pow(hei * 0.01, 2);
  var text = bmi.toFixed(1); //將bmi取自小數點後一位

  //顯示BMI到main_p上
  var main_p = document.getElementById('main_p');
  main_p.textContent = text;

  //記錄時間
  var NowDate = new Date();
  var year = NowDate.getFullYear();
  var mon = NowDate.getMonth();
  var day = NowDate.getDate();
  var h = NowDate.getHours();
  var m = NowDate.getMinutes();
  var time = year+ '年' + mon + '月' + day + '日&ensp;' + h + '時' + m + '分';
  
  //變換#circle,#re,#main,#BMI_text的顏色
  function color(text) {
      if (text < 18.5) {
          return 'thin'
      } else if (text >= 18.5 && text < 24) {
          return 'perfect'
      } else if (text >= 24 && text < 27) {
          return 'over-weight'
      } else if (text >= 27 && text < 35) {
          return 'heavy'
      } else if (text >= 35) {
          return 'obese'
      } else{
          return 'perfect'
      }
  }
  var addColor = color(text);
 
  document.getElementById('circle').className = addColor;
  document.getElementById('re').className = 'fa fa-repeat '+addColor; 
  document.getElementById('main').className = 'text-'+addColor; 
  document.getElementById('BMI_text').className = 'text-'+addColor;
  
  
  //設定一個物件man，用來儲存該筆輸入之資料(身高、體重、BMI、健康狀況、時間)
  var man = {
      h: hei,
      w: wei,
      bm: text,
      result: function() {
          if (man.bm < 18.5) {
              return '過輕'
          } else if (man.bm >= 18.5 && man.bm < 24) {
              return '理想'
          } else if (man.bm >= 24 && man.bm < 27) {
              return '過重'
          } else if (man.bm >= 27 && man.bm < 30) {
              return '輕度肥胖'
          } else if (man.bm >= 30 && man.bm < 35) {
              return '中度肥胖'
          } else if (man.bm >= 35) {
              return '重度肥胖'
          }
      },
      time: time
    }

  Person.push(man); //將 物件man 寫入 物件Person (localStorage)內
  var Str = JSON.stringify(Person);
  localStorage.setItem('Person', Str);

  addBMI(Person); //取得當前最新之BMI體態
  addDate(Person); //紀錄BMI的函數
  addcolor(Person);
}

function addBMI(Person) {
  for (var i = 0; i < Person.length; i++) {
      var BMItext = Person[i].result()  
  }
  BMI_text.innerHTML = BMItext; //輸出體態
}

function addcolor(Person) {
      if (Person.bm < 18.5) {
          return 'add-thin'
      } else if (Person.bm >= 18.5 && Person.bm < 24) {
          return 'add-perfect'
      } else if (Person.bm >= 24 && Person.bm < 27) {
          return 'add-over-weight'
      } else if (Person.bm >= 27 && Person.bm < 35) {
          return 'add-heavy'
      } else if (Person.bm >= 35) {
          return 'add-obese'
      } else{
          return ''
      }
  }


function addDate(Person) { //紀錄BMI歷史
  var personDate = ""; //空字串，用來記錄personBMI
  for (var i = 0; i < Person.length; i++) {
      personDate += '<li class='+addcolor(Person[i])+'>' + Person[i].result() + '&ensp;&ensp;&nbsp;BMI:' + Person[i].bm + '&ensp;&nbsp;' + '身高' + Person[i].h + '&ensp;&nbsp;' + '體重' + Person[i].w + '&ensp;&ensp;&ensp;' + Person[i].time + '</li>'
  }
  list.innerHTML = personDate;
}

/*按下btn作用之(監聽)事件*/
btn.addEventListener('click', bmi, false);


/*jQ*/
$(document).ready(function() {
  $('.btn').click(function(event) {
      $('.btn').hide();
      $('.BMI').fadeIn();
  });
  $('#re').click(function(event) {
      $('.BMI').hide();
      $('.btn').fadeIn();
  });

 //  $(document).scroll(function(e){
	// 	if($(this).scrollTop()>1){ /* 當畫面離開頂部時*/
	// 		$('.footer').css({'position':''});
	// 	}
	// })
});


/*筆記*/
// JavaScript parseInt() 函数 http://www.w3school.com.cn/jsref/jsref_parseInt.asp
// Math.pow(x,y) = 返回 x^y 之值(x的y次方)
// toFixed(#) = 將#位之後的數字四捨五入
// &nbsp;為HTML空白屬性；&ensp;為全形空白