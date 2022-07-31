import { html } from '../../node_modules/lit-html/lit-html.js';


const userTemplate = () => html`
<header>
    <h1 class="header-h1">User Setup</h1>
    <a href="javascript:void(0)" id="myBtn" class="user-settings"><img class="settings-wheel" src="../../assets/images/settings.svg" alt="settings" /></a>
</header>
<main class="user-main">
    <section class="user-photo">
        <article class="photo"></article>
    </section>
    <section class="user-details">
        <h1 className="user-details-h1">Details</h1>
    </section>
    <section class="user-permissions">
    <h1 className="user-permissions-h1">Permissions</h1>
    </section>
</main>`;

export async function userPage(ctx) {
    ctx.render(userTemplate());
};