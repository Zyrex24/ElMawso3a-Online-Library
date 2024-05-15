$(document).ready(function() {
    // Submit feedback form via AJAX
    $('#feedback-form').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Serialize form data
        var formData = $(this).serialize();

        // AJAX request
        $.ajax({
            type: 'POST',
            url: '{% url "feedback" %}',
            data: formData,
            dataType: 'json', // Expect JSON response
            success: function(response) {
                if (response.success) {
                    // Display success message
                    $('#message').html('<p class="success-message">Feedback sent successfully!</p>');
                    // Clear form fields
                    $('#feedback-form')[0].reset();
                } else {
                    // Display validation errors or other errors
                    $('#message').html('<p class="error-message">Error: ' + response.errors + '</p>');
                }
            },
            error: function(xhr, textStatus, errorThrown) {
                // Display error message
                $('#message').html('<p class="error-message">Error: ' + errorThrown + '</p>');
            }
        });
    });
});
