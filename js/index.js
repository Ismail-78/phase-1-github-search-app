document.addEventListener('DOMContentLoaded', fetchNames)

function fetchNames() {
    let form =document.querySelector('form');
    let content=document.querySelector('#search');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        fetch(`https://api.github.com/search/users?q=${content.value}`, {
            method :'GET',
            headers:{
            'Accept':'aplication/vnd.github.v3+json'
    }
        })
        .then(Response => Response.json())
        .then(data => Datainputs(data))
        .catch( error => {
            //handle any errors
            console.log(error);
        });
    });
}

function Datainputs(data) {
    data.items.forEach((data) => {
        let userList=document.querySelector('#user-list');
        let listItems=document.createElement('li');
        listItems.classList.add('user-item');

        listItems.innerHTML=`
        <img src='${data.avatar_url}' alt ='${data.login}' class='user-avatar>
        <div class='user-details'>
           <span id='username' class='user-login'>${data.login}</span>
           span class='user-url'>${data.html-url}</span>
        </div>   
        `;
        userList.appendChild(listItems);
    })
}

let profile=document.getElementsByClassName("user-url");
let name = document.getElementById('username').textContent;
for (let i=0; i< profile.length; i++) {
    profile[i].addEventListener('click', function(event) {
        event.preventDefault();
        fetch('https://api.github.com/users/${name}/repos', {
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/vnd.github.v3+json',
                'X-Github-Api-Version':'2022-11-28'
            }
        })
        .then(response => response.json())
        .then(data => ReposInputs(data))
        .catch(error => {
            //handle any error
            console.log(error);
        });

    });
}
function ReposInputs(data) {
    let repoList=document.querySelector('#repos-list');
    repoList.innerHTML='';

    data.forEach(repo => {
        let listItems= document.createElement('li');
        listItems.textContent =repo.name;
        repoList.appendChild(listItems);
    });
}