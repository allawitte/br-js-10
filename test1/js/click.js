'use strinct';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open'
    , () => {
        console.log('Вебсокет-соединение открыто');
    });

connection.addEventListener('message'
    , event => {
        showBubbles(event.target);
    });
document.addEventListener('click', sendClick);

function sendClick(e) {
    connection.send(JSON.stringify({x: e.screenX, y: e.screenY}));
}

