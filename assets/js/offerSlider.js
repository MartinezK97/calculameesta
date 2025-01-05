$(document).ready(function(){
    $('#monthly_rate').on('input', function(){
        var rate = $(this).val();
        var requested = $('#calc_check_value_requested').val();
        var days = 1 + parseInt($('#calc_check_value_days').val());
        
        $("#check_value_rate_monthly").val(rate);
        
        if(rate > 0 && requested > 0 && days > 0){
            const price = requested / (Math.pow((1 + (rate / 100)), (days / 30)) );
            const nominal = requested * (
                Math.pow(
                    (1 + (rate / 100) ), 
                    (days / 30))
                 );
                 console.log("Rate:", rate);
            console.log("Dias:", days);
            console.log("Monto solicitado:", requested);
            // var nominalValue = requested * Math.pow((1 + dailyRate / 100), days);
            $('#calc_check_value_result').val('$'+nominal.toFixed(2));
        }

    })

    // Actualizar el valor del input range
    $("#check_value_rate_monthly").on("input", function () {
        const value = $(this).val();
        $("#monthly_rate").val(num(value))
    });


})