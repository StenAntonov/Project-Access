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

// Modal

// Get the modal
// var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
//   container.disable = true;
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// formBtn.addEventListener('click', addNewUser());

// function addNewUser(e) {

    // e.preventDefault();
    // console.log('tuk');
    // const formData = new FormData(form);
    // const firstName = formData.get('firstName');
    // const lastName = formData.get('lastName');
    // const email = formData.get('email');
    // const role = formData.get('role');

    // console.log(formData);
    // console.log(firstName);
    // console.log(lastName);
    // console.log(email);
    // console.log(role);
// }


// function fieldsVeryfication() {
//     console.log(formData);
// }