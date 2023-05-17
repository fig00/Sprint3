
//Se quita el funcionamiento del formulario
const register_button = document.getElementById('button');
register_button.addEventListener('click',function(event){
    console.log('funciona evento prevent');
    event.preventDefault();
    document.getElementById('buttonPerm').disabled = false;
    document.getElementById('buttonAsig').disabled = false;
    document.getElementById('buttonComp').disabled = false;
});

//Captura de datos ingresados por el ususario.
const fecha_hoy = new Date();

const inputNacimiento = document.getElementById('fechaNacimiento');
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputSueldoActual = document.getElementById('sueldoActual');
const inputSueldoAnterior = document.getElementById('sueldoAnterior');

const selectEsTrabajador = document.getElementById('esTrabajadorActivo');
const inputFechaIngreso = document.getElementById('fechaIngreso');

inputFechaIngreso.disabled = true;
selectEsTrabajador.addEventListener("change", function () {
    if (selectEsTrabajador.value == "false") {
        inputFechaIngreso.disabled = true;
        inputFechaIngreso.value = '';
    } else {
        inputFechaIngreso.disabled = false;
        // validacion fecha ingreso mayor a fecha nacimiento
        inputFechaIngreso.min = inputNacimiento.value;
        // validacion fecha ingreso menor a fecha actual
        inputFechaIngreso.max = fecha_hoy.toJSON().slice(0,10);
    }
})

//Validación carga familiar.
const selectTieneCargaFamiliar = document.getElementById('tieneCargaFamiliar');
const inputCantidadCargaFamiliar = document.getElementById('cantidadCargaFamiliar');

inputCantidadCargaFamiliar.disabled = true;
selectTieneCargaFamiliar.addEventListener("change", function () {
    if (selectTieneCargaFamiliar.value == "false") {
        inputCantidadCargaFamiliar.disabled = true;
        inputCantidadCargaFamiliar.value = '0';
    } else {
        inputCantidadCargaFamiliar.disabled = false;
        inputCantidadCargaFamiliar.value = '1';
    }
})

//Validacion campos no vacios ni fechas incorrectas (si no se completan los campos o son validas las fechas el boton enviar no funciona)
document.getElementById('form').addEventListener('change', function(){
    if( inputNacimiento.value == '' || selectEsTrabajador.value == -1 || selectTieneCargaFamiliar.value == -1 || inputNombre.value =='' || inputApellido.value == '' || inputSueldoActual.value == '' || inputSueldoAnterior.value == ''){
        register_button.disabled = true;
        document.getElementById('validacionForm').innerHTML = `Faltan campos por completar`
    } else {
        if(selectEsTrabajador.value == 'true' && inputFechaIngreso.value < fecha_hoy.toJSON().slice(0,10) && inputFechaIngreso.value > inputNacimiento.value){
            register_button.disabled = false;
            document.getElementById('validacionForm').innerHTML = ``
        }else if(selectEsTrabajador.value == 'false') {
            register_button.disabled = false;
            document.getElementById('validacionForm').innerHTML = ``
        } else {
            register_button.disabled = true;
            document.getElementById('validacionForm').innerHTML = `Fecha de ingreso no válida`
        }
    }
})

//Calculo permanencia usuario.
function calcularPermanencia(fecha_ingreso) {
if (true) {
    const ahora_anio = fecha_hoy.getFullYear();
        const ahora_mes = fecha_hoy.getMonth();
        const ahora_dia = fecha_hoy.getDate();

        const ingreso_anio = fecha_ingreso.getFullYear();
        const ingreso_mes = fecha_ingreso.getMonth();
        const ingreso_dia = fecha_ingreso.getDate();

        let permanencia = ahora_anio - ingreso_anio;
        if (ahora_mes < ingreso_mes) {
            permanencia--;
        }
        if (ahora_mes == ingreso_mes && ahora_dia < ingreso_dia) {
            permanencia--;
        }

        let meses = 0;
        if (ahora_mes > ingreso_mes) {
            meses = ahora_mes - ingreso_mes;
        }
        if (ingreso_mes > ahora_mes) {
            meses = 12 - (ingreso_mes - ahora_mes);
        }
        if (ahora_dia < ingreso_dia) {
            meses--;
        }

        let dias = 0;
        if (ahora_dia >  ingreso_dia){
            dias = ahora_dia - ingreso_dia;
        }
        if (ahora_dia < ingreso_dia) {
            ultimoDiaMes = new Date(ahora_anio, ahora_mes, 0);
            dias = ultimoDiaMes.getDate()- (ingreso_dia - ahora_dia);
        }
        let milisegundosPorDia = 1000*60*60*24;

        let dias_restantes = 0;
        let ingreso_aniversario = new Date(ahora_anio, ingreso_mes, ingreso_dia);
        if (ingreso_aniversario < fecha_hoy) {
            ingreso_aniversario.setFullYear(ahora_anio + 1); 
        }
        dias_restantes = Math.floor((ingreso_aniversario.getTime() - fecha_hoy.getTime())/milisegundosPorDia);
        let mensajeDiasRestantes;
        if (dias_restantes==0) {
            mensajeDiasRestantes = 'Hoy estás de aniversario de permanencia en la empresa.';
        } else {
            mensajeDiasRestantes = `Faltan ${dias_restantes} días para tu próximo año de permanencia.`;
        } 

        return `Tienes una permanencia de ${permanencia} años, con ${meses} meses y ${dias} días. <br>
                ${mensajeDiasRestantes} `;
    } else {
        return 'Parámetro incorrecto';
    }
}
//Cálculo asignación familiar ususario
function calcularAsignacionFamiliar(sueldoAnterior, cantidadCargaFamiliar) {
    let asignacionFamiliar = 0;
    if (sueldoAnterior <= 979330) {
        if (sueldoAnterior <= 429899) {
            asignacionFamiliar = cantidadCargaFamiliar * 16828;
        } else if (sueldoAnterior <= 627913) {
            asignacionFamiliar = cantidadCargaFamiliar * 10327;
        } else {
            asignacionFamiliar = cantidadCargaFamiliar * 3264;
        }
        return asignacionFamiliar;
    } else {
        return asignacionFamiliar;
    }
    
}

