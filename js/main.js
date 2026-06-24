"use strict";

/*******************************************************
 *    Asynchronotrigger - 100p
 *
 *    This is your last assignment. Finish this to proof that
 *    you are a grown up now, who doesn't need to be held by
 *    the hand.
 *
 *    Create a users-class. Fetch the users, create Instances.
 *    - https://jsonplaceholder.typicode.com/users
 *
 *    Create a posts-class. Fetch the posts. create Instances.
 *    Assign them to the users (see userId in the posts).
 *    - https://jsonplaceholder.typicode.com/posts
 *
 *    Print the shit. Beautifully:
 *    List the 10 users. On click, expand them with their posts.
 *    Each Post should also have a Button to "load comments".
 *    Yes, you are correct. This is the perfect usecase for
 *    event-delegation! You can get the comments to a post from either
 *    - https://jsonplaceholder.typicode.com/posts/1/comments
 *    or
 *    - https://jsonplaceholder.typicode.com/comments?postId=1
 *    where "1" stands for the posts ID of course.
 *
 *    I believe in...
 *    Iva - 2026-06-24
 *  *******************************************************/


import { User } from "./class.user.js";
import { Post } from "./class.post.js";

const BASE = "https://jsonplaceholder.typicode.com";

async function init() {
    const [usersData, postsData] = await Promise.all([
        fetch(`${BASE}/users`).then(r => r.json()),
        fetch(`${BASE}/posts`).then(r => r.json()),
    ]);
#
    const users = usersData.map(u => new User(u));
    const userMap = new Map(users.map(u => [u.id, u]));

    postsData.forEach(p => {
        const post = new Post(p);
        const user = userMap.get(p.userId);
        if (user) user.posts.push(post);
    });

    const ul = document.getElementById("user-list");
    users.forEach(user => ul.appendChild(user.print()));

    ul.addEventListener("click", async (e) => {

        const userHeader = e.target.closest(".user-header");
        if (userHeader) {
            const li = userHeader.closest(".user-item");
            const postsUl = li.querySelector(".posts-list");
            const icon = li.querySelector(".toggle-icon");
            const isOpen = !postsUl.classList.contains("hidden");

            if (isOpen) {
                postsUl.classList.add("hidden");
            } else {
                if (postsUl.children.length === 0) {
                    const userId = parseInt(li.dataset.userId);
                    const user = userMap.get(userId);
                    user.posts.forEach(post => postsUl.appendChild(post.print()));
                }
                postsUl.classList.remove("hidden");
            }
            return;
        }

        const btn = e.target.closest(".load-comments-btn");
        if (btn) {
            const postId = parseInt(btn.dataset.postId);
            const postItem = btn.closest(".post-item");
            const commentsUl = postItem.querySelector(".comments-list");

            const userId = parseInt(postItem.closest(".user-item").dataset.userId);
            const user = userMap.get(userId);
            const post = user.posts.find(p => p.id === postId);

            btn.disabled = true;

            if (post.comments.length === 0) {
                const data = await fetch(`${BASE}/posts/${postId}/comments`).then(r => r.json());
                post.comments = data;
            }

            post.printComments(commentsUl);
            commentsUl.classList.remove("hidden");
        }
    });
}

init();
