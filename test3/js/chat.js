'use strict';
const msgTemplates = document.querySelector('.messages-templates');
const loader = msgTemplates.children[0];
const message = msgTemplates.children[1];
const messagePersonal = msgTemplates.children[2];
const messageStatus = msgTemplates.children[3];
const messageContent = document.querySelector('.messages-content');
const submit = document.querySelector('.message-submit');
const input = document.querySelector('.message-input');

const chatStatus = document.querySelector('.chat-status');
const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
const container = document.querySelector('.messages-content');
container.style.overflow ='auto';

connection.addEventListener('open'
    , () => {
        submit.removeAttribute('disabled');
        chatStatus.textContent = chatStatus.dataset.online;
    });

connection.addEventListener('message', messageHandler);
connection.addEventListener('close',closeHandler);

submit.addEventListener('click', sendMsg);
input.addEventListener('keydown', inputHandler);

function closeHandler(){
    submit.setAttribute('disabled', true);
    chatStatus.textContent = chatStatus.dataset.offline;
}

function inputHandler(event) {
    event.preventDefault();
    if (event.key == 'Enter') {
        sendMsg();
        return;
    }
    if (event.key.length == 1) {
        input.value = input.value + event.key;
    }
}
function sendMsg(event) {
    if(event){
        event.preventDefault();
    }

    if (input.value != '') {
        let tmpMsg = messagePersonal.cloneNode(true);
        tmpMsg.children[0].textContent = input.value;
        tmpMsg.children[1].textContent = getCurrentTime();
        messageContent.appendChild(tmpMsg);
        input.value = '';
    }
    connection.send(JSON.stringify({message: input.value}));

}
function messageHandler(event) {
    if (event.data == '...') {
        let tmpLoader = loader.cloneNode(true);
        tmpLoader.children[1].textContent = '...';
        messageContent.appendChild(tmpLoader)
    }
    else {
        let tmpLoader = messageContent.querySelector('.loading');
        let tmpMsg = message.cloneNode(true);
        tmpMsg.children[1].textContent = event.data;
        tmpMsg.children[2].textContent = getCurrentTime();
        messageContent.removeChild(tmpLoader);
        messageContent.appendChild(tmpMsg);
    }
}

function getCurrentTime() {
    let time = new Date();
    let hours = '0' + time.getHours();
    let min = '0' + time.getMinutes();
    return hours.slice(-2)+':'+min.slice(-2);
}

