var $registerBtn = $('#registerBtn')
$registerBtn.on('click', function (ev) {
    ev.preventDefault()

    var $registerModal = $(
    `<div class="modal fade confirm-modal" tabindex="-1" role="dialog" id="registerModal">
         <div class="modal-dialog modal-md" role="document">
             <div class="modal-content">
             <div class="modal-header">Regisztráció</div>
             <div class="modal-body">
                 <div class="alert alert-danger"></div>
                 <div class="form-area"></div>
             </div>
             </div>
         </div>
       </div>`)

     var $errorBox = $registerModal.find('.alert')
     $errorBox.hide();

     var $formArea = $registerModal.find('.form-area')
     $formArea.load('/register #registerForm', function () {
        var $registerForm = $formArea.find('form')
        $registerForm.on('submit', function (ev) {
            ev.preventDefault();
            $errorBox.hide();

            $.ajax({
                url: '/ajax/register',
                method: 'POST',
                data: $(this).serializeArray(),
                dataType: 'json'
            })
            .done(function (json) {
                if (json.success) {
                    location.assign('/')
                } else {
                    const errorMessages = json.errorMessages                
                    $errorBox.text(errorMessages.join("\n")).show()
                }
            })
        });

    $registerModal.modal('show')
    })
})