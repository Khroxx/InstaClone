let post = [
    {
        'userimg': 'userimg/userimg.png',
        'user': 'oooo_lover',
        'image': 'img/1.jpg',
        'title': 'Audi A5',
        'description': 'Einer der schönsten Audis mit einer der schlimmsten Motoren die man finden kann',
        'comments': '',
        'likes': 4
    },
    {
        'userimg': 'img/userimg.png',
        'user': 'driftlegend',
        'image': 'img/2.jpg',
        'title': 'Silvia S14',
        'description': 'Eine schönheit die es hierzulande nicht gibt',
        'comments': '',
        'likes': 33
    },
    {
        'userimg': 'img/userimg.png',
        'user': 'Stututu',
        'image': 'img/3.jpg',
        'title': 'Skyline R34',
        'description': 'Die Fast & Fuirious Ikone selbst, der Skyline!',
        'comments': '',
        'likes': 4538
    },
    {
        'userimg': 'img/userimg.png',
        'user': 'The_Evolution',
        'image': 'img/4.jpg',
        'title': 'Mitsubishi Evo 6',
        'description': 'Schonmal einen richtigen Bergsteiger gesehen?',
        'comments': '',
        'likes': 433
    },
    {
        'userimg': 'img/userimg.png',
        'user': 'keinAMG',
        'image': 'img/5.jpg',
        'title': 'Mercedes C280',
        'description': 'Schonmal in einer Mafia gewesen? Jetzt darfst du',
        'comments': '',
        'likes': 725
    }
];
let counter = post['likes'];
let friends = ['oooo_lover', 'driftlegend', 'Stututu', 'The_Evolution', 'keinAMG', 'soeinRandom', 'derandere'];
let images = ['img2/kroatien1.jpg', 'img2/kroatien2.webp', 'img2/kroatien3.jpg', 'img2/kroatien4.jpg', 'img2/kroatien5.jpg', 'img2/kroatien6.jpg', 
'img2/kroatien7.jpeg', 'img2/kroatien8.jpg', 'img2/kroatien9.jpeg', 'img2/kroatien10.jpg', 'img2/kroatien11.jpg', 'img2/kroatien12.jpg', 'img2/kroatien13.jpg', 
'img2/kroatien14.jpg', 'img2/kroatien15.jpg', 'img2/kroatien16.jpg',  'img2/kroatien17.avif', 'img2/amazonas1.webp', 'img2/amazonas2.jpg', 'img2/amazonas3.jpg', 
'img2/amazonas4.webp', 'img2/amazonas5.jpg', 'img2/amazonas6.jpg', 'img2/amazonas7.jpg'];

function show() {
    document.getElementById('postcontainer').innerHTML = '';
    if (localStorage.getItem('posts')) {
        post = JSON.parse(localStorage.getItem('posts'));
    }
    for (let i = 0; i < post.length; i++) {
        const posts = post[i];
        document.getElementById('postcontainer').innerHTML += postCard(i, posts); 

        let comments = document.getElementById(`comments${i}`);
        comments.innerHTML = '';

        for (let j = 0; j < posts['comments'].length; j++){
            const comment = posts['comments'][j];
            comments.innerHTML += `Anonym: ${comment}<br>`;
        }

        let img = document.getElementById(`image${i}`);
        if (img && localStorage.getItem(`imgSrc${i}`)) {
            img.src = localStorage.getItem(`imgSrc${i}`);
        }
    }
}

function postCard(i, posts){
    let imgSrc = posts['likes'] > 0 ? 'img/heart.png' : 'img/like.png';
    return ` <div class="content">
    <div class="user"><img src="/userimg/userimg.png">${posts['user']}</div>
    <img onclick="openImage(${i})" class="titleImg" src="${posts['image']}">
    <div class="title">${posts['title']} <img id="image${i}" class="cursor" onclick="addCounter(${i})" src="${imgSrc}" alt=""><p id="counter${i}">${posts['likes']}</p></div>
    <div class="description">${posts['description']}</div>
    <div id="comments${i}" class="comment"></div>
    <div class="commentDiv"><input class="commentInput" id="input${i}" type="text" placeholder="Kommentieren..."><button class="postBtn" id="postButton${i}" onclick="addComment(${i})">Posten</button></div>
    </div>`;
}

