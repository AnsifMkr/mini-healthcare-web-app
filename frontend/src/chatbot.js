
export function setupChatbot(element) {
  const chatWidget = document.createElement('div');
  chatWidget.className = 'chatbot-widget';

  chatWidget.innerHTML = `
    <div class="chatbot-content" id="chatbot-content">
      <div class="chatbot-header">
        <h3>CareAssistant AI</h3>
        <button id="close-chat" style="background:none;border:none;color:white;cursor:pointer;">✕</button>
      </div>
      <div class="chatbot-body" id="chatbot-messages">
        <div class="chatbot-message bot">
          Hello! I'm CareAssistant. How can I help you today?
        </div>
      </div>
      <div class="chatbot-footer">
        <input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your message...">
        <button id="chatbot-send" class="chatbot-send-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
          </svg>
        </button>
      </div>
    </div>
    <button class="chatbot-toggle" id="chatbot-toggle">
      💬
    </button>
  `;

  element.appendChild(chatWidget);

  const toggleBtn = chatWidget.querySelector('#chatbot-toggle');
  const chatContent = chatWidget.querySelector('#chatbot-content');
  const closeBtn = chatWidget.querySelector('#close-chat');
  const input = chatWidget.querySelector('#chatbot-input');
  const sendBtn = chatWidget.querySelector('#chatbot-send');
  const messagesContainer = chatWidget.querySelector('#chatbot-messages');

  // Toggle Chat
  toggleBtn.addEventListener('click', () => {
    chatContent.classList.add('open');
    toggleBtn.style.display = 'none';
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    chatContent.classList.remove('open');
    toggleBtn.style.display = 'flex';
  });

  // Mock Responses
  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();

    // Greeting
    if (lowerText.match(/(hello|hi|hey|greetings)/)) {
      return "Hi there! I'm your virtual health assistant. Ask me about clinic hours, appointments, or basic health advice.";
    }

    // New specific FAQs
    if (lowerText.match(/(hours|time|open|close)/)) {
      return "🕒 **Clinic Hours:** \nMon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM\nSun: Closed";
    }

    if (lowerText.match(/(appointment|book|schedule)/)) {
      return "📅 **Appointments:** \nYou can book an appointment by calling 1-800-CARE-NOW or by visiting our 'Appointments' page (coming soon).";
    }

    if (lowerText.match(/(fever|temperature|flu)/)) {
      return "🤒 **Fever Advice:** \n1. Stay hydrated.\n2. Rest.\n3. Take paracetamol if needed.\n⚠️ *If fever exceeds 103°F (39.4°C) or lasts >3 days, seek medical attention immediately.*";
    }

    if (lowerText.match(/(emergency|urgent|ambulance|911)/)) {
      return "🚨 **EMERGENCY:** \nIf you have a life-threatening emergency, please call **911** or visit the nearest hospital emergency room immediately. We cannot handle emergencies here.";
    }

    // Legacy/Fallback
    if (lowerText.includes('volunteer')) {
      return "That's great! You can sign up using the form on this page. Just select 'Register as a Volunteer'.";
    }

    return "I'm still learning! You can ask me about:\n- Clinic Hours\n- Booking Appointments\n- Fever advice\n- Emergency info";
  };

  // Send Message Logic
  const sendMessage = () => {
    const text = input.value.trim();
    if (!text) return;

    // User Message
    addMessage(text, 'user');
    input.value = '';

    // Simulate thinking delay
    setTimeout(() => {
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 600);
  };

  const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-message ${sender}`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}
