$(document).ready(function() {
    $('[id^=userEditDialog]').on('shown.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let userId = button.data('userid');

        if (userId) {
            $.get({
                url: '/api/v1/user/' + userId,
                success: (data) => {
                    let modal = $('#' + button.data('bs-target').substring(1));
                    modal.find('#id_edit').val(data.id);
                    modal.find('#username_edit').val(data.username);
                    modal.find('#password_edit').val(data.password);
                    modal.find('#email_edit').val(data.email);
                    modal.find('#age_edit').val(data.age);
                    modal.find('#roles_edit').val(data.roles);
                },
                error: (err) => {
                    alert(err);
                }
            });
        }
    });
});
