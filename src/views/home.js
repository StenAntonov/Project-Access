import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllUsers, inviteUser } from '../api/data.js';


const homeTemplate = (onSubmit) => html`
<header>
    <h1 class="header-h1">Project Access</h1>
    <div class="search">
        <input type="text" class="header-input" placeholder="Type to filter the table">
    </div>
    <a href="javascript:void(0)" id="myBtn" class="add-user">+</a>
</header>
<main>
    <section class="table-contents">
        <p class="th-user" onclick="sortByUsername()">user</p>
        <p class="th-role" onclick="sortByRole()">role</p>
        <p class="th-status" onclick="sortByStatus()">status</p>
        <p class="th-action">action</p>
    </section>
    <section class="table-user-details">
        <section class="user-row">
            <article class="user-icon"></article>
            <article class="name-and-mail">
                <p class="user-name">Danniel Blichman</p>
                <p class="user-mail">danniel.blichman@testtask.com</p>
            </article>
            <article class="user-role">
                <article class="user-role-admin">Admin</article>
                <article class="user-role-user">User</article>
            </article>
            <article class="user-status"></article>
            <article class="user-action">
                <a href="/user" class="user-setup"></a>
                <a href="#" class="delete-user" onclick="deleteUser()"></a>
            </article>
            <article class="bottom-line"><img src="./assets/images/Rectangle 16.svg" alt="bottom-line">
            </article>
        </section>
        <section class="user-row">
            <article class="user-icon"></article>
            <article class="name-and-mail">
                <p class="user-name">Danniel Blichman</p>
                <p class="user-mail">danniel.blichman@testtask.com</p>
            </article>
            <article class="user-role">
                <article class="user-role-admin">Admin</article>
                <article class="user-role-user">User</article>
            </article>
            <article class="user-status"></article>
            <article class="user-action">
                <a href="#" class="user-setup"></a>
                <a href="#" class="delete-user" onclick="deleteUser()"></a>
            </article>
            <article class="bottom-line"><img src="./assets/images/Rectangle 16.svg" alt="bottom-line">
            </article>
        </section>
        <section class="user-row">
            <article class="user-icon"></article>
            <article class="name-and-mail">
                <p class="user-name">Danniel Blichman</p>
                <p class="user-mail">danniel.blichman@testtask.com</p>
            </article>
            <article class="user-role">
                <article class="user-role-admin">Admin</article>
                <article class="user-role-user">User</article>
            </article>
            <article class="user-status"></article>
            <article class="user-action">
                <a href="#" class="user-setup"></a>
                <a href="#" class="delete-user" onclick="deleteUser()"></a>
            </article>
            <article class="bottom-line"><img src="./assets/images/Rectangle 16.svg" alt="bottom-line">
            </article>
        </section>
    </section>
    <section class="paginator">
        <article class="pag-left">
            <p class="pag-rec">Records on page</p>
            <p class="pag-num">5</p>
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
            <span class="close">&times;</span>
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
</main>`;




const users = await getAllUsers();
console.log(users);

export async function homePage(ctx) {

    // let users = await getAllUsers();
    ctx.render(homeTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const role = formData.get('role');
        const status = "Active";

        console.log(Date.now());

        const data = {
            userId: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                status: status
            }
        }

        try {
            await inviteUser(data);
        } catch (err) {
            console.log(err);
        }
        modal.style.display = "none";
        ctx.page.redirect('/home');
    }

    // Modal

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    const form = document.querySelector('form');
    const formBtn = document.getElementsByClassName('invite-btn')[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
        container.disable = true;
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    formBtn.addEventListener('click', onSubmit);
}

