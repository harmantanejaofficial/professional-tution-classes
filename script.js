// --- Mobile Navigation Toggle ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
// --- Display Students Above 75% ---
document.addEventListener('DOMContentLoaded', () => {
    // Mirror of your student database from the login portal
    const studentsDatabase = {
        "01": { name: "TIYA RAHEJA", class: "6th Grade", percentage: "73.84%" },
        "02": { name: "RUDRA", class: "6th Grade", percentage: "90%" },
        "03": { name: "SAKSHAM", class: "6th Grade", percentage: "70.76%" },
        "04": { name: "TANMAY", class: "7th Grade", percentage: "85%" },
        "05": { name: "AADHARSH", class: "7th Grade", percentage: "78%" },
        "07": { name: "PULKIT", class: "4th Grade", percentage: "82%" },
        "08": { name: "VANSH", class: "4th Grade", percentage: "71%" },
        "09": { name: "ANSH", class: "3rd Grade", percentage: "92%" }
    };

    const achieversGrid = document.getElementById('achieversGrid');

    if (achieversGrid) {
        achieversGrid.innerHTML = '';
        let count = 0;

        Object.values(studentsDatabase).forEach(student => {
            // Convert percentage string like "90%" to a number 90
            const numericPercentage = parseFloat(student.percentage);

            // Filter condition: strictly greater than 75
            if (numericPercentage > 75) {
                count++;
                const card = document.createElement('div');
                card.className = 'course-card';
                card.innerHTML = `
                    <h3>${student.name}</h3>
                    <p><strong>Standard:</strong> ${student.class}</p>
                    <p><strong>Percentage:</strong> <span style="color: var(--accent-color); font-weight: bold;">${student.percentage}</span></p>
                `;
                achieversGrid.appendChild(card);
            }
        });

        if (count === 0) {
            achieversGrid.innerHTML = '<p>No star achievers to display at the moment.</p>';
        }
    }
});

// --- Chatbot UI Logic ---
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
            appendMessage('bot', 'Our Offline Center is located at Nakshatra Greens, Naigaon (East). Feel free to drop by or contact us via WhatsApp!');
        } else if (text.includes('fees') || text.includes('price') || text.includes('discount')) {
            appendMessage('bot', 'We currently offer a flat 10% off on your first month’s tuition fees! Connect with us on WhatsApp at +91 9987566019.');
        } else if (text.includes('5th') || text.includes('6th') || text.includes('7th') || text.includes('8th') || text.includes('9th') || text.includes('10th')) {
            appendMessage('bot', 'We provide specialized foundation courses and board exam training for grades 5th through 10th in both Online & Offline modes.');
        } else {
            appendMessage('bot', 'Thanks for your message! You can log into your student portal above or message us on WhatsApp (+91 9987566019) for immediate assistance.');
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
