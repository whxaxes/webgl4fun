/**
 * simple demo
 */

const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }
`;

export default function(gl: NewWebGLRenderingContext, canvas: HTMLCanvasElement): AnimateObj {
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  // color controll
  const colors = [1.0, 0.0, 0.0];
  const addon = 4 / 255;
  const colorMax = 1;
  const colorMin = 0.2;
  let direction = true;
  let colorsIndex = 0;

  const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  let pointX = 0.0;
  let pointY = 0.0;
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.vertexAttrib1f(a_PointSize, 20.0);

  // redraw point
  function drawPoint(x: number, y: number, z: number) {
    gl.clear(gl.COLOR_BUFFER_BIT); // clean canvas
    gl.uniform4f(u_FragColor, colors[0], colors[1], colors[2], 1.0);
    gl.vertexAttrib3f(a_Position, x, y, z);
    gl.drawArrays(gl.POINTS, 0, 1);

    // update color
    const c = (colors[colorsIndex] = colors[colorsIndex] + addon * (direction ? 1 : -1));
    if ((c >= colorMax && direction) || (c <= colorMin && !direction)) {
      colors[colorsIndex] = direction ? colorMax : colorMin;
      colorsIndex++;

      if (colorsIndex >= colors.length) {
        colorsIndex = 0;
        direction = !direction;
      }
    }
  }

  // mouse move
  canvas.onmousemove = e => {
    const x = e.clientX;
    const y = e.clientY;
    const rect = canvas.getBoundingClientRect();
    pointX = (x - rect.left - rect.width / 2) / (rect.width / 2);
    pointY = -(y - rect.top - rect.height / 2) / (rect.height / 2);
  };

  return {
    update() {
      drawPoint(pointX, pointY, 0.0);
    },
  };
}