function renderFriends() {
    document.getElementById('friends').innerHTML = '<h2>Entdecke andere Fwiends</h2>';
    for (let i = 0; i < friends.length; i++) {
        let friend = friends[i];
        let followButtonText = 'Folgen';
        let followStatus = localStorage.getItem(`followStatus${i}`);

        if (followStatus === 'true') {
            followButtonText = 'Entfolgen';
        }

        document.getElementById('friends').innerHTML += /*html*/ `
        <div class="userfriends"><img src="userimg/userimg.png" alt=""><h3>${friend}<br><button id="followButton${i}" class="friendBtn" onclick="toggleFollow(${i})">${followButtonText}</button></h3></div>`;
    }
}

function toggleFollow(index) {
    let followButton = document.getElementById(`followButton${index}`);
    let followStatus = localStorage.getItem(`followStatus${index}`);

    if (followStatus === 'true') {
        localStorage.setItem(`followStatus${index}`, 'false');
        followButton.textContent = 'Folgen';
    } else {
        localStorage.setItem(`followStatus${index}`, 'true');
        followButton.textContent = 'Entfolgen';
    }
    show();
}

function searchUser() {
    let search = document.getElementById('search').value.toLowerCase();
    let content = document.getElementsByClassName('content');
    for (i = 0; i < content.length; i++) { 
        let friendName = friends[i].toLowerCase();
        if (!friendName.includes(search)) {
            content[i].style.display = "none";
        } else {
            content[i].style.display = "inline-block";
        }
    }
}

function addComment(index) {
    let input = document.getElementById(`input${index}`);
    if (input.value.trim() !== '') {
        if (!Array.isArray(post[index].comments)) {
            post[index].comments = [];
        }
        post[index]['comments'].push(input.value);
        localStorage.setItem('posts', JSON.stringify(post));
        show();
        input.value ='';
    }
}

function addCounter(i) {
    let img = document.getElementById(`image${i}`);
    if (img && img.src.includes('img/like.png')) {
        post[i]['likes']--;
        img.src = 'img/heart.png';
    } else if (img) {
        post[i]['likes']++;
        img.src = 'img/like.png';
    }

    let likesCount = document.getElementById(`counter${i}`);
    if (likesCount) {
        likesCount.textContent = post[i]['likes'];
    }

    localStorage.setItem('posts', JSON.stringify(post));
    localStorage.setItem(`imgSrc${i}`, img.src);
}



// profil 
function loadProfile() { 
    document.getElementById('albumImgs').innerHTML = '';
        for(i = 0; i < images.length; i++){
        document.getElementById('albumImgs').innerHTML += `
            <div onclick="openProfile(${i})" class="imgbox"><img src ="${images[i]}"></div>
        `
    }
}
// open popup 

function openImage(i){ 
    let popupBg = document.getElementById('popupBg');
    let popup = document.getElementById('popup')
    popupBg.style.visibility = 'visible';
    const posts = post[i];
    popup.innerHTML = createPopup(posts, i);

    let commentsPopup = document.getElementById('commentsPopup');
        commentsPopup.innerHTML = '';

    for (let j = 0; j < posts['comments'].length; j++) {
        const comment = posts['comments'][j];
        commentsPopup.innerHTML += `Anonym: ${comment}<br>`;
    }
    let imgPopup = document.getElementById(`popupImage${i}`);
    if (imgPopup && localStorage.getItem(`imgSrc${i}`)) {
        imgPopup.src = localStorage.getItem(`imgSrc${i}`);
    }

    let counterPopup = document.getElementById(`popupCounter${i}`);
    if (counterPopup) {
        counterPopup.textContent = posts['likes'];
    } 
}

