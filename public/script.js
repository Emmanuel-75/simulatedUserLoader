const userData = [
  { user: "nikki",   posts: [{ title: "First Post", likes: 12 }, { title: "Learning JS", likes: 30 }] },
  { user: "daniel",  posts: [{ title: "Hello World", likes: 5 }, { title: "Async JavaScript", likes: 18 }] },
  { user: "amina",   posts: [{ title: "CSS Tricks", likes: 22 }, { title: "Flexbox Guide", likes: 17 }] },
  { user: "emeka",   posts: [{ title: "Node Basics", likes: 9 }, { title: "Understanding APIs", likes: 14 }] },
  { user: "grace",   posts: [{ title: "UI Design Tips", likes: 26 }, { title: "Figma Workflow", likes: 19 }] },
  { user: "ibrahim", posts: [{ title: "Python vs JS", likes: 13 }, { title: "Coding Daily", likes: 21 }] },
  { user: "fatima",  posts: [{ title: "React Basics", likes: 28 }, { title: "Component Thinking", likes: 24 }] },
  { user: "chinedu", posts: [{ title: "Git Commands", likes: 11 }, { title: "Version Control Tips", likes: 16 }] },
  { user: "tunde",   posts: [{ title: "Debugging JS", likes: 20 }, { title: "Console Tricks", likes: 15 }] },
  { user: "zainab",  posts: [{ title: "HTML Semantics", likes: 18 }, { title: "Accessibility Matters", likes: 23 }] },
  { user: "samuel",  posts: [{ title: "Web Performance", likes: 27 }, { title: "Lazy Loading", likes: 14 }] },
  { user: "esther",  posts: [{ title: "Tailwind Guide", likes: 29 }, { title: "Utility First CSS", likes: 25 }] },
  { user: "victor",  posts: [{ title: "JavaScript Arrays", likes: 16 }, { title: "Map Filter Reduce", likes: 22 }] },
  { user: "kemi",    posts: [{ title: "Async Await Intro", likes: 19 }, { title: "Promises Explained", likes: 21 }] },
  { user: "ade",     posts: [{ title: "Deploying Apps", likes: 17 }, { title: "Netlify vs Vercel", likes: 20 }] },
];

const callbacksBtn = document.querySelector('.callbacksBtn');
const promisesBtn  = document.querySelector('.promisesBtn');
const fetchBtn     = document.querySelector('.fetchBtn');
const usernameEl   = document.querySelector('.username');
const post1El      = document.querySelector('.post1');
const post2El      = document.querySelector('.post2');
const likes1El     = document.querySelector('.amountOfLikes1');
const likes2El     = document.querySelector('.amountOfLikes2');
const loadingEl    = document.querySelector('.loading');
const loadedDataEl = document.querySelector('.loadedData');
const errorEl      = document.querySelector('.errorMsg');

let useCallbacks = true;

callbacksBtn.addEventListener('click', () => {
  useCallbacks = true;
  callbacksBtn.classList.replace('btnOff', 'btnOn');
  promisesBtn.classList.replace('btnOn', 'btnOff');
});

promisesBtn.addEventListener('click', () => {
  useCallbacks = false;
  promisesBtn.classList.replace('btnOff', 'btnOn');
  callbacksBtn.classList.replace('btnOn', 'btnOff');
});

function showLoading() {
  errorEl.classList.add('hidden');
  loadedDataEl.classList.add('hidden');
  loadingEl.classList.remove('hidden');
}

function showLoaded(user) {
  usernameEl.textContent = user.user;
  post1El.textContent    = user.posts[0].title;
  post2El.textContent    = user.posts[1].title;
  likes1El.textContent   = user.posts[0].likes;
  likes2El.textContent   = user.posts[1].likes;

  loadingEl.classList.add('hidden');
  loadedDataEl.classList.remove('hidden');
}

function showError(msg) {
  loadingEl.classList.add('hidden');
  loadedDataEl.classList.add('hidden');
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
}

function shouldFail() {
  return Math.floor(Math.random() * 11) <= 3;
}

function fetchUserCB(index, onSuccess, onError) {
  console.log('Fetching user…');
  setTimeout(() => {
    if (shouldFail()) { onError('Network error: failed to fetch user.'); return; }
    const user = userData[index];
    console.log('User fetched:', user.user);
    onSuccess(user);
  }, 1000);
}

function fetchPostsCB(user, onSuccess, onError) {
  console.log('Fetching posts…');
  setTimeout(() => {
    if (shouldFail()) { onError('Network error: failed to fetch posts.'); return; }
    console.log('Posts fetched for:', user.user);
    onSuccess(user);
  }, 1000);
}

function runCallbacks() {
  const index = Math.floor(Math.random() * userData.length);
  showLoading();

  fetchUserCB(index,
    (user) => {
      fetchPostsCB(user,
        (userWithPosts) => {
          console.log('Data loaded!');
          showLoaded(userWithPosts);
        },
        (err) => showError(err)
      );
    },
    (err) => showError(err)
  );
}

function fetchUserP(index) {
  console.log('Fetching user…');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) { reject('Network error: failed to fetch user.'); return; }
      const user = userData[index];
      console.log('User fetched:', user.user);
      resolve(user);
    }, 1000);
  });
}

function fetchPostsP(user) {
  console.log('Fetching posts…');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) { reject('Network error: failed to fetch posts.'); return; }
      console.log('Posts fetched for:', user.user);
      resolve(user);
    }, 1000);
  });
}

function runPromises() {
  const index = Math.floor(Math.random() * userData.length);
  showLoading();

  fetchUserP(index)
    .then((user) => fetchPostsP(user))
    .then((user) => {
      console.log('Data loaded!');
      showLoaded(user);
    })
    .catch((err) => showError(err));
}

fetchBtn.addEventListener('click', () => {
  useCallbacks ? runCallbacks() : runPromises();
});
