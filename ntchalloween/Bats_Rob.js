function handleMouseMove(event) {
  var dot, eventDoc, doc, body, pageX, pageY;

  event = event || window.event;

  if (event.pageX === null && event.clientX !== null) {
    eventDoc = event.target && event.target.ownerDocument || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX = event.clientX + (
    doc && doc.scrollLeft || body && body.scrollLeft || 0) - (
    doc && doc.clientLeft || body && body.clientLeft || 0);
    event.pageY = event.clientY + (
    doc && doc.scrollTop || body && body.scrollTop || 0) - (
    doc && doc.clientTop || body && body.clientTop || 0);
  }

  window.mousePos.isInited = true;
  window.mousePos.x = event.pageX; //the current x position of the mouse in the viewport, in pixels
  window.mousePos.y = event.pageY; //the current y position of the mouse in the viewport, in pixels
  window.mousePos.xMax = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); //the maximum x position of the mouse in the viewport, in pixels
  window.mousePos.yMax = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); //the maximum y position of the mouse in the viewport, in pixels
  window.mousePos.xPct = mousePos.x / mousePos.xMax; //the current relative x position of the mouse in the viewport, a percentage from 0 to 1
  window.mousePos.yPct = mousePos.y / mousePos.yMax;

  //console.log('x: ' + window.mousePos.x + ', xMax: ' + window.mousePos.xMax + ', xPct: ' + window.mousePos.xPct);
  //console.log('y: ' + window.mousePos.y + ', yMax: ' + window.mousePos.yMax + ', yPct: ' + window.mousePos.yPct);
}

window.mousePos = {};
window.addEventListener('mousemove', handleMouseMove);


//BATS CODE
//---------

class BatsWrapper {
  constructor() {
    this._element = document.querySelector('.batsWrapper');
    this._speedMax = .12;

    this._xPct = .5;
    this._yPct = .5;
  }

  render() {
    if (window.mousePos.isInited) {
      let xSpeed = window.mousePos.xPct - this._xPct;
      xSpeed = Math.max(-this._speedMax, Math.min(this._speedMax, xSpeed));
      this._xPct += xSpeed * .01;

      let ySpeed = window.mousePos.yPct - this._yPct;
      ySpeed = Math.max(-this._speedMax, Math.min(this._speedMax, ySpeed));
      this._yPct += ySpeed * .01;
    }

    //let rotX = -5 + window.mousePos.xPct  * 10;
    //let rotY = -5 + window.mousePos.yPct  * 10;

    //this._element.style.transform = `rotateX(${90 + rotY}deg) rotateY(${rotX}deg)`;
    this._element.style.left = 15 + this._xPct * 70 + 'vw';
    this._element.style.top = 15 + this._yPct * 70 + 'vh';
  }}


class Bat {

  constructor(element) {
    this._wrapper = element;
    this._bat = element.querySelector('.bat');
    this._wings = element.querySelectorAll('.batWing');
    this._height = Math.random() * 350 - 150;
    this._rotation = Math.random() * 360;
    this._speed = 1.6 + Math.random() * 2.3;
    this._isFlappingWings = Math.round(Math.random());
    this._flapCounter = 16;
    this._wrapperTiltX = -20 + Math.random() * 40;
    this._wrapperTiltY = -20 + Math.random() * 40;

    //const scale = .12 + Math.random() * .2;
    const scale = .90 + Math.random() * .8;
    const tilt = Math.random() * 30;
    this._bat.style.transform = `scaleX(${scale}) scaleY(${scale}) scaleZ(${scale}) rotateY(-${tilt}deg)`;
    this._bat.style.left = 150 + Math.random() * 150 + 'px';

    if (Math.random() > .5)
    this.setWings();

    this.render();
  }

  render() {
    this._wrapper.style.transform = `rotateX(${this._wrapperTiltX}deg) rotateY(${this._wrapperTiltY}deg) translateZ(${this._height}px) rotateZ(-${this._rotation}deg)`;

    this._rotation += this._speed;

    this._flapCounter--;
    if (this._flapCounter <= 0) {
      this.setWings();
    }
  }

  setWings() {
    this._flapCounter = Math.round(10 + Math.random() * 100);
    for (let i = 0; i < this._wings.length; i++) {
      let wing = this._wings[i];

      wing.classList.toggle('flying');
      wing.classList.toggle('floating');
    }

    this.setSpeed();
  }

  setSpeed() {
    this._speed += -.2 + Math.random() * .4;
    this._speed = Math.max(.6, Math.min(1.3, this._speed));
  }}


const batsWrapper = new BatsWrapper();

const bats = [];

const batWrappers = document.querySelectorAll('.batWrapper');
for (i = 0; i < batWrappers.length; i++) {
  let batWrapper = batWrappers[i];
  let bat = new Bat(batWrapper);
  bats.push(bat);
}

function tick() {
  //window.requestAnimationFrame(tick);

  batsWrapper.render();
  for (const bat of bats) {
    bat.render();
  }
}
//tick();

setInterval(tick, 25);
//# sourceURL=pen.js