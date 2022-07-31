import { html } from '../../node_modules/lit-html/lit-html.js';


const userTemplate = () => html`
<header>
    <h1 class="header-h1">User Setup</h1>
    <a href="javascript:void(0)" id="myBtn" class="add-user"><img src="../../assets/images/settings.svg" alt="settings" /></a>
</header>`;

export async function userPage(ctx) {
    ctx.render(userTemplate());
};