scoreLeftWrist = 0;
scoreRightWrist = 0;
song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    song = loadSound("Bekhayali-song.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(572.5, 300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Score Left Wrist = " + scoreLeftWrist);

        console.log("LeftWrist X = " + leftWristX + "-Left Wrist Y = " + leftWristY);

        console.log("right Wrist X = " + rightWristX + "-Right Wrist Y = " + rightWristY);

    }
}

function modelLoaded() {
    console.log("Successfully Connected with Posenet !!! :)");
}
function draw() {
    image(video, 0, 0, 600, 500);
    noStroke();
    fill(255,0,0);
    noStroke();

    if (scoreLeftWrist > 0.2 ) {
        circle(leftWristX, leftWristY, 20);
        cnvrtStrngtText = Number(leftWristX);
        remove_decimals = floor(cnvrtStrngtText);
        volume = cnvrtStrngtText / 500;
        document.getElementById("volume-display").innerHTML = " : " + volume;
        song.setVolume(volume);
    }
    circle(rightWristX, rightWristY, 20);
    if (scoreRightWrist > 0.2) {
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed-display").innerHTML = "0.5x Speed";
        song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed-display").innerHTML = "1x Speed";
        song.rate(1);
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed-display").innerHTML = "1.5x Speed";
        song.rate(1.5);
    }
    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed-display").innerHTML = "2x Speed";
        song.rate(2);
    }
    else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed-display").innerHTML = "2.5x Speed";
        song.rate(2.5);
        }
    }
}
function playMusic() {
    song.play();
   
}