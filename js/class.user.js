"use strict";

/*******************************************************
 *  Users
 *
 *  See: https://jsonplaceholder.typicode.com/users
 *
 *  Your users should have:
 *      -id
 *      -name
 *      -username
 *      -email
 *      -website
 *
 *  You can skip address, phone and company.
 *
 *  users should also have posts[] (see main.js).
 *
 *  When printing a user, don't forget to make
 *      - href="mailto:.." for the email and
 *      - href=".." target="_blank" for the website.
 *  *******************************************************/


export class User {
    constructor({ id, name, username, email, website }) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.website = website;
    }

    print() {
        const li = document.createElement("li");
        li.classList.add("user-item");
        li.dataset.userId = this.id;

        li.innerHTML = `
            <div class="user-header">
                <span class="user-name">${this.name}</span>
                <span class="user-meta">@${this.username} · <a href="mailto:${this.email}">${this.email}</a> · <a href="https://${this.website}" target="_blank">${this.website}</a></span>
            </div>
            <ul class="posts-list hidden"></ul>
        `;
        return li;
    }
}
