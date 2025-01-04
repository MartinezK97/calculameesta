$(document).ready(function () {
    function calculateTIR() {
      // Obtener valores de entrada
      const valor = parseFloat($("#calc_tir_value").val()) || 0; // Valor nominal
      const precio = parseFloat($("#calc_tir_buy").val()) || 0; // Precio de compra
      const comision = parseFloat($("#calc_tir_comission").val()) || 0; // Comisión en porcentaje
  
      const fechaCompra = new Date($("#calc_tir_buy_date").val());
      const fechaVencimiento = new Date($("#calc_tir_expired").val());
  
      // Calcular margen inicial
      const margen = valor - precio;
  
      // Ajustar ganancia restando el porcentaje de comisión
      const ganancia = margen * (1 - comision / 100);
  
      // Mostrar ganancia ajustada automáticamente
      $("#calc_tir_profit").val(ganancia.toFixed(2));
  
      // Validar fechas
      if (isNaN(fechaCompra.getTime()) || isNaN(fechaVencimiento.getTime())) {
        $("#tir_neta_result").val("Fecha inválida");
        return;
      }
  
      // Calcular días entre fechas
      const diferenciaDias = (fechaVencimiento - fechaCompra) / (1000 * 60 * 60 * 24);
        $("#calc_tir_days").val(diferenciaDias)
  
      // Calcular la TIR neta
      if (diferenciaDias > 0 && ganancia > 0) {
        const tir = (Math.pow((valor / (valor - ganancia)), 360 / diferenciaDias) - 1) * 100;
        $("#tir_neta_result").val("TIR: "+ tir.toFixed(2) + "% anual");
      } else {
        $("#tir_neta_result").val("Error en los datos");
      }
    }
    // Asignar evento input a los campos relevantes
    $("#calc_tir_value, #calc_tir_buy, #calc_tir_comission, #calc_tir_buy_date, #calc_tir_expired").on("input", calculateTIR);

   
 function calculatePriceFromTIR() {
  // Obtener los valores de los inputs
  const valor = parseFloat($("#calc_price_value").val()) || 0; // Valor del cheque
  const tir = parseFloat($("#calc_price_tir").val()) || 0; // TIR anual
  const fechaCompra = new Date($("#calc_price_buy_date").val());
  const fechaVencimiento = new Date($("#calc_price_expired").val());
  const percent = parseFloat($("#calc_price_percent").val()) || 0; // Porcentaje ingresado
  const discountPercent = parseFloat($("#calc_price_comission").val()) || 0; // Comisión
  let comission;

  // Validar fechas
  if (isNaN(fechaCompra.getTime()) || isNaN(fechaVencimiento.getTime())) {
    $("#price_result").val("Fecha inválida");
    $("#investment_result").val("Fecha inválida");
    $("#calc_price_days").val("");
    return;
  }

  // Calcular diferencia de días
  const diferenciaDias = (fechaVencimiento - fechaCompra) / (1000 * 60 * 60 * 24);
  $("#calc_price_days").val(diferenciaDias + 1);

  // Calcular precio resultante
  if (diferenciaDias > 0 && tir > 0 && valor > 0) {
    const factorTIR = 1 + (tir / 100);
    const exponente = diferenciaDias / 360;
    const precioFinal = valor / Math.pow(factorTIR, exponente);

    $("#investment_result").val(precioFinal.toFixed(2));

    // Calcular diferencia (ganancia neta)
    ganancia = valor - precioFinal;

    margin = (ganancia) / (1 - (percent / 100))
    comission = margin - ganancia;
    // $("#calc_price_margin").val(margen.toFixed(2));
    $("#price_result").val(num(valor - margin));

    // Aplicar porcentaje ingresado (calc_price_percent) a calcular comisión y ganancia
    if (percent >= 0 && percent <= 100) {
      // const comision = (margen * 100 ) / (percent / 100); // Comisión calculada
      // const ganancia = margen - comision; // Ganancia restante
      // $("#calc_price_comission").val(comision.toFixed(2));
      $("#calc_price_profit").val(ganancia.toFixed(2));
      $("#calc_price_margin").val(margin.toFixed(2));
      $("#calc_price_comission").val(comission.toFixed(2));
    }
  } else {
    // Reiniciar campos si los datos son inválidos
    $("#price_result").val("Error en los datos");
    $("#investment_result").val("Error en los datos");
    $("#calc_price_margin, #calc_price_comission, #calc_price_profit").val("");
  }
}

// Evento para recalcular cuando cambian los valores
$("#calc_price_tir, #calc_price_value, #calc_price_buy_date, #calc_price_expired, #calc_price_percent").on("input", calculatePriceFromTIR);

  })
  
  function num(n) {
    // Convertir el número a formato con punto decimal y coma
    let formattedNumber = n.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    // Si el número tiene al menos 4 dígitos, separar con punto cada tres cifras
if (formattedNumber.length >= 4) {
    const parts = formattedNumber.split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    formattedNumber = parts.join(',');
}

    return formattedNumber;
}

