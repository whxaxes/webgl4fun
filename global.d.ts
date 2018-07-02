declare function initShaders(gl: WebGLRenderingContext, vshader: string, fshader: string): boolean;

interface NewWebGLRenderingContext extends WebGLRenderingContext {
  program: WebGLProgram;
}

declare function getWebGLContext(canvas: HTMLCanvasElement, opt_debug?: any): NewWebGLRenderingContext;

interface IWebGLUtils {
  setupWebGL(canvas: HTMLCanvasElement, opt_attribs?: WebGLContextAttributes, opt_onError?: any): WebGLRenderingContext;
  create3DContext(canvas: HTMLCanvasElement, opt_attribs?: WebGLContextAttributes): WebGLRenderingContext;
}

declare const WebGLUtils: IWebGLUtils;

interface AnimateObj {
  fps?: number;
  update?: (t: number) => void;
}
