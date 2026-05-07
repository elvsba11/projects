async function getEmployees() {
  const { data, error } = await database
    .from('employee')
    .select('*');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  const tbody = document.getElementById('employeeList');
  tbody.innerHTML = '';

  data.forEach(employee => {
    const row = `
      <tr>
        <td>${employee.first_name} ${employee.middle_name} ${employee.last_name}</td>
        <td>${employee.email}</td>
        <td>
          <button onclick="editEmployee('${employee.id}')">Edit</button>
          <button onclick="deleteEmployee('${employee.id}')">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

getEmployees();