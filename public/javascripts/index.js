// Cart data array for filling in cart detail view
var cartData = [];

// DOM Ready =============================================================
$(document).ready(function() {
    populateCart();
});

// Fill cart table with data
function populateCart() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/listings/cart', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td>' + this.price + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#shoppingCart table tbody').html(tableContent);
        listingsData = data;
    });
};