$(function () {

    let message = '';
    $('#getData').click(() => {
        $.get('http://localhost:9990/getJson', (req, res) => {
            let obj = JSON.parse(req);

            for (key in obj) {
                let fullName = obj[key].name;
                let id = obj[key].id;
                let mobileNumber = obj[key].mobileNumber;

                $("#myTable > tbody").append(`"<tr><td><input type="checkbox"></td><td>${id}</td><td>${fullName}</td><td>${mobileNumber}</td></tr>"`);

            }
        });
        $("#getData").prop('disabled', true);

        $('#endDiv').append('<button id="sendOtp" >SendOtp</button>');

        $('#sendOtp').click(() => {
            $("#myTable input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                // message += row.cells[1].innerHTML;
                // message += "   " + row.cells[2].innerHTML;
                message += "" + row.cells[3].innerHTML;
                message += "\n";
            });

            if (message == '') {
                alert('You Have not selected anything');
            } else {
                console.log(typeof (message));
                $.post('/sendOtp', {message: message}, (data) => {
                    console.log(data);
                })
            }

        })
    })


});