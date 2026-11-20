let totalLiquidar = 0;
let continuar = true;

console.log("🩺 Iniciando simulador de liquidación de guardias...");
alert("Bienvenido al simulador de cálculo de guardias y horas extra.");

function pedirHoras(tipoGuardia) {
    let horas = Number(prompt(`Ingresá la cantidad de horas para ${tipoGuardia}:`));
    while (isNaN(horas) || horas <= 0) {
        alert("Ingresá un número mayor a 0.");
        horas = Number(prompt(`Ingresá nuevamente las horas para ${tipoGuardia}:`));
    }
    return horas;
}

const calcularMontoGuardia = function(tipo, horas) {
    let valorHora = 0;

    if (tipo === "1") {
        valorHora = 6500;
    } else if (tipo === "2") {
        valorHora = 8500;
    } else {
        valorHora = 7500;
    }

    let total = valorHora * horas;

    if (horas > 24) {
        total = total * 1.1;
        console.log("⭐ Plus del 10% aplicado por superar las 24 horas.");
    }

    return total;
};

const mostrarDetalle = (descripcion, horas, monto) => {
    const mensaje = `Turno: ${descripcion} | Horas: ${horas} | Subtotal: $${monto}`;
    console.log("✅ " + mensaje);
    alert(mensaje);
};

while (continuar) {
    let opcion = prompt(
        "Elegí el tipo de guardia:\n" +
        "1 - Guardia Diurna ($6500/h)\n" +
        "2 - Guardia Nocturna / Feriado ($8500/h)\n" +
        "3 - Guardia de Refuerzo ($7500/h)\n" +
        "Escribí 'ESC' para finalizar."
    );

    if (opcion === null || opcion.toUpperCase() === "ESC") {
        continuar = false;
        break;
    }

    if (opcion !== "1" && opcion !== "2" && opcion !== "3") {
        alert("⚠️ Opción no válida. Elegí 1, 2, 3 o ESC.");
        continue;
    }

    let nombreTurno =
        opcion === "1"
            ? "Guardia Diurna"
            : opcion === "2"
            ? "Guardia Nocturna / Feriado"
            : "Guardia de Refuerzo";

    let horasCargadas = pedirHoras(nombreTurno);
    let subtotalTurno = calcularMontoGuardia(opcion, horasCargadas);
    mostrarDetalle(nombreTurno, horasCargadas, subtotalTurno);

    totalLiquidar += subtotalTurno;

    let seguir = prompt("¿Querés cargar otra guardia? Escribí 'NO' para terminar.");
    if (seguir && seguir.toUpperCase() === "NO") {
        continuar = false;
    }
}

console.log("========================================");
console.log(`💵 Total acumulado a liquidar: $${totalLiquidar}`);
console.log("========================================");
alert(`Proceso finalizado.\nTotal acumulado a liquidar: $${totalLiquidar}`);