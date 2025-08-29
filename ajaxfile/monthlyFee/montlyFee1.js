


$(document).ready(function () {

    let studentrollno = "";
    let studentclass  = "";
    $('#studentfeesubmit').click(function (e) {
        e.preventDefault()


        let studentrollno = $('.studentrollnum').val();
        let studentclass = $('.Class_selected').val();

        let monthlyFeeFrom = $('.monthlyFeeFrom').val();
        let monthlyFeeTo = $('.monthlyFeeTo').val();

        

        $.post('/studentFeeSubmit', {
            studentrollno: studentrollno,
            studentclass: studentclass,
            monthlyFeeFrom : monthlyFeeFrom,
            monthlyFeeTo: monthlyFeeTo

        }, function (response) {

            if (response.result) {

                studentresultwait(response);
                studentresultwait()
            } else if (response.errors) {

                stnErrvalidation(response);
                stnErrvalidation()

            }

        }
        );

    })


    async function studentresultwait(result) {
        let waitingResult = await result

       
        let monthlyFeeFrom = result.monthlyFeeFrom;
        let monthlyFeeTo = result.monthlyFeeTo;
        
        let monthlyFeeCombine =  monthlyFeeFrom+"-"+monthlyFeeTo;

        $('#Month_Fee').val(monthlyFeeCombine)
        

        $('#studentmodel').addClass('scale-90 md:top-[200px] top-[260px] lg:top-[120px] animate__shakeX opacity-100');
        $('#studentclosebtn').click(function () {

            
            $('#studentmodel').addClass('opacity-0 top-[-650px]').removeClass('scale-90 md:top-[200px] lg:top-[120px] top-[260px] animate__shakeX');
           
        })


        if (waitingResult.result.length > 0) {
            waitingResult.result.forEach(element => {
               
               $('#Roll_No').val(element.student_rollNo);
               $('#stnName').val(element.student_name);
               $('#Father_Name').val(element.father_name);
               $('#Class').val(element.Class);
               $('#Tuition_Fee').val(element.tuition_fee);
               $('#Library_Fee').val(element.library_fee);
               $('#Sports_Fee').val(element.sports_fee);
               $('#Transportation_Fee').val(element.transportation_fee);
               $('#Building_Fund').val(element.building_fund);
               $('#Extra_Curricular_fee').val(element.extra_curricular_fee);
            //    $('#Penalty').val(element.student_rollNo);
               $('#Total_Fee').val(element.total_fee);
               $('#afterPenalty').val(element.total_fee);

                
                
            });

            $('#feesubMISSION')[0].reset();

            let fields = ['studentrollno', 'studentclass'];
            fields.forEach(field => {
                $('#' + field).html('');
            });

        } else {

            $('#stnform').html(' ')
            
            $('#stnform').append(
                `
               <p class='m-5 col-span-3 text-red-600 text-[24px]'>  Data Not Found Enter Correct Rollno And Class </p> 
                `
            );

            let fields = ['studentrollno', 'studentclass'];
            fields.forEach(field => {
                $('#' + field).html('');
            });


        }


    }


    async function stnErrvalidation(result) {

        let errData = await result

        let errobject = {};
        errData.errors.forEach(element => {
            errobject[element.path] = element.msg;
        });

        let fields = ['studentrollno', 'studentclass'];

        fields.forEach(field => {

            let errorMessage = errobject[field];

            if (errorMessage) {
                $('#' + field).html(errobject[field])
            } else {
                $('#' + field).html(' ')
            }


        })



    }



})


