import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllUsers, inviteUser } from '../api/data.js';



const homeTemplate = (onSubmit, users, sortByUsername, sortByRole, sortByStatus, deleteUser) => html`
<header>
    <h1 class="header-h1">Project Access</h1>
    <div class="search">
        <input type="text" class="header-input" placeholder="Type to filter the table">
    </div>
    <a href="javascript:void(0)" id="myBtn" class="add-user">+</a>
</header>
<main>
    <section class="table-contents">
        <button @click=${sortByUsername} class="th-user">user</button>
        <button @click=${sortByRole} class="th-role">role</button>
        <button @click=${sortByStatus} class="th-status">status</button>
        <p class="th-action">action</p>
    </section>
    <section class="table-user-details">

        ${Object.values(users).length == 0 ? html`<p class="no-users">No users in database!</p>` 
        : Object.values(users).map(userTemplate)}

    
    <section class="paginator">
        <article class="pag-left">
            <p class="pag-rec">Records on page</p>
            <p class="pag-num">${Object.values(users).length}</p>
        </article>
        <article class="pag-right">
            <p class="pag-previous">Previous</p>
            <p class="pag-1">1</p>
            <p class="pag-2">2</p>
            <p class="pag-next">Next</p>
        </article>
    </section>

    <div id="myModal" class="modal">

        <div class="modal-content">
            <span id="close" class="close">&times;</span>
            <h1 class="modal-heading">Invite New User</h1>
            <form @submit=${onSubmit} class="create-form">
                <div class="user-names">
                    <div>
                        <label class="firstName" for="firstName"><img class="face-icon"
                                src="./assets/images/face-24px (1).svg" alt="face"></label>
                        <input class="input-firstname" id="firstName" name="firstName" type="text"
                            placeholder="* First Name" value="">
                    </div>
                    <div>
                        <input class="input-lastname" id="lastName" name="lastName" type="text"
                            placeholder="* Last Name">
                    </div>
                </div>
                <div class="email">
                    <label for="email"><img class="email-icon" src="./assets/images/alternate_email-24px.svg"
                            alt="mail"></label>
                    <input class="input-email" id="email" name="email" type="email" placeholder="* Email">
                </div>
                <div class="input-role">
                    <label for="input-role"><img class="role-icon" src="./assets/images/vpn_key-24px (1).svg"
                            alt="key"></label>
                    <input class="input-role-input" list="roles" name="role" id="role" placeholder="* Role">

                    <datalist id="roles">
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </datalist>
                </div>
                <button class="invite-btn" type="submit">Send Invitation</button>
            </form>
        </div>
    </div>

    <div id="deleteModal" class="deleteModal">

        <div class="delete-modal-content">
            <span id="deleteSpan" class="delete-close">&times;</span>
            <h1 class="modal-heading">Delete User</h1>
            <div class="user-names">
                    <div>
                        <p class="delete-names">Danniel Blichman<img class="face-icon"
                                src="./assets/images/face-24px (1).svg" alt="face"></p>
                       
                    </div>
            <button class="delete-user-btn">Delete User</button>
        </div>
    </div>
</main>`;

const userTemplate = (user, deleteUser) => html`
<section class="user-row">
            <article class="user-icon"></article>
            <article class="name-and-mail">
                <p class="user-name">${user.firstname} ${user.lastname}</p>
                <p class="user-mail">${user.email}</p>
            </article>
            <article class="user-role">

                ${user.role == "Admin" ? html`<article class="user-role-admin">${user.role}</article>`
                : html`<article class="user-role-user">${user.role}</article>`}
                
            </article>
            <article class="user-status"></article>
            <article class="user-action">
                <a href="/user" class="user-setup"></a>
                <a @click=${deleteUser, user} href="javascript:void(0)" id="delete" class="delete-user"></a>
            </article>
            <article class="bottom-line"><img src="./assets/images/Rectangle 16.svg" alt="bottom-line">
            </article>
        </section>
`;


export async function homePage(ctx) {
    
    let users = await getAllUsers();

    function sortByUsername() {
        let sorted = Object.values(users).sort((a, b) => a.firstname.localeCompare(b.firstname));
        users = sorted;
        ctx.render(homeTemplate(onSubmit, users, sortByUsername, sortByRole, sortByStatus, deleteUser));
    }

    function sortByRole() {
        let sorted = Object.values(users).sort((a, b) => a.role.localeCompare(b.role));
        users = sorted;
        ctx.render(homeTemplate(onSubmit, users, sortByUsername, sortByRole, sortByStatus, deleteUser));
    }

    function sortByStatus() {
        let sorted = Object.values(users).sort((a, b) => a.status.localeCompare(b.status));
        users = sorted;
        ctx.render(homeTemplate(onSubmit, users, sortByUsername, sortByRole, sortByStatus, deleteUser));
    }

    ctx.render(homeTemplate(onSubmit, users, sortByUsername, sortByRole, sortByStatus, deleteUser));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const role = formData.get('role');
        const status = "Active";

        let userData = await getAllUsers();
        let current_index = String(Object.values(userData).length +'');

        const data =
        {
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: role,
            status: status,
            "_id": current_index
        }

        userData[current_index] = data;

        if(firstname == '' || lastname == '' || email == '' || role == '') {

        }

        try {
            await inviteUser(userData);
            let inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
        } catch (err) {
            console.log(err);
        }
        modal.style.display = "none";
        ctx.page.redirect('/home');
    }

    async function deleteUser(e, user, ctx) {
        e.preventDefault();

        console.log(user);
    }


    // Modal

    var modal = document.getElementById("myModal");

    var deleteModal = document.getElementById('deleteModal');

    var btn = document.getElementById("myBtn");

    var deleteBtn = document.getElementById('delete');

    var span = document.getElementById("close");

    var deleteSpan = document.getElementById('deleteSpan');

    const form = document.querySelector('form');
    const formBtn = document.getElementsByClassName('invite-btn')[0];

    btn.onclick = function () {
        modal.style.display = "block";
        container.disable = true;
    }

    deleteBtn.onclick = function () {
        deleteModal.style.display = "block";
        container.disable = true;
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    deleteSpan.onclick = function () {
        deleteModal.style.display = "none";
    }

    formBtn.addEventListener('click', onSubmit);
}

