$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeNumber = urlParams.get('id');

    console.log('Employee Number:', employeeNumber);

    if (employeeNumber) {
        $.ajax({
            url: 'https://kerbau.odaje.biz/getstaffbyid.php',
            method: 'GET',
            success: function(data) {
                console.log('Response Data:', data); 

                let responseData = JSON.parse(data);
                console.log('Parsed Response Data:', responseData); 

                if (responseData[0].status === 1) {
                    let staff = JSON.parse(responseData[1]);
                    $('#staff-details').html(`
                        <p>Employee Number: ${staff.employeeNumber}</p>
                        <p>First Name: ${staff.firstName}</p>
                        <p>Last Name: ${staff.lastName}</p>
                        <p>Office Code: ${staff.officeCode}</p>
                        <p>Phone Extension: ${staff.extension}</p>
                        <p>Email Address: ${staff.email}</p>
                        <p>Job Title: ${staff.jobTitle}</p>
                        <p>Reports To: ${staff.reportsTo}</p>
                    `);
                } else {
                    $('#staff-details').html('<p>No data found for the selected employee.</p>');
                }
            },
            error: function(error) {
                console.error('Error fetching staff details', error);
                $('#staff-details').html('<p>Error fetching staff details. Please try again later.</p>');
            }
        });
    } else {
        $('#staff-details').html('<p>No employee selected</p>');
    }
});