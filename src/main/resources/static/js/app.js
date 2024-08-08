$(async function () {
    await getTableWithUsers();
    await getDefaultModal();
})

const userFetchService = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/users'),
    findOneUser: async (id) => await fetch(`api/users/${id}`),
    addNewUser: async (user) => await fetch('api/users', {method: 'POST', headers: userFetchService.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/users/${id}`, {method: 'PUT', headers: userFetchService.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/users/${id}`, {method: 'DELETE', headers: userFetchService.head})
}

async function getTableWithUsers() {
    let table = $('#userTable tbody');
    table.empty();

    await userFetchService.findAllUsers()
        .then(res => res.json())
        .then(users => {
            users.forEach(user => {
                let roleNames = user.roles.map(role => role.roleName).join(", ");

                let tableFilling = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>${user.email}</td>
                        <td>${user.age}</td>     
                        <td>${roleNames}</td>
                        <td>
                            <button type="button" data-userid="${user.id}" class="btn btn-info text-light" data-action="edit" data-bs-toggle="modal" data-bs-target="#someDefaultModalEdit">
                                Edit
                            </button>
                        </td>
                        <td>
                            <button type="button" data-userid="${user.id}" class="btn btn-danger text-light" data-action="delete" data-bs-toggle="modal" data-bs-target="#someDefaultModalDelete">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
                table.append(tableFilling);
            });
        });

    $("#userTable").find('button').on('click', (event) => {
        let defaultModalEdit = $('#someDefaultModalEdit');

        let targetButtonEdit = $(event.target);
        let buttonUserIdEdit = targetButtonEdit.attr('data-userid');
        let buttonActionEdit = targetButtonEdit.attr('data-action');

        defaultModalEdit.attr('data-userid', buttonUserIdEdit);
        defaultModalEdit.attr('data-action', buttonActionEdit);
        defaultModalEdit.modal('show');

        let defaultModalDelete = $('#someDefaultModal');

        let targetButtonDelete = $(event.target);
        let buttonUserIdDelete = targetButtonDelete.attr('data-userid');
        let buttonActionDelete = targetButtonDelete.attr('data-action');

        defaultModalDelete.attr('data-userid', buttonUserIdDelete);
        defaultModalDelete.attr('data-action', buttonActionDelete);
        defaultModalDelete.modal('show');
    });
}

// Функция для открытия и заполнения модального окна
async function getDefaultModal() {
    $('#someDefaultModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false
    }).on("show.bs.modal", async (event) => {
        let thisModal = $(event.target);
        let userid = thisModal.attr('data-userid');
        let action = thisModal.attr('data-action');

        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');

        switch (action) {
            case 'edit':
                await editUser(thisModal, userid);
                break;
            case 'delete':
                deleteUser(thisModal, userid);
                break;
        }
    }).on("hidden.bs.modal", (e) => {
        let thisModal = $(e.target);
        thisModal.find('.modal-title').html('');
        thisModal.find('.modal-body').html('');
        thisModal.find('.modal-footer').html('');
    });

    $(document).on('click', '.edit-btn, .delete-btn', function () {
        let userid = $(this).data('userid');
        let action = $(this).data('action');

        $('#someDefaultModal').attr('data-userid', userid);
        $('#someDefaultModal').attr('data-action', action);

        $('#someDefaultModal').modal('show');
    });
}


