

$(document).ready(function () {




    $('#submitBtn').click(function () {

        let formdata = $('#class_subject_add_formData').serialize();

        let subject_name = $('#subject_name').val();
        let classCode = $('#classCode').val();
        console.log(subject_name, classCode);

        if (subject_name == null || classCode == null) {
            $('body').append(
                `
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100  dark:text-red-600 absolute top-[10%] md:top-[15%] right-[10%] border-red-600"  id='alertPopup'>
                    <span class="font-medium">Danger alert!</span> field is empty submitting again.
                </div>

                
                `
            );


            setTimeout(() => {
                $('#alertPopup').remove()
            }, 3000)


        } else {
            $('#submit_btn_class_subject_table').prop('disabled', false).removeClass('bg-slate-400').addClass('bg-blue-700');




            $('#theadInsubjectAddTable').append(`
            
            <tr class=" border-b">
                                <td class="px-6 py-3   ">
                                    <input type="text" name="class_code[]" class="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block sm:w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${classCode}" />
                                </td>
                                <td class="px-6 py-3 flex flex-row">
                                    
                                    <input type="text" name="subject_name[]" class="sm:w-[80%] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value="${subject_name}" />

                                    <button type='button' class="pl-4 removeBtn"><i class="fa-solid fa-circle-xmark"></i></button>
                                </td>
                            </tr>
            
            
        `);




        }
    });




    $('#submit_btn_class_subject_table').prop('disabled', true);
    $('#submit_btn_class_subject_table').click(function () {
        let formData = $('#class_subject_form_data').serialize();

        $.ajax({
            url: '/class_Subject_Insert',
            type: "POST",
            data: formData,
            success: function (response) {

                $('.uperLayer').removeClass('hidden')

                $('.success_Model_Alert').append(`
                    
                    <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <div class="ms-3 text-sm font-medium">
                        <span>${response.success}</span>
                    </div>
                    <button id='close_Btnsussess_model' type="button" class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-3" aria-label="Close">
              
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                    
                `)

            },
            error: function (err) {
                // console.log('err');

            }
        })


    })




    //----- modelsussec close btn--------------

    $(document).on('click','#close_Btnsussess_model',function(){
        $('.uperLayer').addClass('hidden');

        window.location.reload();
     
        
    })



    //----------------------------removeselect -----------------------------


    $(document).on('click', '.removeBtn', function () {
        $(this).closest('tr').remove();

    })

})