let currentEmployeeId = null;

async function editEmployee(id) {
  currentEmployeeId = id;

  // Hanapin yung row ng employee
  const { data, error } = await database
    .from('employee')
    .select('*')
    .eq('id', id)
    .single();

  // Ipopulate yung modal inputs
  document.getElementById('editFirstName').value = data.first_name;
  document.getElementById('editMiddleName').value = data.middle_name;
  document.getElementById('editLastName').value = data.last_name;
  document.getElementById('editEmail').value = data.email;

  // Show modal
  document.getElementById('editModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('editModal').style.display = 'none';
  currentEmployeeId = null;
}

async function updateEmployee() {
  const formData = {
    first_name: document.getElementById('editFirstName').value.trim(),
    middle_name: document.getElementById('editMiddleName').value.trim(),
    last_name: document.getElementById('editLastName').value.trim(),
    email: document.getElementById('editEmail').value.trim()
  };

  const { error } = await database
    .from('employee')
    .update(formData)
    .eq('id', currentEmployeeId);

  if (error) {
    alert('Error: ' + error.message);
  } else {
    alert('Employee updated!');
    closeModal();
    getEmployees(); // refresh yung table
  }
}