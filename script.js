// --- Mobile Navigation Toggle ---

const hamburger = document.getElementById('hamburger');

const navLinks = document.getElementById('navLinks');



if (hamburger && navLinks) {

    hamburger.addEventListener('click', () => {

        navLinks.classList.toggle('active');

    });

}



// --- Student Portal Login Modal Logic ---

const loginBtn = document.getElementById('loginBtn');

const loginModal = document.getElementById('loginModal');

const closeLogin = document.getElementById('closeLogin');

const loginForm = document.getElementById('loginForm');

const loginMessage = document.getElementById('loginMessage');



if (loginBtn && loginModal && closeLogin) {

    loginBtn.addEventListener('click', (e) => {

        e.preventDefault();

        loginModal.style.display = 'flex';

    });



    closeLogin.addEventListener('click', () => {

        loginModal.style.display = 'none';

        loginMessage.textContent = '';

        loginForm.reset();

    });



    window.addEventListener('click', (e) => {

        if (e.target === loginModal) {

            loginModal.style.display = 'none';

            loginMessage.textContent = '';

            loginForm.reset();

        }

    });

}



if (loginForm) {

    loginForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const id = document.getElementById('studentId').value.trim();

        const pass = document.getElementById('studentPassword').value.trim();



        // Sample mock verification credentials: ID -> PTC101, Password -> student123

        if (id === 'PTC101' && pass === 'student123') {

            loginMessage.style.color = '#10B981';

            loginMessage.textContent = 'Login Successful! Redirecting to dashboard...';

            setTimeout(() => {

                alert('Welcome to your Student Dashboard, PTC101!');

                loginModal.style.display = 'none';

                loginForm.reset();

                loginMessage.textContent = '';

            }, 1000);

        } else {

            loginMessage.style.color = 'var(--accent-color)';

            loginMessage.textContent = 'Invalid Student ID or Password. Please try again.';

        }

    });

}



// --- Chatbot Logic ---

const chatToggleBtn = document.getElementById('chat-toggle-btn');

const chatWindow = document.getElementById('chat-window');

const closeChat = document.getElementById('close-chat');

const chatInput = document.getElementById('chat-input');

const sendChat = document.getElementById('send-chat');

const chatBody = document.getElementById('chat-body');



if (chatToggleBtn && chatWindow && closeChat) {

    chatToggleBtn.addEventListener('click', () => {

        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';

    });



    closeChat.addEventListener('click', () => {

        chatWindow.style.display = 'none';

    });

}



function appendMessage(sender, text) {

    const msgDiv = document.createElement('div');

    

    if (sender === 'user') {

        msgDiv.style.background = 'var(--accent-color)';

        msgDiv.style.color = 'white';

        msgDiv.style.padding = '10px 14px';

        msgDiv.style.borderRadius = '8px';

        msgDiv.style.marginBottom = '10px';

        msgDiv.style.textAlign = 'right';

        msgDiv.style.marginLeft = 'auto';

        msgDiv.style.maxWidth = '80%';

        msgDiv.style.fontSize = '13.5px';

    } else {

        msgDiv.classList.add('bot-msg');

    }

    

    msgDiv.textContent = text;

    chatBody.appendChild(msgDiv);

    chatBody.scrollTop = chatBody.scrollHeight;

}



function handleBotResponse(userText) {

    const text = userText.toLowerCase();

    

    setTimeout(() => {

        if (text.includes('online') || text.includes('live')) {

            appendMessage('bot', 'Our Online Interactive Batches are tailored for grades 5th to 10th with daily live support and digital notes.');

        } else if (text.includes('offline') || text.includes('center') || text.includes('naigaon')) {

            appendMessage('bot', 'Our Offline Center is located at Nakshatra Greens, Naigaon (East). Feel free to drop by or contact us on WhatsApp!');

        } else if (text.includes('fees') || text.includes('price') || text.includes('discount')) {

            appendMessage('bot', 'We currently offer a flat 10% off on your first month’s tuition fees! Connect with us on WhatsApp at +91 9987566019.');

        } else if (text.includes('5th') || text.includes('6th') || text.includes('7th') || text.includes('8th') || text.includes('9th') || text.includes('10th')) {

            appendMessage('bot', 'We provide specialized foundation courses and board exam training for grades 5th through 10th in both Online & Offline modes.');

        } else {

            appendMessage('bot', 'Thanks for your message! You can look through our courses above or message us on WhatsApp (+91 9987566019) for immediate assistance.');

        }

    }, 500);

}



if (sendChat && chatInput) {

    sendChat.addEventListener('click', () => {

        const text = chatInput.value.trim();

        if (text) {

            appendMessage('user', text);

            chatInput.value = '';

            handleBotResponse(text);

        }

    });



    chatInput.addEventListener('keypress', (e) => {

        if (e.key === 'Enter') {

            sendChat.click();

        }

    });

} 
