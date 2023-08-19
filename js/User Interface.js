//Eventos
function eventosCalculadorPresupuesto () {
    document.querySelector("#btn").addEventListener("click" , userInterfaceCalculadorPresupuestos);
    document.querySelector("#btn2").addEventListener("click" , userInterfaceGuardarPresupuesto);
    document.querySelector("#btn3").addEventListener("click" , UserInterfaceVerUltimoPresupuesto);
    document.querySelector("#btn4").addEventListener("click" , UserInterfaceVerTodosLosPresupuestosGuardados);
}
eventosCalculadorPresupuesto();
//UI:
function userInterfaceCalculadorPresupuestos(){
    let horas = document.querySelector("#txtValorUno").value;
    let dias = document.querySelector("#txtValorDos").value;
    let asistente = document.querySelector("#checkBox1").checked;
    let costo = document.querySelector("#txtValorTres").value;
    let costoEnDolares = document.querySelector("#checkBox2").checked;
    let mensaje = "";
    let horasValidadas = validacionPresupuesto(horas);
    let diasValidados = validacionPresupuesto(dias);
    let costoValidado = validacionPresupuesto(costo);
    if (horasValidadas == true && diasValidados == true && costoValidado == true){
        let horasN= Number(horas);
        let diasN= Number(dias);
        let costoN = Number(costo);
        let salario = salarios(asistente, horasN, diasN);
        let materiales= costoMateriales(costoN);
        let costoTotal = salario + materiales;
        if (costoEnDolares == true) {
            salario = (salario/40)
            materiales = (materiales/40)
            let costoTotalUSD = salario + materiales;
            mensaje = `El costo total en USD es de USD ${costoTotalUSD.toFixed(0)} <br>
            Incluye USD ${salario.toFixed(0)} correspondiente a salarios <br>
            Incluye USD ${materiales.toFixed(0)} correspondiente a materiales`;
        }
        else {
            mensaje = `El costo total en UY es de $${costoTotal.toFixed(0)}. <br> 
            Incluye $${salario.toFixed(0)} correspondiente a salarios  <br>
            Incluye $${materiales.toFixed(0)} correspondiente a materiales`;
        }
    }
    else {
        mensaje = "Las horas, dias o costo total ingresados no son validos, verifique.";
    }
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}
function userInterfaceGuardarPresupuesto(){
    let horas = document.querySelector("#txtValorUno").value;
    let dias = document.querySelector("#txtValorDos").value;
    let asistente = document.querySelector("#checkBox1").checked;
    let costo = document.querySelector("#txtValorTres").value;
    let costoEnDolares = document.querySelector("#checkBox2").checked;
    let mensaje = "";
    let horasValidadas = validacionPresupuesto(horas);
    let diasValidados = validacionPresupuesto(dias);
    let costoValidado = validacionPresupuesto(costo);
    if (horasValidadas == true && diasValidados == true && costoValidado == true){
        let horasN= Number(horas);
        let diasN= Number(dias);
        let costoN = Number(costo);
        let salario = salarios(asistente, horasN, diasN);
        let materiales= costoMateriales(costoN);
        let costoTotal = salario + materiales;
        if (costoEnDolares == true) {
            salario = (salario/40)
            materiales = (materiales/40)
            let costoTotalUSD = salario + materiales;
            guardarPresupuestoUSD(costoTotalUSD.toFixed(2),salario, materiales);
            mensaje = `Se guardo el presupuesto correctamente en USD.`;
            //Local storage
            guardarDatosLocalStorage(costoTotalUSD.toFixed(2),salario, materiales);
            recuperarDatosLocalStorage();
        }
        else {
            guardarPresupuesto$UY(costoTotal.toFixed(2), salario, materiales);
            mensaje = `Se guardo el presupuesto correctamente en $UY.`;
            //Local storage
            guardarDatosLocalStorage(costoTotal.toFixed(2),salario, materiales);
            recuperarDatosLocalStorage();
        }
    }
    else {
        mensaje = "Las horas, dias o costo total ingresados no son validos, verifique.";
    }
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}
function UserInterfaceVerTodosLosPresupuestosGuardados(){
    let resultado =VerTodosLosPresupuestosGuardados(PresupuestosGuardados);
    let mensaje = "";
    if (resultado !== ""){
        mensaje += `Los presupuestos guardados hasta el momento son: <br>`;
        mensaje += resultado;
    }
    else{
        mensaje = "No se encontro ningun presupuesto guardado hasta el momento.";
    }
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}
function UserInterfaceVerUltimoPresupuesto() {
    let mensaje = "";
    let costoTotal = verCostoTotalUltimoPresupuesto(PresupuestosGuardados);
    let costoMateriales = verCostoMaterialeslUltimoPresupuesto(PresupuestosGuardados);
    let costoSalarios =  verCostoSalariosUltimoPresupuesto(PresupuestosGuardados);
    if (costoTotal !== undefined && costoMateriales !== undefined && costoSalarios !== undefined){
        mensaje = `El costo del ultimo presupuesto guardado es: <br>
        Costo Total: ${costoTotal} <br>
        Costo Materiales ${costoMateriales} <br>
        Costo Salarios ${costoSalarios}. <br>`;
    } else {
        mensaje = "No se encontro ningun presupuesto guardado hasta el momento.";
    }
    document.querySelector("#divMostrarResultado").innerHTML = mensaje;
}