function createPopup(posts, i) {
    let imgSrc = posts['likes'] > 0 ? 'img/heart.png' : 'img/like.png';
    return `
    <div class="user"><img src="/userimg/userimg.png">${posts['user']}</div>
    <img id="imagePopup" src="${posts['image']}" alt="">
    <div class="popupTitle">${posts['title']} <img id="popupImage${i}" class="cursor" onclick="addCounterPopup(${i})" src="${imgSrc}" alt=""><p id="popupCounter${i}">${posts['likes']}</p></div>
    <div class="description, popupDesc">${posts['description']}</div>
    <div id="commentsPopup" class="comment, popupComment"></div>
    <div class="commentDiv"><input class="commentInput" id="inputPopup" type="text" placeholder="Kommentieren..."><button class="postBtn" id="postButtonPopup" onclick="addCommentPopup(${i})">Posten</button></div>
  `;
}

function addCommentPopup(index) {
    let input = document.getElementById('inputPopup');
    if (input.value.trim() !== '') {
      if (!Array.isArray(post[index].comments)) {
        post[index].comments = [];
      }
      post[index]['comments'].push(input.value);
      localStorage.setItem('posts', JSON.stringify(post));
      openImage(index);
      input.value = '';
    }
}

function addCounterPopup(index) {
    let imgPopup = document.getElementById(`popupImage${index}`);
    if (imgPopup && imgPopup.src.includes('img/like.png')) {
      post[index]['likes']--;
      imgPopup.src = 'img/heart.png';
    } else if (imgPopup) {
      post[index]['likes']++;
      imgPopup.src = 'img/like.png';
    }
  
    let likesCountPopup = document.getElementById(`popupCounter${index}`);
    if (likesCountPopup) {
      likesCountPopup.textContent = post[index]['likes'];
    }
  
    localStorage.setItem('posts', JSON.stringify(post));
    localStorage.setItem(`imgSrc${index}`, imgPopup.src);
}

function createProfilePopup(i) {
    return `
    <div id="profilePopup">
    <button onclick="showPreviousImage(${i})" id="btnL"><</button>
    <img id="profileImg" src="${images[i]}" alt="">
    <button onclick="showNextImage(${i})" id="btnR">></button>
    </div>
    `
}
// popup fürs Profil 

var currentIndex = 0;
function openProfile(i){ 
    let popupBg = document.getElementById('popupBg')
    let popup = document.getElementById('popup')
    popupBg.style.visibility = 'visible';
    popup.innerHTML = createProfilePopup(i);
    currentIndex = i;
    if (i === 0) {
        pfeile('btnL', 'hidden');
    } else {
        pfeile('btnL', 'visible');
    }
    if (i === images.length - 1) {
        pfeile('btnR', 'hidden');
    } else {
        pfeile('btnR', 'visible');
    }
}
function showPreviousImage(){
    prevImage = (currentIndex - 1 + images.length) % images.length
    openProfile(prevImage);
}
function showNextImage() {
    nextImage = (currentIndex + 1) % images.length
    openProfile(nextImage);
}
function pfeile(elementId, visibility) {
    let popupBg = document.getElementById('popupBg');
    let element = document.getElementById(elementId);
    if (popupBg.style.visibility === 'visible') {
        element.style.visibility = visibility;
    } else {
        element.style.visibility = 'hidden';
    }
}

// Event Listener 
document.addEventListener('DOMContentLoaded', function() {
    let searchBtn = document.getElementById('searchBtn');
    let search = document.getElementById('search');
  
    searchBtn.addEventListener('click', function(event) {
        event.preventDefault();
  
        if (search.style.visibility === 'visible') {
            search.style.visibility = 'hidden';
        } else {
            search.style.visibility = 'visible';
        }
    });

    let popupBg = document.getElementById('popupBg');
    let popup = document.getElementById('popup');
    popupBg.addEventListener('click', function(event) {
        if (event.target === popupBg) {3
            popupBg.style.visibility = 'hidden';
            popup.innerHTML = '' ;
            show();
        }
        event.stopPropagation();
    });
    popup.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
// Event Listener Ende 