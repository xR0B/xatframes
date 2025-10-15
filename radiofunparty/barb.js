const container = document.querySelector('.container');
const getRandomHeight = (min, max) => ~~(Math.random() * (max - min + 1)) + min;

let lineLength = ~~(window.innerWidth * 0.03);
let intervalId = null;

const animateEqualizer = () => {
  intervalId = setInterval(() => {
    const randomHeight = Array.from(Array(lineLength < 15 ? 15 : lineLength), () =>
    getRandomHeight(10, ~~(window.innerWidth * 0.1) < 100 ? 100 : ~~(window.innerWidth * 0.1)));


    const topLines = document.querySelectorAll('.equalizer.top .line');
    const bottomLines = document.querySelectorAll('.equalizer.bottom .line');

    randomHeight.forEach((height, idx) => {
      topLines[idx].style.height = `${height}px`;
      bottomLines[idx].style.height = `${height}px`;
    });
  }, 100);
};

const createEqualizer = className => {
  const equalizerDiv = document.createElement('div');
  equalizerDiv.classList.add('equalizer', className);
  container.appendChild(equalizerDiv);
};

const createLines = (n, equalizer) => {
  createEqualizer(equalizer);
  const parent = document.querySelector(`.equalizer.${equalizer}`);

  for (let i = 0; i < n; i++) {
    const lineDiv = document.createElement('div');
    lineDiv.classList.add('line');
    parent.appendChild(lineDiv);
  }
};

const createContents = () => {
  const equalizers = ['top', 'bottom'];

  equalizers.forEach(equalizer => createLines(lineLength, equalizer));
  animateEqualizer();
};

const handleResize = () => {
  clearInterval(intervalId);
  lineLength = ~~(window.innerWidth * 0.03);
  const equalizers = document.querySelectorAll('.equalizer');
  equalizers.forEach(equalizer => equalizer.remove());
  createContents();
};

window.addEventListener('resize', handleResize); 

createContents();
//# sourceURL=pen.js