// ═══════════════════════════════════════════
//  ⚙️  SUPABASE CONFIG — palitan mo ito!
// ═══════════════════════════════════════════
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

// ═══════════════════════════════════════════
//  SUPABASE HELPER (no library needed)
// ═══════════════════════════════════════════
const sb = {
  headers: {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Prefer': 'return=representation'
  },
  url(path) {
    return `${SUPABASE_URL}/rest/v1/${path}`;
  },
  async get(table, query = '') {
    const res = await fetch(this.url(`${table}?${query}`), {
      headers: this.headers
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  async post(table, data) {
    const res = await fetch(this.url(table), {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  async patch(table, id, data) {
    const res = await fetch(this.url(`${table}?id=eq.${id}`), {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  async delete(table, id) {
    const res = await fetch(this.url(`${table}?id=eq.${id}`), {
      method: 'DELETE',
      headers: this.headers
    });
    if (!res.ok) throw await res.json();
    return true;
  }
};

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════
let todos = [];
let currentFilter = 'all';
let editingId = null;

// ═══════════════════════════════════════════
//  DOM REFS
// ═══════════════════════════════════════════
const taskInput     = document.getElementById('task-input');
const dueInput      = document.getElementById('due-input');
const addBtn        = document.getElementById('add-btn');
const taskList      = document.getElementById('task-list');
const emptyState    = document.getElementById('empty-state');
const statsText     = document.getElementById('stats-text');
const clearDoneBtn  = document.getElementById('clear-done-btn');
const filterBtns    = document.querySelectorAll('.filter-btn');
const modalOverlay  = document.getElementById('modal-overlay');
const editTaskInput = document.getElementById('edit-task-input');
const editDueInput  = document.getElementById('edit-due-input');
const modalSaveBtn  = document.getElementById('modal-save-btn');
const modalCancelBtn= document.getElementById('modal-cancel-btn');

// ═══════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════
async function init() {
  try {
    todos = await sb.get('todos', 'order=created_at.asc');
    render();
  } catch (err) {
    console.error('Failed to load todos:', err);
    showToast('❌ Could not connect to Supabase. Check your config!', true);
  }
}

// ═══════════════════════════════════════════
//  CREATE
// ═══════════════════════════════════════════
async function addTodo() {
  const task = taskInput.value.trim();
  if (!task) { taskInput.focus(); return; }

  const due_date = dueInput.value || null;

  addBtn.textContent = '...';
  addBtn.disabled = true;

  try {
    const [newTodo] = await sb.post('todos', { task, due_date });
    todos.push(newTodo);
    taskInput.value = '';
    dueInput.value  = '';
    render();
    showToast('✦ Task added!');
  } catch (err) {
    console.error('Add failed:', err);
    showToast('❌ Failed to add task.', true);
  } finally {
    addBtn.textContent = 'Add';
    addBtn.disabled = false;
  }
}

// ═══════════════════════════════════════════
//  TOGGLE DONE
// ═══════════════════════════════════════════
async function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;

  const newVal = !todo.is_done;
  todo.is_done = newVal; // optimistic
  render();

  try {
    await sb.patch('todos', id, { is_done: newVal });
  } catch (err) {
    todo.is_done = !newVal; // revert
    render();
    showToast('❌ Failed to update task.', true);
  }
}

// ═══════════════════════════════════════════
//  OPEN EDIT MODAL
// ═══════════════════════════════════════════
function openEdit(id) {
  const todo = todos.find(t => t.id === id);
  if (!todo) return;
  editingId = id;
  editTaskInput.value = todo.task;
  editDueInput.value  = todo.due_date || '';
  modalOverlay.classList.add('open');
  editTaskInput.focus();
}

function closeModal() {
  modalOverlay.classList.remove('open');
  editingId = null;
}

// ═══════════════════════════════════════════
//  SAVE EDIT
// ═══════════════════════════════════════════
async function saveEdit() {
  if (!editingId) return;
  const task = editTaskInput.value.trim();
  if (!task) { editTaskInput.focus(); return; }

  const due_date = editDueInput.value || null;
  const todo = todos.find(t => t.id === editingId);

  const prev = { task: todo.task, due_date: todo.due_date };
  todo.task = task;
  todo.due_date = due_date;
  closeModal();
  render();

  try {
    await sb.patch('todos', editingId, { task, due_date });
    showToast('✦ Task updated!');
  } catch (err) {
    todo.task = prev.task;
    todo.due_date = prev.due_date;
    render();
    showToast('❌ Failed to update task.', true);
  }
}

// ═══════════════════════════════════════════
//  DELETE
// ═══════════════════════════════════════════
async function deleteTodo(id) {
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return;

  const [removed] = todos.splice(idx, 1); // optimistic
  render();

  try {
    await sb.delete('todos', id);
    showToast('🗑 Task deleted.');
  } catch (err) {
    todos.splice(idx, 0, removed); // revert
    render();
    showToast('❌ Failed to delete task.', true);
  }
}

// ═══════════════════════════════════════════
//  CLEAR DONE
// ═══════════════════════════════════════════
async function clearDone() {
  const done = todos.filter(t => t.is_done);
  if (!done.length) return;

  todos = todos.filter(t => !t.is_done); // optimistic
  render();

  try {
    await Promise.all(done.map(t => sb.delete('todos', t.id)));
    showToast(`🗑 Cleared ${done.length} done task(s).`);
  } catch (err) {
    todos = [...todos, ...done];
    render();
    showToast('❌ Failed to clear done tasks.', true);
  }
}

// ═══════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════
function render() {
  const filtered = todos.filter(t => {
    if (currentFilter === 'pending') return !t.is_done;
    if (currentFilter === 'done')    return t.is_done;
    return true;
  });

  taskList.innerHTML = '';

  if (!filtered.length) {
    taskList.appendChild(emptyState);
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
    filtered.forEach(t => taskList.appendChild(createTaskEl(t)));
  }

  // stats
  const total = todos.length;
  const done  = todos.filter(t => t.is_done).length;
  statsText.textContent = `${done}/${total} done`;
}

function createTaskEl(todo) {
  const item = document.createElement('div');
  item.className = `task-item${todo.is_done ? ' is-done' : ''}`;
  item.dataset.id = todo.id;

  // checkbox
  const check = document.createElement('div');
  check.className = `task-check${todo.is_done ? ' checked' : ''}`;
  check.addEventListener('click', () => toggleTodo(todo.id));

  // body
  const body = document.createElement('div');
  body.className = 'task-body';

  const name = document.createElement('span');
  name.className = 'task-name';
  name.textContent = todo.task;

  body.appendChild(name);

  if (todo.due_date) {
    const due = document.createElement('span');
    due.className = 'task-due';
    due.textContent = formatDue(todo.due_date, due);
    body.appendChild(due);
  }

  // actions
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'task-btn edit';
  editBtn.innerHTML = '✎';
  editBtn.title = 'Edit';
  editBtn.addEventListener('click', () => openEdit(todo.id));

  const delBtn = document.createElement('button');
  delBtn.className = 'task-btn delete';
  delBtn.innerHTML = '✕';
  delBtn.title = 'Delete';
  delBtn.addEventListener('click', () => deleteTodo(todo.id));

  actions.append(editBtn, delBtn);
  item.append(check, body, actions);
  return item;
}

// ═══════════════════════════════════════════
//  DATE HELPERS
// ═══════════════════════════════════════════
function formatDue(dateStr, el) {
  // dateStr is 'YYYY-MM-DD'
  const [y, m, d] = dateStr.split('-').map(Number);
  const due = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diff = Math.round((due - today) / 86400000);

  let cls = '';
  let label = '';

  if (diff < 0) {
    cls = 'overdue';
    label = `Overdue by ${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''}`;
  } else if (diff === 0) {
    cls = 'today';
    label = 'Due today';
  } else if (diff === 1) {
    label = 'Due tomorrow';
  } else {
    label = `Due ${due.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }

  if (el) el.className = `task-due ${cls}`;
  return label;
}

// ═══════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════
function showToast(msg, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: ${isError ? '#ff5c5c22' : '#c8f06022'};
    border: 1px solid ${isError ? '#ff5c5c55' : '#c8f06055'};
    color: ${isError ? '#ff5c5c' : '#c8f060'};
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 10px 20px;
    border-radius: 10px;
    backdrop-filter: blur(8px);
    z-index: 200;
    opacity: 0;
    transition: all .25s;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ═══════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════
addBtn.addEventListener('click', addTodo);

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTodo();
});

clearDoneBtn.addEventListener('click', clearDone);

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

modalSaveBtn.addEventListener('click', saveEdit);
modalCancelBtn.addEventListener('click', closeModal);

editTaskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') saveEdit();
  if (e.key === 'Escape') closeModal();
});

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// ═══════════════════════════════════════════
//  START
// ═══════════════════════════════════════════
init();
