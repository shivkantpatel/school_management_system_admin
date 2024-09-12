$(document).ready(function () {




    $('#stnFeeSubmission').click(function (e) {

        e.preventDefault()


        let formData = $('#stnform').serialize();


        $.ajax({
            url: '/studentfeeSubmitFinal',
            type: 'POST',

            data: formData,
            success: function (response) {
                console.log('Server Response:', response);

                if (response.errors) {
                    
                    response.errors.forEach(element => {

                        $('.paymentModeValidation').html(element.msg)

                    });


                } else if (response.success) {

                    $('.paymentModeValidation').html('')
                    console.log('Success:', response.success);

                }
            },
            error: function (error) {
                console.error(error);


            }
        });




    })

    $('.paymentMode').change(function () {

        let paymentpay = $('#afterPenalty').val()
        let stnPatymentValue = $(this).val()

        if (stnPatymentValue == 'Card') {

            $('.stnCardPayment').html('');



            $('#stnFeeSubmission').prop('disabled', true);


            let data = `
                
                <div>
                    <div class="flex flex-row justify-between items-center ">
                        <p class="text-[14px] text-[#111111]">Card No </p>

                        <div class="">
                            <img class="w-28 h-9" src="https://t4.ftcdn.net/jpg/04/06/75/39/360_F_406753914_SFSBhjhp6kbHblNiUFZ1MXHcuEKe7e7P.jpg" alt="Loading...">
                        </div>

                        
                    </div>
                    
                    <input class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 transition" type="text" placeholder="Card No" name="Card_No" id="Card_No">
                </div>
                <div class="flex flex-row gap-3 justify-between pt-3">
                    <div class="w-2/5">


                        <p class=" text-[12px] text-[#111111]">Expiry</p>
                        <input class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 transition" type="text" placeholder="MM/YY" name="Expiry" id="Expiry">
                    </div>
                    <div class="w-2/5">
                        <p class=" text-[12px] text-[#111111]">CVC</p>
                        <input class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 transition" type="text" placeholder="CVC" name="CVC" id="CVC">
                    </div>
                </div>
                <div class=" flex items-center justify-between mt-7 ">

                     <button class="uppercase text-white bg-[#3ba6ee]  py-2 px-4 rounded shadow-md transition duration-300 ease-in-out confirmAndPay">confirm and pay <span>${paymentpay}</span>  </button>
                     <button class="uppercase paymentModel  text-gray-900  py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">cancel </button>
                    
                </div>
                `;

            $('.stnCardPayment').html(data);
            $('.stnCardPayment').addClass('opacity-100 d-flex').removeClass('opacity-0 hidden');

            $('#Penalty').prop('readonly', true);
            $('.stnCardPayment').addClass('animate__animated animate__rubberBand ')

        } else if (stnPatymentValue == 'upi') {

            $('.stnCardPayment').html('');

            $('#stnFeeSubmission').prop('disabled', true);




            $('.stnCardPayment').addClass('animate__animated animate__rubberBand ')

            let paymentModeUpi = `
                
                <div class="flex flex-row justify-between items-center  ">
                    <p class=" text-[12px]  text-[#111111]">UPI Id</p>

                    <div class="">
                        <img class="w-28 h-9" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/UPI-Logo.png" alt="Loading...">
                    </div>

                        
                </div>
                <div>

                    <input class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 transition" type="text" placeholder="UPI Id" name="Upi_Id" id="Upi_Id">
                </div>
                <div class="pt-3">
                    <p class="text-[14px] text-[#111111]">Account Holder Name</p>
                    <input class="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 transition" type="text" placeholder="Account Holder Name" name="Account_Holder_Name" id="Account_Holder_Name">
                </div>

                <div class=" flex items-center justify-between mt-7 ">

                     <button class="uppercase text-white bg-[#3ba6ee]  py-2 px-4 rounded shadow-md transition duration-300 ease-in-out confirmAndPay" id="">confirm and pay <span>${paymentpay}</span> </button>
                     <button class="uppercase paymentModel  text-gray-900  py-2 px-4 rounded shadow-md transition duration-300 ease-in-out">cancel </button>
                    
                </div>
                `;

            $('.stnCardPayment').html(paymentModeUpi);
            $('.stnCardPayment').addClass('opacity-100 d-flex').removeClass('opacity-0 hidden');
            $('#Penalty').prop('readonly', true);




        } else if (stnPatymentValue == 'cash') {
            $('.stnCardPayment').html('');
            $('.stnCardPayment').addClass('opacity-0 hidden').removeClass('opacity-100 d-flex');
            $('#Penalty').prop('readonly', false);
            $('.studentbtnDisableAndEn').addClass('bg-[#2563EB] text-[#fff] cursor-pointer');

            $('#stnFeeSubmission').prop('disabled', false);
        }
    });






    $('#Penalty').blur(function () {
        let totalfee = parseFloat($('#Total_Fee').val());
        let delayPenalty = parseFloat($(this).val()) || 0;
        let afterPenalty = parseFloat($('#afterPenalty').val()) || 0;


        let PenaltyNewTotal = totalfee + delayPenalty


        $('#afterPenalty').val(PenaltyNewTotal)


    });




    $(document).on('click', '.paymentModel', function (e) {
        e.preventDefault()
        $('#Penalty').prop('readonly', false);

        $('.stnCardPayment').toggleClass(' hidden');

    });



    $(document).on('click', '.confirmAndPay', function (e) {

        e.preventDefault();
        console.log('helloworld');

    })

})