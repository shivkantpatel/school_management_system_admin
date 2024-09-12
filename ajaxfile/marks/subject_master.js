
$(document).ready(function(){
    

    $('#Subject_master_submit_btn').click(function(){

        let allFormValue =  $('#subject_master_form').serialize();

        $.ajax({
            url:'/subject_master_insert_',
            type:'POST',
            data: allFormValue,
            success:function(result){
                console.log(result);

                $('body').append(
                    
                    `
                    <div id="alert-border-1" class="flex items-center p-4 mb-4 text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800 absolute top-[11%] right-[5%]" role="alert">
                        <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <div class="ms-3 text-sm font-medium">
                            <span>${result.success}</span>
                        </div>
                        
                    </div>
                    `
                );

                setTimeout(()=>{
                    $('#alert-border-1').remove()
                },3000)

                studentFetchData();
                
            }
        })
        
    });






    //----------- student select all data in table ---------------------- function 

    let studentFetchData = ()=>{
        $.ajax({
            url:'/subject_master_fetcAllRecord',
            type:'get',
            success:function(result){
                $('.tBody_All_Marks_Fetch_Data').empty();

                result.success.forEach(element => {
                    $('.tBody_All_Marks_Fetch_Data').append(
                        `
                        <tr class="border-b" >
                            <td class="px-6 py-2.5 ">${element.subject_code}</td>
                            <td class="px-6 py-2.5 ">${element.subject_name}</td>
                            <td class="px-6 py-2.5 ">${element.min_marks}</td>
                            <td class="px-6 py-2.5 ">${element.max_marks}</td>
                        </tr>
                   

                        `
                    )
                    
                });
                
                
                
            }
        })
    };

    studentFetchData();



    
})