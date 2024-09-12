


$(document).ready(function () {



    $('#submitBtn').click(function (e) {

        e.preventDefault();

        let serializedArray = $('#feeInsertForm').serializeArray();
        let formData = {};

        $.each(serializedArray, function () {
            formData[this.name] = this.value;
        });



        $.ajax({
            url: '/feeshMasterInertData',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (result) {


                if (result.success) {
                    $('#successPOPup').removeClass('hidden').addClass('flex');

                    // Hide the popup after 3 seconds 
                    setTimeout(function () {
                        $('#successPOPup').addClass('hidden');
                    }, 3000);

                    $('#feeInsertForm')[0].reset();

                    const fields = [
                        'fee_id', 'class_code', 'tuition_fee', 'library_fee',
                        'sports_fee', 'transportation_fee', 'building_fund',
                        'extra_curricular_fee', 'total_fee'
                    ];

                    // Clear error messages
                    fields.forEach(field => {
                        $('#' + field).html('');
                    });
                } else
                    if (result.errors) {



                        let errorObject = {};
                        result.errors.forEach(element => {

                            errorObject[element.path] = element.msg;
                        });

                        const fields = [
                            'fee_id', 'class_code', 'tuition_fee', 'library_fee',
                            'sports_fee', 'transportation_fee', 'building_fund',
                            'extra_curricular_fee', 'total_fee'
                        ];

                        fields.forEach(field => {


                            if (errorObject[field]) {
                                $('#' + field).html(errorObject[field]);
                            } else {
                                $('#' + field).html('');
                            }
                        });

                    }

            }

        })




    })
})

