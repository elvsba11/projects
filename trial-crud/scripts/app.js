const SUPABASE_URL_KEY = 'https://tyejnkixmzcdiefqiqxe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5ZWpua2l4bXpjZGllZnFpcXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjk5MTMsImV4cCI6MjA4ODg0NTkxM30.ZlS6FudCqPbBjnA4xBk83IRBh8XwjY18r8eIX9mj1eU';
const database = window.supabase.createClient(SUPABASE_URL_KEY, SUPABASE_ANON_KEY);

// Helper function
function normalizeString(str) {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function collectFormData() {
  return {
    first_name: document.querySelector('#firstName').value.trim(),
    middle_name: document.querySelector('#middleName').value.trim(),
    last_name: document.querySelector('#lastName').value.trim(),
    email: document.querySelector('#email').value.trim()
  };
}