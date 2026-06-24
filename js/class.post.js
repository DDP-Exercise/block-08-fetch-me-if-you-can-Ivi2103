"use strict";

/*******************************************************
 *  Posts
 *
 *  See: https://jsonplaceholder.typicode.com/posts
 *
 *  Your posts should have:
 *      -id
 *      -title
 *      -body
 *
 *  You can skip the userId, your users know their posts (see class.user.js)
 *
 *  posts should also have comments[] (see main.js).
 *
 *  When printing a post, don't forget to make a button that
 *  loads the comments for the post. Once they are loaded, print them.
 *  *******************************************************/

export class Post {
    constructor({ id, title, body }) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.comments = [];
    }

    print() {
        const li = document.createElement("li");
        li.classList.add("post-item");
        li.dataset.postId = this.id;

        li.innerHTML = `
            <div class="post-title">${this.title}</div>
            <div class="post-body">${this.body}</div>
            <button class="load-comments-btn" data-post-id="${this.id}">💬 Kommentare laden</button>
            <ul class="comments-list hidden"></ul>
        `;
        return li;
    }

    printComments(ul) {
        ul.innerHTML = "";
        this.comments.forEach(c => {
            const li = document.createElement("li");
            li.classList.add("comment-item");
            li.innerHTML = `<strong>${c.name}</strong> <em>&lt;${c.email}&gt;</em><p>${c.body}</p>`;
            ul.appendChild(li);
        });
    }
}
