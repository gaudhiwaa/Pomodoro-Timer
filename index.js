//For Change Timer
var saveTimerSb=0, saveTimerW=0, saveTimerLb=0;

function changeTimer(){
  const nowTimerSb = document.getElementById('countdown-sb');
  const nowTimerW = document.getElementById('countdown-w');
  const nowTimerLb = document.getElementById('countdown-lb');
  let newTimerSb = document.getElementById('shortBreak');
  let newTimerW = document.getElementById('work');
  let newTimerLb = document.getElementById('longBreak');

  if(newTimerSb.value == "" || newTimerW.value == "" || newTimerLb.value == ""){
    alert("Please fill all the blank input");
  } else if (newTimerSb.value <= 0 || newTimerW.value <= 0 || newTimerLb.value <= 0 || newTimerSb.value%1!=0 || newTimerW.value%1!=0 || newTimerLb.value%1!=0){
    alert("Please set the right time");
  } else {
    nowTimerSb.innerHTML = newTimerSb.value + " : 00";
    nowTimerW.innerHTML = newTimerW.value + " : 00";
    nowTimerLb.innerHTML = newTimerLb.value + " : 00";
    saveTimerSb=newTimerSb.value * 60;
    saveTimerW=newTimerW.value * 60;
    saveTimerLb=newTimerLb.value * 60;
  }
}

//For Time Button
var countSb=0, countW=0, countLb=0;
var SbisRun=false, WisRun=false, LbisRun=false;

function startTimerSb(){
  const nowTimer = document.getElementById('countdown-sb');
  const startingMinutes = +document.getElementById('shortBreak').value;

  countSb++;
  startTimer(nowTimer, startingMinutes, countSb);
}
function startTimerW(){
  const nowTimer = document.getElementById('countdown-w');
  const startingMinutes = +document.getElementById('work').value;

  countW++;
  startTimer(nowTimer, startingMinutes, countW);
}
function startTimerLb(){
  const nowTimer = document.getElementById('countdown-lb');
  const startingMinutes = +document.getElementById('longBreak').value;

  countLb++;
  startTimer(nowTimer, startingMinutes, countLb);
}

function startTimer(nowTimer, startingMinutes){
  let time = startingMinutes * 60;

  if (time!=0 && countSb==1){ //mencegah ga update berkali^2
    setInterval(updateCountDownSb, 1000);
  }
  if (time!=0 && countW==1){ //mencegah ga update berkali^2
    setInterval(updateCountDownW, 1000);
  }
  if (time!=0 && countLb==1){ //mencegah ga update berkali^2
    setInterval(updateCountDownLb, 1000);
  }

  var audio = new Audio('alarm.mp3');

  var sound = 0;

  function updateCountDownSb(){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    nowTimer.innerHTML = `${minutes} : ${seconds}`;

    //masih blm bisa ganti timer ketika waktu abis
    if(time!=0 && countSb%2!=0){
      time--;
      SbisRun = true;
    } else if (SbisRun==false && time!=0){
      if(saveTimerSb==0){
        time = 300;
      } else time = saveTimerSb;
    } else if(time==0){
      SbisRun=false;
      audio.play();
      work();
      if(saveTimerSb==0){
        time = 300;
      } else {
        time = saveTimerSb;
      }
      countSb++;
    }
  }

  function updateCountDownW() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    nowTimer.innerHTML = `${minutes} : ${seconds}`;

    if (time!=0 && countW%2!=0){
      time--;
      WisRun = true;
    } else if (WisRun==false){
      if(saveTimerW==0){
        time = 1500;
      } else time = saveTimerW;
    }
  }

  function updateCountDownLb() {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    nowTimer.innerHTML = `${minutes} : ${seconds}`;

    if (time!=0 && countLb%2!=0){
      time--;
      LbisRun = true;
    } else if (LbisRun==false){
      if(saveTimerLb==0){
        time = 600;
      } else time = saveTimerLb;
    }
  }
}

//For Click Function
function settings(){
  if(SbisRun==true || WisRun==true || LbisRun==true){
    if(confirm('Your timer is still running. Are you sure you want to switch?')) {
      WisRun=false;
      SbisRun=false;
      LbisRun=false;
      settings()
      countW=0;
      countSb=0;
      countLb=0;
    }
  } else {
    document.querySelector('.setSettings').style.visibility = "visible";
    document.querySelector('.w').style.visibility = "hidden";
    document.querySelector('.sb').style.visibility = "hidden";
    document.querySelector('.lb').style.visibility = "hidden";
  }
}

function work(){
  if(SbisRun==true || LbisRun==true){
    if (confirm('Your timer is still running. Are you sure want to switch?')) {
      SbisRun=false;
      LbisRun=false;
      work();
      countSb=0;
      countLb=0;
    }
  }else {
    document.querySelector('.setSettings').style.visibility = "hidden";
    document.querySelector('.w').style.visibility = "visible";
    document.querySelector('.sb').style.visibility = "hidden";
    document.querySelector('.lb').style.visibility = "hidden";
  }
}
function shortBreak(){
  if(LbisRun==true || WisRun==true){
    if(confirm('Your timer is still running. Are you sure want to switch?')) {
      WisRun=false;
      LbisRun=false;
      shortBreak();
      countW=0;
      countLb=0;
      console.log(time.value);
    }
  }else {
    document.querySelector('.setSettings').style.visibility = "hidden";
    document.querySelector('.w').style.visibility = "hidden";
    document.querySelector('.sb').style.visibility = "visible";
    document.querySelector('.lb').style.visibility = "hidden";
  }
}
function longBreak(){
  if(SbisRun==true || WisRun==true){
    if(confirm('Your timer is still running. Are you sure want to switch?')) {
      WisRun=false;
      SbisRun=false;
      longBreak();
      countW=0;
      countSb=0;
    }
  }else {
    document.querySelector('.setSettings').style.visibility = "hidden";
    document.querySelector('.sb').style.visibility = "hidden";
    document.querySelector('.w').style.visibility = "hidden";
    document.querySelector('.lb').style.visibility = "visible";
  }
}
