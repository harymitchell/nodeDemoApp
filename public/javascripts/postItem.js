// DOM Ready =============================================================
$(document).ready(function() {

    // Post item button click
    $('#btnPostItem').on('click', postItem);

});

// Add User
function postItem(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#postItem input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all item info into one object
        var newItem = {
            'name': $('#postItem fieldset input#inputItemName').val(),
            'type': $('#postItem fieldset input#inputItemType').val(),
            'location': $('#postItem fieldset input#inputItemLocation').val(),
            'price': $('#postItem fieldset input#inputItemPrice').val()
        }
        console.log (newItem)

        // Use AJAX to post the object to our postItem service
        $.ajax({
            type: 'POST',
            data: newItem,
            url: '/postItem',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#postItem fieldset input').val('');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                console.log (response.msg)
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};