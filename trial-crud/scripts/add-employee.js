async function addEmployee() {
  const formData = collectFormData();

  // Check both at the same time
  const [{ data: nameExists }, { data: emailExists }] = await Promise.all([
    database
      .from('employee')
      .select('id')
      .ilike('first_name', normalizeString(formData.first_name))
      .ilike('middle_name', normalizeString(formData.middle_name))
      .ilike('last_name', normalizeString(formData.last_name))
      .single(),
    database
      .from('employee')
      .select('id')
      .ilike('email', normalizeString(formData.email))
      .single()
  ]);

  // Show all errors at once
  if (nameExists && emailExists) {
    document.getElementById('message').textContent = 'Name and Email already exists!';
    return;
  }
  if (nameExists) {
    document.getElementById('message').textContent = 'Employee name already exists!';
    return;
  }
  if (emailExists) {
    document.getElementById('message').textContent = 'Email already exists!';
    return;
  }

  // Proceed with insert
  const { error } = await database.from('employee').insert([formData]);

  if (error) {
    document.getElementById('message').textContent = 'Error: ' + error.message;
  } else {
    document.getElementById('message').textContent = 'Employee added!';
    document.getElementById('firstName').value = '';
    document.getElementById('middleName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
  }
}