//Se crea un array lista de usuarios capturando los datos ingresados
var user_list = [];

function createUser() {
    //console.log('copio todo');
    
    const user = {
        user_name: inputNombre.value,
        user_lastname: inputApellido.value,
        user_date_of_birth: inputNacimiento.value,
        user_is_worker: selectEsTrabajador.value,
        user_date_of_entry: inputFechaIngreso.value,
        user_salary: inputSueldoActual.value,
        user_salary_previous: inputSueldoAnterior.value,
        user_has_carga: selectTieneCargaFamiliar.value,
        user_carga_asignacion: calcularAsignacionFamiliar(inputSueldoAnterior.value, inputCantidadCargaFamiliar.value),
        user_carga_family: inputCantidadCargaFamiliar.value,
        user_salary_final: parseInt(inputSueldoActual.value) + calcularAsignacionFamiliar(inputSueldoAnterior.value, inputCantidadCargaFamiliar.value)
    }
    user_list.push(user);
    //console.log('pushea');
    console.log('lista de usuario: ',user_list);
}

let respuestaInforme = document.getElementById('respInforme');


// Informe Permanencia
function infPermanencia() {
    let fechaIngresoInf = new Date(user_list[user_list.length-1].user_date_of_entry)
    respuestaInforme.innerHTML = calcularPermanencia(fechaIngresoInf)
};

// Informe Asignaciones
function infAsignaciones() {
    indexUser = user_list.length-1;
    respuestaInforme.innerHTML = `Nombre y Apellido: ${user_list[indexUser].user_name.charAt(0).toUpperCase() + user_list[indexUser].user_name.slice(1)} ${user_list[indexUser].user_lastname.charAt(0).toUpperCase() + user_list[indexUser].user_lastname.slice(1)} <br>
    Sueldo Actual: ${user_list[indexUser].user_salary} <br>
    Monto de Carga Familiar: ${user_list[indexUser].user_carga_asignacion} <br>
    Sueldo Final: ${user_list[indexUser].user_salary_final}`
};

// Informe Final Usuario
function infCompleto() {
    indexUser = user_list.length-1;
    respuestaInforme.innerHTML = `Nombre y Apellido: ${user_list[indexUser].user_name.charAt(0).toUpperCase() + user_list[indexUser].user_name.slice(1)} ${user_list[indexUser].user_lastname.charAt(0).toUpperCase() + user_list[indexUser].user_lastname.slice(1)} <br>
    Fecha de nacimiento: ${user_list[indexUser].user_date_of_birth} <br>
    Trabajador activo: ${user_list[indexUser].user_is_worker == 'true' ? 'Si' : 'No'} <br>
    Fecha de Ingreso a la Organizacion: ${user_list[indexUser].user_date_of_entry == '' ? 'No registra fecha de ingreso' : user_list[indexUser].user_date_of_entry} <br>
    Sueldo Actual: ${user_list[indexUser].user_salary} <br>
    Sueldo Semestre Anterior: ${user_list[indexUser].user_salary_previous} <br>
    Corresponde Carga Familiar: ${user_list[indexUser].user_carga_asignacion == 0 ? 'No' : 'Si'} <br>
    Cantidad de Cargas Familiares: ${user_list[indexUser].user_carga_family} <br>
    Monto de Carga Familiar: ${user_list[indexUser].user_carga_asignacion} <br>
    Sueldo Final: ${user_list[indexUser].user_salary_final}`
};

