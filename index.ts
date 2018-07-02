import './src/lib/webgl-debug';
import './src/lib/webgl-utils';
import './src/lib/cuon-utils';

const routes = {
  '/demo1': () => import('./src/demo1'),
};

const app = document.getElementById('app') as HTMLAnchorElement;
const modFunc = routes[location.pathname];
if (!modFunc) {
  app.innerHTML = Object.keys(routes)
    .map(r => `<a class="entry" href="${r}">${r}</a>`)
    .join('');
} else {
  app.innerHTML = '';
  modFunc().then(mod => {
    const canvas = document.createElement('canvas');
    const config = mod.config || {};
    canvas.width = config.width || 400;
    canvas.height = config.height || 400;
    const gl = getWebGLContext(canvas);
    app.appendChild(canvas);

    const result = mod.default(gl, canvas);
    if (result && result.update) {
      const fps = result.fps || 60;
      const global = window as any;
      const max_t = 1000 / fps;
      let t;

      const animate = () => {
        // animation frame
        if (global.animate && global.animate !== animate) {
          // prevent recreate animation in hmr
          return;
        }

        const n_t = Date.now();
        if (!t || (n_t - t) >= max_t) {
          result.update(n_t);
          t = n_t;
        }

        window.requestAnimationFrame(animate);
      };

      global.animate = animate;
      animate();
    }
  });
}
