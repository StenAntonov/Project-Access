import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { homePage } from './views/home.js';

const container = document.getElementById('container');


page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, container);

    next();
}