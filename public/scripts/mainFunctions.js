$(".storageName").each(function() {
    $(this).next(".storageAddress").hide()

    $(this).on('click', function(ev){
        
        if ($(this).next(".storageAddress").css("display") == "none") {
            $(this).next(".storageAddress").show()
        } else {
            $(this).next(".storageAddress").hide()
        }
    })
})

$(".loggedIn").each(function() {
    var href = $(this).find("a").first().attr('href')
    var id = href.match(/\d+/)[0]

    var $decreaseBtn = $(`<button type="button" class="btn btn-default">
  <span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span>
</button>`)

    var $increaseBtn = $(`<button type="button" class="btn btn-default">
  <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>
</button>`)

    $(this).prepend($decreaseBtn)
    $(this).prepend($increaseBtn)

    $decreaseBtn.on('click', function(ev){
        var url = '/ajax/item/'+id+'/decrease'

        const headers = {
            'csrf-token': $('[name="_csrf"]').val()
        }
    
        $.ajax({
            url,
            method: 'GET',
            dataType: 'json',
            headers
        })
        .done( newQuantity => {
                $decreaseBtn.parent().prev().html(newQuantity + " db")
            }
         )
         .fail( function(err, ts, errt) {
             console.log(errt)
         })

    })

     $increaseBtn.on('click', function(ev){
        var url = '/ajax/item/'+id+'/increase'

        const headers = {
            'csrf-token': $('[name="_csrf"]').val()
        }
    
        $.ajax({
            url,
            method: 'GET',
            dataType: 'json',
            headers
        })
        .done( newQuantity => {
                $increaseBtn.parent().prev().html(newQuantity + " db")
            }
         )
         .fail( function(err, ts, errt) {
             console.log(errt)
         })
    })

    deleteItem($(this), id)
})


function deleteItem($obj, id) {
    var $deleteBtn = $(`<button type="button" class="btn btn-danger">Törlés</button>`)
    $obj.find("a").last().after($deleteBtn).hide()


    $deleteBtn.on('click', function (ev) {
        ev.preventDefault();

        var url = '/ajax/item/'+id+'/delete'
        
        var _resolve = function () {
            const headers = {
                'csrf-token': $('[name="_csrf"]').val()
            }

            $.ajax({
                url,
                method: 'DELETE',
                dataType: 'json',
                headers
            })
                .done(function (data) {
                    //location.assign('/')
                    $obj.parent().hide()
                })
                .fail(function (err) {
                    $('.help-block').text(err)
                })
            
            $modal.modal('hide');
        }

        var _reject = function () {
            $modal.modal('hide');
        }
        
        var $modal = $('#deleteConfirmModal');
        $modal.modal('show');
        $modal.find('.modal-ok').on('click', _resolve)
        $modal.find('.modal-cancel').on('click', _reject)
    })
}