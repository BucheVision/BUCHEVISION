document.addEventListener('DOMContentLoaded', function () {
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');
  const usernameInput = document.getElementById('usernameInput');
  const setUsernameButton = document.getElementById('setUsernameButton');
  let currentUsername = '';

  const serverUrl = 'ws://localhost:3000'; // Replace with your WebSocket server URL

  let socket = new WebSocket(serverUrl);

  socket.addEventListener('open', function (event) {
    console.log('Connected to the WebSocket server');
  });

  socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);
    addMessage(message.username, message.content);
  });

  sendButton.addEventListener('click', function () {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
      const message = {
        username: currentUsername,
        content: messageText,
      };
      socket.send(JSON.stringify(message));
      messageInput.value = '';
    }
  });

  setUsernameButton.addEventListener('click', function () {
    currentUsername = usernameInput.value || 'User';
  });

  function addMessage(username, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    const usernameSpan = document.createElement('span');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = username + ': ';

    const contentSpan = document.createElement('span');
    contentSpan.classList.add('content');
    contentSpan.textContent = content;

    messageDiv.appendChild(usernameSpan);
    messageDiv.appendChild(contentSpan);

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom
  }
});
