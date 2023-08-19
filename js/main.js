//Validaciones:
function validacionPresupuesto(pHoras){
    let validacionHoras = false;
    let carPhoras = pHoras.trim().length;
    if (carPhoras >0){
        if (!isNaN(pHoras)) {
            let pHorasN = Number(pHoras);
            if (pHorasN >0) {
                validacionHoras = true;
            }
        }
    }
    return validacionHoras;
}
//Calculos:
function salarios(pUsuario, pCantidadHoras, pDias){
    let horasTotales= pCantidadHoras * pDias;
    let salario = 0;
    if (pUsuario == true){
        salario = horasTotales * 500 + horasTotales * 200;
    }
    else {
        salario = horasTotales * 500;
    }
    return salario;
}
function costoMateriales(pCostoMateriales){
    let costoTotalMateriales = pCostoMateriales + ((pCostoMateriales / 100) * 20);
    return costoTotalMateriales;
}

//Arrays y objetos:
//Lista de presupuestos guardados:
let PresupuestosGuardados= new Array();
//Objeto Presupuestos:
class Presupuestos{
    static numeroPresupuesto=1;
    constructor(){
        this.numero= Presupuestos.numeroPresupuesto++;
        this.costoTotal;
        this.costoSalarios;
        this.costoMateriales;
    }
}
//Agregar a la lista
function guardarPresupuestoUSD(pCostoTotal,pCostoSalarios, pCostoMateriales) {
    let nuevoPresupuestoUSD = new Presupuestos();
    nuevoPresupuestoUSD.costoTotal = `USD ${pCostoTotal}`;
    nuevoPresupuestoUSD.costoSalarios = `USD ${pCostoSalarios}`;
    nuevoPresupuestoUSD.costoMateriales = `USD ${pCostoMateriales}`;
    PresupuestosGuardados.push (nuevoPresupuestoUSD);
}
function guardarPresupuesto$UY(pCostoTotal,pCostoSalarios, pCostoMateriales) {
    let nuevoPresupuestoUY = new Presupuestos();
    nuevoPresupuestoUY.costoTotal = `$UY ${pCostoTotal}`;
    nuevoPresupuestoUY.costoSalarios = `$UY ${pCostoSalarios}`;
    nuevoPresupuestoUY.costoMateriales = `$UY ${pCostoMateriales}`;
    PresupuestosGuardados.push (nuevoPresupuestoUY);
}
function verCostoTotalUltimoPresupuesto(pLista){
    let costoTotalUlimoPresupuesto;
    for (let i=pLista.length-1;i <=pLista.length-1; i++){
        let costo = pLista[i];
        if (costo !== undefined) costoTotalUlimoPresupuesto = costo.costoTotal;
    }
    return costoTotalUlimoPresupuesto;
}
function verCostoMaterialeslUltimoPresupuesto(pLista){
    let costoMaterialesUlimoPresupuesto = 0;
    for (let i=pLista.length-1;i <=pLista.length-1; i++){
        let costo = pLista[i];
        if (costo !== undefined) costoMaterialesUlimoPresupuesto = costo.costoMateriales;
    }
    return costoMaterialesUlimoPresupuesto;
}
function verCostoSalariosUltimoPresupuesto(pLista){
    let costoSalariosUlimoPresupuesto = 0;
    for (let i=pLista.length-1;i <=pLista.length-1; i++){
        let costo = pLista[i];
        if (costo !== undefined) costoSalariosUlimoPresupuesto = costo.costoSalarios;
    }
    return costoSalariosUlimoPresupuesto;
}

function VerTodosLosPresupuestosGuardados(pLista){
    let mostrar = "";
    for (let i=0; i < pLista.length; i++){
        let presupuesto = pLista[i];
        mostrar += `Presupuesto ${presupuesto.numero}: <br>
                    El costo total es: ${presupuesto.costoTotal} <br>
                    El costo de salarios es: ${presupuesto.costoSalarios}. <br>
                    El costo de materiales es: ${presupuesto.costoMateriales} <br>`
        }
        return mostrar;
}

function guardarDatosLocalStorage(pCostoTotal, pSalario, pMateriales){
    localStorage.costoTotal = pCostoTotal;
    localStorage.salario = pSalario;
    localStorage.materiales = pMateriales;
}

function recuperarDatosLocalStorage() {
    if ((localStorage.costoTotal !== undefined) && (localStorage.salario !== undefined) && localStorage.materiales !== undefined) {
        return console.log(`Costo total: ${localStorage.costoTotal} Corresponde a salarios: 
        ${localStorage.salario} Corresponde a materiales  ${localStorage.materiales}`);
    } else {
        return console.log("Ha ocurrido un error");
    }
}
//JSON
// funcion para cuando la llamada es exitosa
function exito() {
    var datos = JSON.parse(this.responseText); //convertir a JSON
    console.log(datos);
}

// funcion para la llamada fallida
function error(err) {
    console.log('Solicitud fallida', err); //los detalles en el objecto "err"
}

// Solicitud GET (Request).
fetch('https://api.github.com/users/RodrigoSuarez47')
    // Exito
    .then(response => response.json())  // convertir a json
    .then(json => console.log(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores
