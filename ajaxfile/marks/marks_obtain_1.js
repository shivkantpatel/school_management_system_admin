
$(document).ready(function () {

    $('.mm_no_validation_').change(function () {

        let mm_no = $(this).val();

        //ajax call mm_no is present or not database ------

        $.ajax({
            url: '/mm_no_search_data',
            type: 'POST',
            data: { mm_no: mm_no },
            success: function (response) {

                if (response.mm_no_mismatch) {
                    $('#EmptyFieldalert').html('');


                    $('#EmptyFieldalert').addClass('opacity-100 right-[20%]');

                    setTimeout(() => {
                        $('#EmptyFieldalert').addClass('opacity-0 right-[-40%]').removeClass('opacity-100 right-[20%]');
                    }, 2000)

                    $('#EmptyFieldalert').append(`
                         <div class="ms-3 text-sm font-medium">
                            <span>${response.mm_no_mismatch}</span>
                        </div>
                    `)
                } else {

                    //-----response pass the data 
                    studentMM_number_wating_result(response)

                }

            }
        });

    });




    //------------------ wating response in student_mm No and class and roll_no faitch 

    let studentMM_number_wating_result = async (response) => {

        $('#mm_no').prop('readonly', true);

        let watingResult = await response;
        $('#cla_ss').val(watingResult.class);
        $('.studentresult_mm_no').val(watingResult.mm_id);

        /// show div data found s0 

        $('#mmNoMatchSOshow').addClass(' static');

        $('#mmNoMatchSOshow').removeClass('hidden opacity-0').addClass('  opacity-100 scale-100 static');

        setTimeout(() => {
            
        }, 3000);

        response.studentRollNo.forEach(element => {

            $('#selectRollNo').append(

                `
                    <option value="${element.student_rollNo}">${element.student_rollNo}</option> 
                `
            );
        });



        //class by class subject 
        
        response.subject_code_name.forEach((element) => {

            $('.mark_obtain_tbody').append(`
                
                <tr class="border-b ">
                
                    <td colspan="2" class="px-6 py-2.5 text-center">
                        <input  readonly value="${element.subject_code_name}" name='subject[]' type="text" class="float-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[60%] w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter marks" required />
                    </td>

                    <td colspan="2" class="px-6 py-2.5 text-center"> 
                        <input name='marks[]' type="number" class="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-[60%] w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter marks" required />
                        
                    </td>

                </tr>
                
            `)

        })

    };


    ///---------------- student roll no fatchdata and insert masrk

    $('#selectRollNo').change(function () {
        roll_no_value = $(this).val();

       
        $.ajax({
            url: '/student_roll_no_Profile_acces',
            type: 'POST',
            data: { stnRollNo: roll_no_value },
            success: function (response) {

                response.result.forEach((element)=>{

                    $('.studentRollNo_Entry').val(element.student_rollNo);
                    
                    $('.studentmaskThead').html('')

                   $('.studentmaskThead').append(`
                    
                    <tr class="bg-[#ddd]">
                        <td class="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider ">${element.student_name}</td>
                        <td class="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">${element.father_name}</td>
                        <td class="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">${element.gender}</td>
                        <td class="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">${element.date_of_birth}</td>
                            
                    </tr>
                    
                    `)
                    
                });


                ///append in submit marks insert 
                 $('.TableTfoter').html('')
                $('.TableTfoter').append(`
                    
                   <tr class=' text-right  '>
                        <td colspan="4" class="pt-3"><button id="maskentySubmitBtn" type="button" class="text-white  bg-blue-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-[40%] sm:w-auto px-5 py-2.5 mx-3 text-center ">Submit</button></td>
                    </tr>  
                `)

            }
        });

    });


    //- ------------ marks entry  ------------------------- 



    //-marsk.length chek and validate  

    $(document).on('click','#maskentySubmitBtn',function(){
        
        let marksentyFormData = $('#maskentryForm').serialize();
        
        $.ajax({
            url: '/studentMaskEntry',
            type: 'POST',
            data: marksentyFormData,
            success: function (response) {
                
                // alert succes and reset data 

                $('#EmptyFieldalert').html('');
                $('.studentmaskThead').html('')

                    $('#EmptyFieldalert').addClass('opacity-100 right-[20%] rounded-lg bg-[#66bb6a]');

                    setTimeout(() => {
                        $('#EmptyFieldalert').addClass('opacity-0 right-[-40%]').removeClass('opacity-100 right-[20%]');
                    }, 2000)

                    $('#EmptyFieldalert').append(`
                         <div class="ms-3 text-sm font-medium text-white  ">
                            <span>${response.success}</span>
                        </div>
                    `)


                $('#maskentryForm').trigger('reset');
                $('#selectRollNo').val('Select Roll No');


            }   
        })
        
        
    })

})