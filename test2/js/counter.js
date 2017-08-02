'use strict';
const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
connection.addEventListener('open'
    , () => {
        console.log('Вебсокет-соединение открыто');
    });

connection.addEventListener('message', showConnections);

function showConnections(event){
    let data = JSON.parse(event.data);
    counter.textContent = data.connections;
    errors.textContent = data.errors;
    connection.close(1000);
}
