window.onload = function () {
  var can = document.getElementById('canvas');
  can.width = 700;
  can.height = 500;
  var context = can.getContext('2d')
  var cactusArray = [];
  var score;
  var frameNo = 0;
  var Trex = {};
  function startGame() {
    Trex = new create(10, can.height - 70, "Trex", 70, 40);
    setInterval(update, 20);
  }
  startGame();

  let jump = document.getElementById('jump')
  function create(x, y, type, height, width) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.naturalGravity = 0;
    this.acceleration = 0;

    this.produce = function () {
      if (this.type == "Trex") {
        var image = new Image;
        image.src = "Trex2.png";
        var x1 = this.x;
        var y1 = this.y;
        var width1 = this.width;
        var height1 = this.height;
        image.onload = function () {

          //context.clearRect(0, 0, can.width, can.height);
          console.log(frameNo);
          context.drawImage(image, x1, y1, 2 * width1, height1);
        }

      }
      if (this.type == "cactus") {
        var image = new Image;
        image.src = "obstacle.png";
        var x1 = this.x;
        var y1 = this.y;
        var width1 = this.width;
        var height1 = this.height;
        image.onload = function () {

          //context.clearRect(0, 0, can.width, can.height);

          context.drawImage(image, x1, y1, width1, height1);
        }
      }
    }
    this.newpos = function () {

      //this.naturalGravity+=this.acceleration;
      this.y += this.acceleration + this.naturalGravity;
      this.hitBottom();
      //this.updateDimensions();
    }

    this.hitBottom = function () {
      var rockbottom = can.height - this.height;
      if (this.y > rockbottom) {
        this.y = rockbottom;
        this.naturalGravity = 0;
        this.acceleration = 0;
      }
    }
    this.hitCactus = function (cactus) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var cactusleft = cactus.x;
      var cactusright = cactus.x + (cactus.width);
      var cactustop = cactus.y;
      var cactusbottom = cactus.y + (cactus.height);
      var hitted = true;
      //  console.log(cactusleft)
      //  console.log(myright)
      if ((mybottom < cactustop) || (mytop > cactusbottom) || (myright < cactusleft) || (myleft > cactusright))
        hitted = false;
      //console.log(hitted)
      return hitted;
    }

  }


  let insertObstacle = 100;
  function update() {
    frameNo++;
    for (i = 0; i < cactusArray.length; i++) {
      if (Trex.hitCactus(cactusArray[i])) {
        var score = frameNo;
        //alert("gameover")
        alert("your score is : " + score)
        return;
      }
    }
    context.clearRect(0, 0, can.width, can.height);
    let min = 250;
    let max = 500;
    timegap = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log(timegap);
    if (frameNo == insertObstacle) {
      let cac = new create(can.width, can.height - 50, "cactus", 50, 50)
      cactusArray.push(cac);
      insertObstacle += timegap;

    }
    for (i = 0; i < cactusArray.length; i++) {
      cactusArray[i].x -= 2;
      cactusArray[i].produce();
    }
    Trex.newpos();
    Trex.produce();


  }
  jump.onclick = function () {
    console.log('jump')
    Trex.acceleration = -2;
    Trex.naturalGravity = 0.5;
    setTimeout(MouseUp, 2000);
  }
  function voiceJump() {
    //console.log('jump')
    Trex.acceleration = -2;
    Trex.naturalGravity = 0.5;
    setTimeout(MouseUp, 1500);
  }

  function MouseUp() {
    Trex.acceleration = 0.7;
  }

  /*  */

  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  let finalTranscript = '';
  let recognition = new window.SpeechRecognition();
  recognition.interimResults = true;
  recognition.maxAlternatives = 10;
  recognition.continuous = true;
  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
    console.log(finalTranscript);
    if (finalTranscript.split(' ').pop() == "jump") {

      voiceJump();

    }
  }
  recognition.start();





}