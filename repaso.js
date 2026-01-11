// Variables modernas
let nombre = "Diego";
const edad = 20;

// Template strings
console.log(`Hola, me llamo ${nombre} y tengo ${edad} años`);

// Arrow functions
const sumar = (a, b) => a + b;
console.log(sumar(3, 5));

// Objetos y desestructuración
const persona = { nombre: "Diego", ciudad: "Bogotá" };
const { nombre: n, ciudad } = persona;
console.log(n, ciudad);

// Promesas y async/await
const esperar = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("Listo!"), 1000);
  });
};

async function ejecutar() {
  const resultado = await esperar();
  console.log(resultado);
}

ejecutar();
