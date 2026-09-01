// --- Mobile Navigation Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// --- Master Student Database & Portal Logic ---
const studentsDatabase = [
    { id: "PTC101", pass: "student123", name: "Aarav Sharma", fees: "1500", grade: "10th Grade" },
    { id: "PTC102", pass: "mypass456", name: "Priya Verma", fees: "2000", grade: "9th Grade" },
    { id: "PTC103", pass: "secure789", name: "Rahul Gupta", fees: "1800", grade: "8th Grade" }
];

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
        const idInput = document.getElementById('studentId').value.trim();
        const passInput = document.getElementById('studentPassword').value.trim();

        const student = studentsDatabase.find(s => s.id === idInput && s.pass === passInput);

        if (student) {
            loginMessage.style.color = '#10B981';
            loginMessage.textContent = 'Login Successful! Opening dashboard...';
            
            setTimeout(() => {
                loginModal.style.display = 'none';
                loginForm.reset();
                loginMessage.textContent = '';
                
                // Renders the dashboard view dynamically onto the main screen
                renderDashboard(student);
            }, 800);
        } else {
            loginMessage.style.color = '#DC2626';
            loginMessage.textContent = 'Invalid Student ID or Password. Please try again.';
        }
    });
}

// --- Dynamic Dashboard Generator ---
function renderDashboard(student) {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.innerHTML = `
            <div class="hero-content" style="max-width: 700px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #E2E8F0; text-align: left; color: #1E293B;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #F1F5F9; padding-bottom: 15px; margin-bottom: 25px;">
                    <div>
                        <h2 style="color: #0F172A; font-size: 1.8rem; margin-bottom: 2px;">Student Dashboard</h2>
                        <p style="color: #64748B; font-size: 0.95rem;">Welcome back, <strong>${student.name}</strong>!</p>
                    </div>
                    <button onclick="location.reload()" style="background: #64748B; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">Logout</button>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; margin-bottom: 25px;">
                    <div style="background: #FEF2F2; padding: 18px; border-radius: 10px; border: 1px solid #FCA5A5;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #7F1D1D; display: block; margin-bottom: 4px;">STUDENT ID</span>
                        <p style="font-size: 1.2rem; font-weight: 700; color: #DC2626;">${student.id}</p>
                    </div>
                    <div style="background: #F0FDF4; padding: 18px; border-radius: 10px; border: 1px solid #86EFAC;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #166534; display: block; margin-bottom: 4px;">TUITION FEES</span>
                        <p style="font-size: 1.2rem; font-weight: 700; color: #16A34A;">₹${student.fees}</p>
                    </div>
                    <div style="background: #EFF6FF; padding: 18px; border-radius: 10px; border: 1px solid #BFDBFE;">
                        <span style="font-size: 0.75rem; font-weight: 700; color: #1E40AF; display: block; margin-bottom: 4px;">GRADE LEVEL</span>
                        <p style="font-size: 1.2rem; font-weight: 700; color: #2563EB;">${student.grade}</p>
                    </div>
                </div>

                <h3 style="font-size: 1.1rem; color: #0F172A; margin-bottom: 10px;">Portal Notice Board</h3>
                <p style="color: #64748B; font-size: 0.95rem; line-height: 1.6;">Your student portal is active. Check with your teachers for ongoing class schedules, chapter test papers, and study resources.</p>
            </div>
        `;
        homeSection.scrollIntoView({ behavior: 'smooth' });
    }
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
        msgDiv.style.background = '#DC2626';
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
