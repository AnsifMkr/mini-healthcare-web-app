import './style.css'
import { setupChatbot } from './chatbot.js'

document.querySelector('#app').innerHTML = `
  <header>
    <a href="#" class="logo">CareConnect</a>
    <nav>
      <!-- Simple fake nav -->
    </nav>
  </header>

  <main>
    <section class="hero">
      <h1>Compassionate Care,<br>Connected Community</h1>
      <p>Whether you need support or want to offer a helping hand, we bridge the gap. Join our network of care today.</p>
    </section>

    <section class="support-section">
      <h2>Get Started</h2>
      
      <div class="form-group">
        <label for="form-type-selector">I want to...</label>
        <select id="form-type-selector" class="form-select">
          <option value="patient">Register as a Patient</option>
          <option value="volunteer">Register as a Volunteer</option>
          <option value="general">Contact Support</option>
        </select>
      </div>

      <form id="care-form">
        <!-- Common Fields -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" class="form-input" required placeholder="Jane Doe">
        </div>
        
        <div class="form-group">
          <label for="contact">Contact Number / Email</label>
          <input type="text" id="contact" class="form-input" required placeholder="+1 234 567 8900 or jane@example.com">
        </div>

        <!-- Dynamic Fields Container -->
        <div id="dynamic-fields"></div>

        <button type="submit" class="btn-primary">Submit Registration</button>
      </form>
    </section>
  </main>
`

setupChatbot(document.querySelector('#app'))

// Dynamic Form Logic
const formTypeSelector = document.getElementById('form-type-selector');
const dynamicFieldsContainer = document.getElementById('dynamic-fields');
const formHeading = document.querySelector('.support-section h2');

const getPatientFields = () => `
  <div class="form-group">
    <label for="age">Age</label>
    <input type="number" id="age" class="form-input" required placeholder="30">
  </div>
  <div class="form-group">
    <label for="health-issue">Health Issue</label>
    <select id="health-issue" class="form-select">
      <option value="general">General Checkup</option>
      <option value="chronic">Chronic Condition</option>
      <option value="emergency">Emergency / Urgent</option>
      <option value="mental">Mental Health</option>
    </select>
  </div>
  <div class="form-group">
    <label for="description">Description of Issue</label>
    <textarea id="description" class="form-textarea" rows="4" placeholder="Briefly describe your symptoms..."></textarea>
  </div>
`;

const getVolunteerFields = () => `
  <div class="form-group">
    <label for="skill">Skill / Role</label>
    <select id="skill" class="form-select">
      <option value="doctor">Doctor</option>
      <option value="nurse">Nurse</option>
      <option value="student">Medical Student</option>
      <option value="general">General Volunteer</option>
    </select>
  </div>
  <div class="form-group">
    <label for="availability">Availability</label>
    <select id="availability" class="form-select">
      <option value="morning">Morning</option>
      <option value="evening">Evening</option>
      <option value="anytime">Anytime</option>
    </select>
  </div>
`;

const getGeneralFields = () => `
  <div class="form-group">
    <label for="message">Message / Query</label>
    <textarea id="message" class="form-textarea" rows="4" placeholder="How can we help you?"></textarea>
  </div>
`;

const updateFormFields = () => {
  const type = formTypeSelector.value;

  if (type === 'patient') {
    dynamicFieldsContainer.innerHTML = getPatientFields();
    formHeading.textContent = 'Patient Registration';
  } else if (type === 'volunteer') {
    dynamicFieldsContainer.innerHTML = getVolunteerFields();
    formHeading.textContent = 'Volunteer Registration';
  } else {
    dynamicFieldsContainer.innerHTML = getGeneralFields();
    formHeading.textContent = 'Contact Support';
  }
};

// Initialize form
updateFormFields();
formTypeSelector.addEventListener('change', updateFormFields);

// Form Submission Logic
const form = document.querySelector('#care-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.querySelector('#name').value;
  const type = formTypeSelector.value;
  const btn = form.querySelector('button');

  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // API Call to Backend
  const formData = {
    name,
    contact: document.querySelector('#contact').value,
    type,
    details: {}
  };

  // Collect dynamic fields
  if (type === 'patient') {
    formData.details.age = document.querySelector('#age').value;
    formData.details.healthIssue = document.querySelector('#health-issue').value;
    formData.details.description = document.querySelector('#description').value;
  } else if (type === 'volunteer') {
    formData.details.skill = document.querySelector('#skill').value;
    formData.details.availability = document.querySelector('#availability').value;
  } else {
    formData.details.message = document.querySelector('#message').value;
  }

  fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        let message = '';
        if (type === 'patient') {
          message = `Thank you, ${name}. Your patient registration has been received.`;
        } else if (type === 'volunteer') {
          message = `Thank you, ${name}! We appreciate your willingness to volunteer.`;
        } else {
          message = `Thank you, ${name}. Your message has been sent.`;
        }
        alert(message);
        form.reset();
        updateFormFields();
      } else {
        alert(`Error: ${data.message}\nDetails: ${data.error || ''}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to connect to the server. Is the backend running?');
    })
    .finally(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    });
});
