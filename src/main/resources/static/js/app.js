// $(document).ready(function() {
//     $('[id^=userEditDialog]').on('shown.bs.modal', function(event) {
//         let button = $(event.relatedTarget);
//         let userId = button.data('userid');
//
//         if (userId) {
//             $.get({
//                 url: '/api/v1/user/' + userId,
//                 success: (data) => {
//                     let modal = $('#' + button.data('bs-target').substring(1));
//                     modal.find('#id_edit').val(data.id);
//                     modal.find('#username_edit').val(data.username);
//                     modal.find('#password_edit').val(data.password);
//                     modal.find('#email_edit').val(data.email);
//                     modal.find('#age_edit').val(data.age);
//                     modal.find('#roles_edit').val(data.roles);
//                 },
//                 error: (err) => {
//                     alert(err);
//                 }
//             });
//         }
//     });
// });


// console.log(fetch('http://localhost:8080/users'));
//
// fetch('http://localhost:8080/users')
//     .then(res => res.json())
//     .then(data => document.getElementById('root').innerHTML = JSON.stringify(data))

// document.addEventListener('DOMContentLoaded', function() {
//     fetch('http://localhost:8080/api/users')
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then(data => {
//             const tableBody = document.querySelector('#userTable tbody');
//             tableBody.innerHTML = ''; // Очистить старые данные
//
//             data.forEach(user => {
//                 const row = document.createElement('tr');
//
//                 const editButton = `
//                     <button type="button" class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#userEditDialog${user.id}">
//                         Edit
//                     </button>
//                     <div class="modal fade" id="userEditDialog${user.id}" tabindex="-1" aria-labelledby="EditModalLabel" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="EditModalLabel">Edit user</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <form method="POST" action="/admin">
//                                     <div class="modal-body">
//                                         <input type="hidden" name="action" value="edit">
//                                         <input type="hidden" name="id" value="${user.id}">
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="username_edit${user.id}" class="form-label fw-bold">Username</label>
//                                             <input type="text" name="username" class="form-control" id="username_edit${user.id}" value="${user.username}" placeholder="Username">
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="password_edit${user.id}" class="form-label fw-bold">Password</label>
//                                             <input type="password" name="password" class="form-control" id="password_edit${user.id}" value="${user.password}" placeholder="Password">
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="email_edit${user.id}" class="form-label fw-bold">Email</label>
//                                             <input type="email" name="email" class="form-control" id="email_edit${user.id}" value="${user.email}" placeholder="Email">
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="age_edit${user.id}" class="form-label fw-bold">Age</label>
//                                             <input type="number" name="age" class="form-control" id="age_edit${user.id}" value="${user.age}" placeholder="Age">
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="roles_edit${user.id}" class="form-label fw-bold">Roles</label>
//                                             <select multiple id="roles_edit${user.id}" name="roles" class="form-control">
//                                                 ${user.roles.map(role => `
//                                                     <option value="${role.id}" ${role.selected ? 'selected' : ''}>${role.name.replace("ROLE_", "")}</option>
//                                                 `).join('')}
//                                             </select>
//                                         </div>
//                                     </div>
//
//                                     <div class="modal-footer">
//                                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                         <button type="submit" class="btn btn-primary">Edit</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//
//
//
//                 const deleteButton = `
//                     <button type="button" class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#userDeleteDialog${user.id}">
//                         Delete
//                     </button>
//                     <div class="modal fade" id="userDeleteDialog${user.id}" tabindex="-1" aria-labelledby="DeleteModalLabel${user.id}" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="DeleteModalLabel${user.id}">Delete user</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <form method="POST" action="/admin">
//                                     <div class="modal-body">
//                                         <input type="hidden" name="action" value="delete">
//                                         <input type="hidden" name="id" value="${user.id}">
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="username_delete${user.id}" class="form-label fw-bold">Username</label>
//                                             <input type="text" name="username" class="form-control" id="username_delete${user.id}" value="${user.username}" placeholder="Username" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="password_delete${user.id}" class="form-label fw-bold">Password</label>
//                                             <input type="password" name="password" class="form-control" id="password_delete${user.id}" value="${user.password}" placeholder="Password" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="email_delete${user.id}" class="form-label fw-bold">Email</label>
//                                             <input type="email" name="email" class="form-control" id="email_delete${user.id}" value="${user.email}" placeholder="Email" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="age_delete${user.id}" class="form-label fw-bold">Age</label>
//                                             <input type="number" name="age" class="form-control" id="age_delete${user.id}" value="${user.age}" placeholder="Age" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="roles_delete${user.id}" class="form-label fw-bold">Roles</label>
//                                             <select multiple id="roles_delete${user.id}" name="roles" class="form-control" disabled>
//                                                 ${user.roles.map(role => `
//                                                     <option value="${role.id}" ${role.selected ? 'selected' : ''}>${role.name.replace("ROLE_", "")}</option>
//                                                 `).join('')}
//                                             </select>
//                                         </div>
//                                     </div>
//
//                                     <div class="modal-footer">
//                                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                         <button type="submit" class="btn btn-danger">Delete</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//
//                 row.innerHTML = `
//                     <td>${user.id}</td>
//                     <td>${user.username}</td>
//                     <td>${user.password}</td>
//                     <td>${user.email}</td>
//                     <td>${user.age}</td>
//                     <td>
//                         ${user.roles.map(role => role.name.replace("ROLE_", "")).join(", ")}
//                     </td>
//                     <td>${editButton}</td>
//                     <td>${deleteButton}</td>`;
//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
// });

document.addEventListener('DOMContentLoaded', function() {
    // // показывает алерт с возвращенным значением
    // $.ajax("http://localhost:8080/api/users", {
    //     dataType: "text", //или, например, "text"
    //     success: function (msg) { //msg - то, что придет с сервера, респонз
    //         alert("Прибыли данные: " + msg);
    //     }
    // })

    // Функция для загрузки данных пользователей
    function fetchUsers() {
        fetch('http://localhost:8080/api/users')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(users => {
                updateTable(users);
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    // Функция для обновления таблицы
    function updateTable(users) {
        const roles = [
            {id: '1', name: 'ROLE_ADMIN'},
            {id: '2', name: 'ROLE_USER'}
        ];
        const tableBody = document.querySelector('#userTable tbody');
        tableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');

            // Создание кнопок редактирования и удаления
            const editButton = `
                <button type="button" class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#userEditDialog${user.id}">
                    Edit
                </button>
            `;

            const deleteButton = `
                <button type="button" class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#userDeleteDialog${user.id}">
                    Delete
                </button>
            `;

            // Создание модального окна редактирования
            const editModal = `
                <div class="modal fade" id="userEditDialog${user.id}" tabindex="-1" aria-labelledby="EditModalLabel${user.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="EditModalLabel${user.id}">Edit user</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form id="editForm${user.id}" method="POST">
                                <div class="modal-body">
                                    <input type="hidden" name="action" value="edit">
                                    <input type="hidden" name="id" value="${user.id}">
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="username_edit${user.id}" class="form-label fw-bold">Username</label>
                                        <input type="text" name="username" class="form-control" id="username_edit${user.id}" value="${user.username}" placeholder="Username">
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="password_edit${user.id}" class="form-label fw-bold">Password</label>
                                        <input type="password" name="password" class="form-control" id="password_edit${user.id}" value="${user.password}" placeholder="Password">
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="email_edit${user.id}" class="form-label fw-bold">Email</label>
                                        <input type="email" name="email" class="form-control" id="email_edit${user.id}" value="${user.email}" placeholder="Email">
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="age_edit${user.id}" class="form-label fw-bold">Age</label>
                                        <input type="number" name="age" class="form-control" id="age_edit${user.id}" value="${user.age}" placeholder="Age">
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="roles_edit${user.id}" class="form-label fw-bold">Roles</label>
                                        <select multiple id="roles_edit${user.id}" name="roles" class="form-control">
                                            ${roles.map(role => `
                                                <option value="${role.id}" ${user.roles.includes(role.id) ? 'selected' : ''}>
                                                    ${role.name.replace('ROLE_', '')}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            // Создание модального окна удаления
            const deleteModal = `
                <div class="modal fade" id="userDeleteDialog${user.id}" tabindex="-1" aria-labelledby="DeleteModalLabel${user.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="DeleteModalLabel${user.id}">Delete user</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form id="deleteForm${user.id}" method="POST">
                                <div class="modal-body">
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="id" value="${user.id}">
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="username_delete${user.id}" class="form-label fw-bold">Username</label>
                                        <input type="text" name="username" class="form-control" id="username_delete${user.id}" value="${user.username}" placeholder="Username" disabled>
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="password_delete${user.id}" class="form-label fw-bold">Password</label>
                                        <input type="password" name="password" class="form-control" id="password_delete${user.id}" value="${user.password}" placeholder="Password" disabled>
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="email_delete${user.id}" class="form-label fw-bold">Email</label>
                                        <input type="email" name="email" class="form-control" id="email_delete${user.id}" value="${user.email}" placeholder="Email" disabled>
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="age_delete${user.id}" class="form-label fw-bold">Age</label>
                                        <input type="number" name="age" class="form-control" id="age_delete${user.id}" value="${user.age}" placeholder="Age" disabled>
                                    </div>
                                    <div class="mb-3 d-flex flex-column align-items-center">
                                        <label for="roles_delete${user.id}" class="form-label fw-bold">Roles</label>
                                        <select multiple id="roles_delete${user.id}" name="roles" class="form-control" disabled>
                                            ${roles.map(role => `
                                                <option value="${role.id}" ${user.roles.includes(role.id) ? 'selected' : ''}>
                                                    ${role.name.replace('ROLE_', '')}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" id="delete${user.id}" class="btn btn-danger">Delete</button>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            // Добавление кнопок и модальных окон в таблицу
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.roles.map(role => role.name.replace("ROLE_", "")).join(", ")}</td>
                <td>${editButton}</td>
                <td>${deleteButton}</td>
            `;
            tableBody.appendChild(row);

            // Добавление модальных окон в тело документа
            document.body.insertAdjacentHTML('beforeend', editModal);
            document.body.insertAdjacentHTML('beforeend', deleteModal);

            // Добавляем обработчики событий
            document.getElementById(`editForm${user.id}`).addEventListener('submit', handleEditSubmit);
            document.getElementById(`delete${user.id}`).addEventListener('click', handleDeleteClick);
        });
    }

    // Обработчик отправки формы редактирования
    function handleEditSubmit(event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        const form = event.target;
        const formData = new FormData(form);

        fetch('http://localhost:8080/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                id: formData.get('id'),
                username: formData.get('username'),
                password: formData.get('password'),
                email: formData.get('email'),
                age: formData.get('age'),
                roles: formData.getAll('roles')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                fetchUsers(); // Обновляем таблицу после успешного редактирования
                bootstrap.Modal.getInstance(document.querySelector('.modal.show')).hide(); // Закрываем модальное окно
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    function handleDeleteClick(event) {
        event.preventDefault();
        fetch(`http://localhost:8080/api/users`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // Ожидаем текстовый ответ
            })
            .then(data => {
                console.log('User deleted:', data);
                fetchUsers(); // Обновите таблицу пользователей
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }



    // Инициализируем загрузку данных пользователей
    fetchUsers();
})
//
//     fetch('http://localhost:8080/api/users')
//         .then(res => {
//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }
//             return res.json();
//         })
//         .then(users => {
//             const roles = [
//                 { id: '1', name: 'ROLE_ADMIN' },
//                 { id: '2', name: 'ROLE_USER' }
//             ];
//             const tableBody = document.querySelector('#userTable tbody');
//             tableBody.innerHTML = ''; // Очистить старые данные
//
//             users.forEach(user => {
//                 const row = document.createElement('tr');
//
//                 // Создание кнопок редактирования и удаления
//                 const editButton = `
//                     <button type="button" class="btn btn-info text-light" data-bs-toggle="modal" data-bs-target="#userEditDialog${user.id}">
//                         Edit
//                     </button>
//                 `;
//
//                 const deleteButton = `
//                     <button type="button" class="btn btn-danger text-light" data-bs-toggle="modal" data-bs-target="#userDeleteDialog${user.id}">
//                         Delete
//                     </button>
//                 `;
//
//                 // Создание модального окна редактирования
//                 const editModal = `
//                     <div class="modal fade" id="userEditDialog${user.id}" tabindex="-1" aria-labelledby="EditModalLabel${user.id}" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="EditModalLabel${user.id}">Edit user</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <form method="POST" action="/admin">
//                                     <div class="modal-body">
//                                         <input type="hidden" name="action" value="edit">
//                                         <input type="hidden" name="id" value="${user.id}">
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="username_edit${user.id}" class="form-label fw-bold">Username</label>
//                                             <input type="text" name="username" class="form-control" id="username_edit${user.id}" value="${user.username}" placeholder="Username">
//                                         </div>
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="password_edit${user.id}" class="form-label fw-bold">Password</label>
//                                             <input type="password" name="password" class="form-control" id="password_edit${user.id}" value="${user.password}" placeholder="Password">
//                                         </div>
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="email_edit${user.id}" class="form-label fw-bold">Email</label>
//                                             <input type="email" name="email" class="form-control" id="email_edit${user.id}" value="${user.email}" placeholder="Email">
//                                         </div>
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="age_edit${user.id}" class="form-label fw-bold">Age</label>
//                                             <input type="number" name="age" class="form-control" id="age_edit${user.id}" value="${user.age}" placeholder="Age">
//                                         </div>
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="roles_edit${user.id}" class="form-label fw-bold">Roles</label>
//                                             <select multiple id="roles_edit${user.id}" name="roles" class="form-control">
//                                                 ${roles.map(role => `
//                                                     <option value="${role.id}" ${user.roles.includes(role.id) ? 'selected' : ''}>
//                                                         ${role.name.replace('ROLE_', '')}
//                                                     </option>
//                                                 `).join('')}
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div class="modal-footer">
//                                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                         <button type="submit" class="btn btn-primary">Edit</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//
//                 // Создание модального окна удаления
//                 const deleteModal = `
//                     <div class="modal fade" id="userDeleteDialog${user.id}" tabindex="-1" aria-labelledby="DeleteModalLabel${user.id}" aria-hidden="true">
//                         <div class="modal-dialog">
//                             <div class="modal-content">
//                                 <div class="modal-header">
//                                     <h5 class="modal-title" id="DeleteModalLabel${user.id}">Delete user</h5>
//                                     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                 </div>
//                                 <form method="POST" action="/admin">
//                                     <div class="modal-body">
//                                         <input type="hidden" name="action" value="delete">
//                                         <input type="hidden" name="id" value="${user.id}">
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="username_delete${user.id}" class="form-label fw-bold">Username</label>
//                                             <input type="text" name="username" class="form-control" id="username_delete${user.id}" value="${user.username}" placeholder="Username" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="password_delete${user.id}" class="form-label fw-bold">Password</label>
//                                             <input type="password" name="password" class="form-control" id="password_delete${user.id}" value="${user.password}" placeholder="Password" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="email_delete${user.id}" class="form-label fw-bold">Email</label>
//                                             <input type="email" name="email" class="form-control" id="email_delete${user.id}" value="${user.email}" placeholder="Email" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="age_delete${user.id}" class="form-label fw-bold">Age</label>
//                                             <input type="number" name="age" class="form-control" id="age_delete${user.id}" value="${user.age}" placeholder="Age" disabled>
//                                         </div>
//
//                                         <div class="mb-3 d-flex flex-column align-items-center">
//                                             <label for="roles_delete${user.id}" class="form-label fw-bold">Roles</label>
//                                             <select multiple id="roles_delete${user.id}" name="roles" class="form-control" disabled>
//                                                 ${roles.map(role => `
//                                                     <option value="${role.id}" ${user.roles.includes(role.id) ? 'selected' : ''}>
//                                                         ${role.name.replace('ROLE_', '')}
//                                                     </option>
//                                                 `).join('')}
//                                             </select>
//                                         </div>
//                                     </div>
//                                     <div class="modal-footer">
//                                         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
// <!--                                        <button type="submit" class="btn btn-danger">Delete</button>-->
//                                         <button type="submit" id="delete${user.id}" name="id" value="${user.id}" class="btn btn-danger">Delete</button>
//
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//
//
//                 // Добавление кнопок и модальных окон в таблицу
//                 row.innerHTML = `
//                     <td>${user.id}</td>
//                     <td>${user.username}</td>
//                     <td>${user.password}</td>
//                     <td>${user.email}</td>
//                     <td>${user.age}</td>
//                     <td>
//                         ${user.roles.map(role => role.name.replace("ROLE_", "")).join(", ")}
//                     </td>
//                     <td>${editButton}</td>
//                     <td>${deleteButton}</td>
//                 `;
//                 tableBody.appendChild(row);
//
//                 // Добавление модальных окон в тело документа
//                 document.body.insertAdjacentHTML('beforeend', editModal);
//                 document.body.insertAdjacentHTML('beforeend', deleteModal);
//             });
//
//             // Инициализация всех модальных окон, если Bootstrap подключен
//             if (typeof bootstrap !== 'undefined') {
//                 document.querySelectorAll('.modal').forEach(modal => {
//                     new bootstrap.Modal(modal);
//                 });
//             } else {
//                 console.error('Bootstrap is not loaded.');
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка:', error);
//         });
//
//     const buttonDelete = $("#delete");
//     buttonDelete.click(
//         function () {
//             $.ajax("http://localhost:8080/api/users", {
//                 method: "DELETE",
//                 data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
//                 dataType: "html",
//                 success: function (msg) {
//                     $("#users")
//                         .find("#" + msg) //ищем div с id=1
//                         .remove();
//
//                 }
//             })
//         }
//     )
// });



// // в html-странице должен быть создан <button type="button" id="delete" name="id" value="1">delete</button>
// $(document).ready(function () {
//
//     const buttonDelete = $("#delete");
//     buttonDelete.click(
//         function () {
//             $.ajax("http://localhost:8080/api/users", {
//                 method: "DELETE",
//                 data: {id: $(this).attr("value")}, //в rest-контроллер будет передан id=1 (см. value из тэга button выше)
//                 dataType: "text",
//                 success: function (msg) {
//                     $("#users")
//                         .find("#" + msg) //ищем div с id=1
//                         .remove();
//
//                 }
//             })
//         }
//     )
// })

