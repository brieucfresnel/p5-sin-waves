const width = 600,
  height = 400;

let wavesCount = 10;
let waves = [];

let wavesAmplitude,
  wavesWidth,
  wavesXSpacing,
  wavesPeriod,
  wavesVelocity,
  wavesAcceleration;

let noiseOffset = 0;
let noiseIncrease = 0.02;

function setup() {
  createCanvas(width, height);

  wavesWidth = width * 2;
  wavesAmplitude = height / wavesCount;
  wavesXSpacing = 4;

  wavesVelocity = createVector(0);
  // wavesAcceleration = createVector(0.01, 0.01);

  for (let i = 0; i < wavesCount; i++) {
    waves[i] = new Wave({
      width: wavesWidth + 30,
      amplitude: wavesAmplitude,
      xspacing: wavesXSpacing,
      theta: 0,
      renderMode: RenderModes.Circle,
      velocity: createVector(i * 3),
      index: i,
      period: 200,
      ellipseRadius: 1,
    });
  }
}

function draw() {
  background("#30313a");

  translate(0, -height / 2);
  waves.forEach((wave, i) => {
    translate(0, height / wavesCount);

    wave.calc();

    wave.render();
  });
}