async function editUser(modal, id) {

    let preuser = await userFetchService.findOneUser(id);
    let user = await preuser.json();
    let roles = await fetch('api/roles').then(res => res.json());

    modal.find('.modal-title').html('Edit user');

    let editButton = `<button class="btn btn btn-primary" id="editButton">Edit</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
    modal.find('.modal-footer').html('').append(closeButton).append(editButton);

    modal.find('.modal-body').html(`
        <form id="editUser">
            <input type="hidden" name="action" value="edit">
            <input type="hidden" name="id" value="${user.id}" id="id_edit">
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="username_edit" class="form-label fw-bold">Username</label>
                <input type="text" name="username" class="form-control" id="username_edit" value="${user.username}" placeholder="Username">
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="password_edit" class="form-label fw-bold">Password</label>
                <input type="password" name="password" class="form-control" id="password_edit" value="${user.password}" placeholder="Password">
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="email_edit" class="form-label fw-bold">Email</label>
                <input type="email" name="email" class="form-control" id="email_edit" value="${user.email}" placeholder="Email">
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="age_edit" class="form-label fw-bold">Age</label>
                <input type="number" name="age" class="form-control" id="age_edit" value="${user.age}" placeholder="Age">
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="roles_edit" class="form-label fw-bold">Roles</label>
                <select multiple id="roles_edit" name="roles" class="form-control">
                    ${roles.map(role => `
                        <option value="${role.id}" ${user.roles.map(r => r.id).includes(role.id) ? 'selected' : ''}>
                            ${role.name.replace('ROLE_', '')}
                        </option>
                    `).join('')}
                </select>
            </div>
        </form>
    `);

    $("#editButton").on('click', async () => {
        let id = modal.find("#id_edit").val().trim();
        let username = modal.find('#username_edit').val().trim();
        let password = modal.find("#password_edit").val().trim();
        let email = modal.find("#email_edit").val().trim();
        let age = modal.find("#age_edit").val().trim();
        let selectedRoleIds = modal.find("#roles_edit").val();

        let selectedRoles = roles.filter(role => selectedRoleIds.includes(role.id.toString()));

        let data = {
            id: id,
            username: username,
            password: password,
            email: email,
            age: age,
            roles: selectedRoles
        };

        try {
            const response = await userFetchService.updateUser(data, id);
            getTableWithUsers();
            modal.modal('hide');
        } catch (error) {
            console.error("Error updating user:", error);
        }
    });
}

async function deleteUser(modal, id) {
    let preuser = await userFetchService.findOneUser(id);
    let user = await preuser.json();
    let roles = await fetch('api/roles').then(res => res.json());

    modal.find('.modal-title').html('Delete user');
    let deleteButton = `<button class="btn btn-danger" id="deleteButton">Delete</button>`;
    let closeButton = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>`
    modal.find('.modal-footer').html('').append(closeButton).append(deleteButton);

    modal.find('.modal-body').html(`
        <form id="deleteUser">
            <input type="hidden" name="id" value="${user.id}" id="id_delete">
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="username_delete" class="form-label fw-bold">Username</label>
                <input type="text" name="username" class="form-control" id="username_delete" value="${user.username}" placeholder="Username" disabled>
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="password_delete" class="form-label fw-bold">Password</label>
                <input type="password" name="password" class="form-control" id="password_delete" value="${user.password}" placeholder="Password" disabled>
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="email_delete" class="form-label fw-bold">Email</label>
                <input type="email" name="email" class="form-control" id="email_delete" value="${user.email}" placeholder="Email" disabled>
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="age_delete" class="form-label fw-bold">Age</label>
                <input type="number" name="age" class="form-control" id="age_delete" value="${user.age}" placeholder="Age" disabled>
            </div>
            <div class="mb-3 d-flex flex-column align-items-center">
                <label for="roles_delete" class="form-label fw-bold">Roles</label>
                <select multiple id="roles_delete" name="roles" class="form-control" disabled>
                    ${roles.map(role => `
                        <option value="${role.id}" ${user.roles.map(r => r.id).includes(role.id) ? 'selected' : ''}>
                            ${role.name.replace('ROLE_', '')}
                        </option>
                    `).join('')}
                </select>
            </div>
        </form>
    `);

    $("#deleteButton").on('click', async () => {
        try {
            await userFetchService.deleteUser(id);
            getTableWithUsers();
            modal.modal('hide');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    })
}

$(async function addNewUser () {
    let roles = await fetch('api/roles').then(res => res.json());
    $('#addUserForm').submit(async (event) => {
        event.preventDefault();

        let addUserForm = $('#addUserForm');
        let username = addUserForm.find('#username_create').val().trim();
        let password = addUserForm.find('#password_create').val().trim();
        let email = addUserForm.find('#email_create').val().trim();
        let age = addUserForm.find('#age_create').val().trim();
        let selectedRoleIds = addUserForm.find("#roles_create").val();

        let selectedRoles = roles.filter(role => selectedRoleIds.includes(role.id.toString()));

        let data = {
            username: username,
            password: password,
            email: email,
            age: age,
            roles: selectedRoles
        };

        try {
            const response = await userFetchService.addNewUser(data);
            if (response.ok) {
                getTableWithUsers();

                addUserForm.find('#username_create').val('');
                addUserForm.find('#password_create').val('');
                addUserForm.find('#email_create').val('');
                addUserForm.find('#age_create').val('');
                addUserForm.find('#roles_create').val([]);

                let tab = new bootstrap.Tab(document.getElementById('home-tab'));
                tab.show();
            } else {
                console.error("Response Error", error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
});
