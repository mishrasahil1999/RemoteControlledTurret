let video;
let poseNet;
let leftX =0;
let leftY =0;
let rightX = 0;
let rightY =0;

let serial;
let functionality = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
   video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);
  serial = new p5.SerialPort();
  serial.open("COM8");

}

function serverConnected(){
  console.log("Connected to the server");
}

function gotOpen(){
  console.log("Serial port is open");
}

function gotClose(){
  console.log("serial port is closed");
}

function gotError(theerror){
 console.log(theerror);
}

function gotPoses(poses){
  //console.log('Hey there');
  // console.log(poses);
  if(poses.length>0){
  // let leftX1 = poses[0].pose.keypoints[5].position.x;
  // let leftY1 = poses[0].pose.keypoints[5].position.y;
  // let rightX1 = poses[0].pose.keypoints[6].position.x;
  // let rightY1 = poses[0].pose.keypoints[6].position.y;
  
  //   leftX = lerp(leftX, leftX1, 0.9);
  //   leftY = lerp(leftY, leftY1, 0.9);
  //   rightX = lerp(rightX, rightX1, 0.9);
  //   rightY = lerp(rightY, rightY1, 0.9);


  leftX = poses[0].pose.keypoints[5].position.x;
  leftY = poses[0].pose.keypoints[5].position.y;
  rightX = poses[0].pose.keypoints[6].position.x;
  rightY = poses[0].pose.keypoints[6].position.y;
  }
}

function modelReady(){
   console.log('model ready'); 
  
}


function draw() {
 // console.log(ml5);
  image(video, 0,0);
  fill(255,0,0);
  let finalelipseX = 180-(floor(((leftX+rightX)/2)/(10.667)));//floor((((leftX+rightX)/2 + hipcentreX)/2))/(640/180);
  let finalelipseY = 180-floor(((leftY+rightY)/2)/(8));//floor((((leftY+rightY)/2 + hipcentreY)/2)/(480/180));
  ellipse((leftX+rightX)/2, (leftY+rightY)/2, 20);
 // ellipse(finalelipseX, finalelipseY, 50);
  ellipse(leftX, leftY, 15);
  ellipse(rightX, rightY, 15);
  let coordinates = 'X'+(finalelipseX)+'Y'+finalelipseY;
  //console.log(coordinates);

  
  if(functionality){
  setTimeout(serial.write(coordinates), 10);
  textSize(20);
  stroke(0,0,100);
  text('CURRENTLY IN: AUTOMATIC MODE', 20,420);
  textSize(15);
  fill(000);
  text('RIGHT CLICK FOR MANUAL MODE',20,440);
  text(coordinates,20,460);

  }
  else{
    let x1 = (180-floor(mouseX/(10.667)));
    let crd = 'X'+x1+'Y'+floor(180-mouseY/(8));
    setTimeout(serial.write(crd), 10);
    textSize(20);
    stroke(0,0,100);
  text('CURRENTLY IN: MANUAL MODE', 20,420);
  textSize(15);
  fill(000);
  text('LEFT CLICK FOR AUTOMATIC MODE',20,440);
  text(crd,20,460);
  }
}



function mouseClicked(){
  if(functionality)
  {
  functionality = false;
  }
  else 
  functionality= true;
}
