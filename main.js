soundm ='';
lwx =0;
lwy =0;
rwx =0;
rwy =0;
rws =0;
scorelwx = 0; 

function preload(){
  soundm = loadSound("music.mp3");
}



function setup(){
  canvas =   createCanvas(500,500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  soundm.setVolume(1);
  soundm.rate(1);

  poseNet= ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);
}

function modelLoaded(){
console.log(results);
}

function gotPoses(results){
  if(results.length > 0){
    console.log(results);
    scorelwx = results[0].pose.keypoints[9].score;
    lwx = results[0].pose.leftWrist.x;
    lwy = results[0].pose.leftWrist.y;

    rwx = results[0].pose.rightWrist.x;
    rwx = results[0].pose.rightWrist.y;
    rws = results[0].pose.keypoints[10].score
 
 
  }
  

  
}

function draw(){
    
  image(video,0,0,400,400);

  fill('red')
  stroke('red')
  if(scorelwx > 0.2){
    circle(lwx,lwy,20)
    numbery = Number(lwy) 
    round_number = floor(numbery)
    volume1 = round_number/500
    document.getElementById('volume').innerHTML = 'volume : '+ volume1;
    soundm.volume(volume1);
  }
if(rws>0.2){
    circle(rwx,rwy,20)
    if(rws>0 && rws<=100){
      document.getElementById('speed').innerHTML = 'Speed : 0.5x';
      soundm.rate(0.5);
     }
     else if(rws>100 && rws<=200){
      document.getElementById('speed').innerHTML = 'Speed : 1x';
      soundm.rate(1);
     }
     else if(rws>200 && rws<=300){
      document.getElementById('speed').innerHTML = 'Speed : 1.5x';
      soundm.rate(1.5);
     }
     else if(rws>300 && rws<=400){
      document.getElementById('speed').innerHTML = 'Speed : 2x';
      soundm.rate(2);
     }
     else if(rws>400 && rws<=500){
      document.getElementById('speed').innerHTML = 'Speed :2.5x'
      soundm.rate(2.5);
     }

    }


  
  



  
  

}

function play(){
soundm.play();
}





