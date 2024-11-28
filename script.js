// Array para almacenar los cálculos realizados
const calculations = [];

// Función que se ejecuta cuando se envía el formulario
document.getElementById('loan-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    // Obtener los valores ingresados por el usuario
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    // Validar los datos ingresados
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm) || loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    // Calcular la tasa de interés mensual
    const monthlyRate = interestRate / 12;

    // Calcular la cuota mensual utilizando la fórmula de amortización
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Mostrar el resultado en la página
    document.getElementById('monthlyPayment').textContent = monthlyPayment.toFixed(2);

    // Guardar el cálculo en el array
    const calculation = {
        loanAmount: loanAmount,
        interestRate: interestRate * 100, // Convertir a porcentaje
        loanTerm: loanTerm,
        monthlyPayment: monthlyPayment.toFixed(2)
    };
    calculations.push(calculation);

    // Mostrar un alert con el cálculo actual
    alert(`Cálculo realizado:\nValor del vehículo: $${calculation.loanAmount}\nTasa de interés anual: ${calculation.interestRate}%\nNúmero de cuotas: ${calculation.loanTerm}\nCuota mensual: $${calculation.monthlyPayment}`);

    // Preguntar al usuario si desea realizar otro cálculo
    const anotherCalculation = prompt('¿Desea realizar otro cálculo? Responder Si o No').toLowerCase();
    if (anotherCalculation !== 'sí') {
        mostrarHistorial();
    }
});

// Función para mostrar el historial de cálculos realizados
function mostrarHistorial() {
    if (calculations.length === 0) {
        alert('No se han realizado cálculos.');
        return;
    }

    let historial = 'Historial de cálculos realizados:\n';
    calculations.forEach((calc, index) => {
        historial += `\nCálculo ${index + 1}:\n`;
        historial += `- Valor del vehículo: $${calc.loanAmount}\n`;
        historial += `- Tasa de interés anual: ${calc.interestRate}%\n`;
        historial += `- Número de cuotas: ${calc.loanTerm}\n`;
        historial += `- Cuota mensual: $${calc.monthlyPayment}\n`;
    });

    alert(historial);
}