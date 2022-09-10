import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllUsers, inviteUser } from '../api/data.js';

const inviteModalTemplate = () => html`

`;

export async function inviteUserPage(ctx) {
    ctx.render()
}