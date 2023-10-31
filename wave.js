const RenderModes = {
  Circle: 0,
  Shape: 1,
};

class Wave {
  constructor({
    width,
    xspacing = 6,
    theta = 0.0,
    amplitude = 75.0,
    period = 500.0,
    velocity = createVector(0, 0),
    acceleration = createVector(0, 0),
    renderMode = RenderModes.Circle,
    ellipseRadius = 2,
    index,
  }) {
    this.w = width + 16; // Width of entire wave
    this.dx = (TWO_PI / period) * xspacing; // Value for incrementing x
    this.yvalues = new Array(floor(this.w / xspacing)); // Using an array to store height values for the wave

    this.xspacing = xspacing; // Distance between each horizontal location
    this.theta = theta; // Start angle at 0
    this.amplitude = amplitude; // Height of wave
    this.period = period; // How many pixels before the wave repeats
    this.velocity = velocity;
    this.acceleration = acceleration;

    this.index = index;
    this.renderMode = renderMode;

    this.ellipseRadius = ellipseRadius;

    this.noiseOffset = 0;
  }

  calc() {
    // Increment theta (try different values for 'angular velocity' here)
    this.theta += 0.02;

    // For every x value, calculate a y value with sine function
    let x = this.theta;
    for (let i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = sin(x) * this.amplitude;
      x += this.dx;
    }
  }

  render() {
    // A simple way to draw the wave with an ellipse at each location
    switch (this.renderMode) {
      case RenderModes.Circle:
        this.renderEllipses();
        break;
      case RenderModes.Shape:
        this.renderShape();
        break;
    }
  }

  renderEllipses() {
    noStroke();
    fill(255);

    for (let x = 0; x < this.yvalues.length; x++) {
      let position = createVector(
        x * this.xspacing,
        height / 2 + this.yvalues[x]
      );

      position.add(this.velocity);

      // position.y += map(distanceToMouse, 0, maxDistance, 0, 50);

      ellipse(position.x, position.y, this.ellipseRadius, this.ellipseRadius);
    }
  }

  renderShape() {
    noFill();
    stroke("#ffe8ec");

    beginShape();

    for (let x = 0; x < this.yvalues.length; x++) {
      vertex(x * this.xspacing, height / 2 + this.yvalues[x]);
    }

    endShape();
  }

  setAmplitude(amplitude) {
    this.amplitude = amplitude;
  }

  setVelocity(x, y) {
    this.velocity = createVector(x, y);
  }

  setAcceleration(x, y) {
    this.acceleration = createVector(x, y);
  }
}
