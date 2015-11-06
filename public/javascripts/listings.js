// listings data array for filling in info box
var listingsData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the listings table on initial page load
    populateTable();
    // Add listing to cart link
    $('#currentListings table tbody').on('click', 'td a.linkAddListingToCart', addListingToCart);

});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/listings/currentListings', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.name + '</td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '<td>' + this.location + '</td>';
            tableContent += '<td>' + this.price + '</td>';
            tableContent += '<td><a href="#" class="linkAddListingToCart" rel="' + this._id + '">Add</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#currentListings table tbody').html(tableContent);
        listingsData = data;
    });
};

// Add to Cart
function addListingToCart(event) {

    event.preventDefault();
    // Reveal confirmation dialog
    var confirmation = confirm('Are you sure you want to add this item to your cart?');
    // Check and make sure the user confirmed
    if (confirmation === true) {
        // Use AJAX POST to add item to user cart.
        $.ajax({
            type: 'POST',
            url: '/listings/postItemToCart/'+ $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {
            if (response.msg === '') {
                // TODO: Alert user with flash message.
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        return false;
    }

};

