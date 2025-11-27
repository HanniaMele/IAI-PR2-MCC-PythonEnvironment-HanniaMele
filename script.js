// === CARGA DE PYODIDE (Python en el navegador) ===
let pyodideReadyPromise = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/"
});

// === TEMPORIZADOR ===
class Temporizador {
  constructor(actualizarEtiquetaCallback) {
    this.segundos = 0;
    this.intervalId = null;
    this.actualizarEtiqueta = actualizarEtiquetaCallback;
  }

  iniciar() {
    if (this.intervalId !== null) return;
    this.intervalId = setInterval(() => {
      this.segundos++;
      const min = Math.floor(this.segundos / 60);
      const seg = this.segundos % 60;
      if (this.actualizarEtiqueta) {
        const texto = `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
        this.actualizarEtiqueta(texto);
      }
    }, 1000);
  }

  detener() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getSegundos() {
    return this.segundos;
  }

  reiniciar() {
    this.detener();
    this.segundos = 0;
    if (this.actualizarEtiqueta) {
      this.actualizarEtiqueta("00:00");
    }
    this.iniciar();
  }
}

// === PROBLEMAS (traducción de tu Problemas.java) ===
class Problemas {
  constructor() {
    this.problemas = {};
    this.respuestas = {};
    this.pistas = {};
    this.codigoInicial = {};
    this.nivelActual = "NOVATO";
    this.indiceActual = 0;

    // --- NIVEL NOVATO ---
    this.problemas["NOVATO"] = [
      "Problema 1: Imprime 'Hola Mundo'.",
      "Problema 2: Suma 10 + 15 + 25 y muestra el resultado.",
      "Problema 3: Calcula y muestra el cuadrado de 3."
    ];

    this.respuestas["NOVATO"] = [
      "Hola Mundo",
      "50",
      "9"
    ];

    this.pistas["NOVATO"] = [
      [
        "'Hola Mundo' es de tipo String.",
        "Usa print() para imprimir.",
        "Usa comillas dentro del print()."
      ],
      [
        "Necesitarás el símbolo '+'.",
        "Puedes hacer la suma directamente dentro de un print().",
        "Los tipos int no necesitan comillas."
      ],
      [
        "Usa una variable llamada 'cuadrado'.",
        "Usa '*' para multiplicar.",
        "Imprime el valor de la variable 'cuadrado'."
      ]
    ];

    this.codigoInicial["NOVATO"] = [
      "",
      "",
      ""
    ];

    // --- NIVEL INTERMEDIO ---
    this.problemas["INTERMEDIO"] = [
      "Problema 1: Determina si el número 7 es primo.",
      "Problema 2: Crea una función que invierta la cadena 'Python'.",
      "Problema 3: Calcula la suma de los números pares del 1 al 100."
    ];

    this.respuestas["INTERMEDIO"] = [
      "Es primo",
      "nohtyP",
      "2550"
    ];

    this.pistas["INTERMEDIO"] = [
      [
        "Un número primo solo tiene dos divisores: 1 y él mismo.",
        "Usa un bucle for para probar divisores desde 2 hasta n-1.",
        "Usa if para verificar si el número es divisible."
      ],
      [
        "Puedes recorrer la cadena al revés usando slicing.",
        "Usa la notación [inicio:fin:paso].",
        "El paso -1 invierte el orden de la cadena."
      ],
      [
        "Los números pares dejan residuo 0 al dividir entre 2.",
        "Usa range(2, 101, 2) para obtener solo pares.",
        "Suma los números con la función sum()."
      ]
    ];

    this.codigoInicial["INTERMEDIO"] = [
      "n = 7\n",
      "cadena = 'Python'\n",
      ""
    ];

    // --- NIVEL AVANZADO ---
    this.problemas["AVANZADO"] = [
      "Problema 1: Calcula el factorial de 5 usando recursión.",
      "Problema 2: Cuenta cuántas vocales tiene la palabra 'Programacion'.",
      "Problema 3: Elimina los números duplicados de la lista [1, 2, 2, 3, 3, 3, 4] y muestra el resultado."
    ];

    this.respuestas["AVANZADO"] = [
      "120",
      "5",
      "1 2 3 4"
    ];

    this.pistas["AVANZADO"] = [
      [
        "La recursión consiste en que una función se llama a sí misma.",
        "El caso base ocurre cuando n es 1 o 0.",
        "La llamada recursiva debe multiplicar n por factorial(n-1)."
      ],
      [
        "Las vocales son 'a', 'e', 'i', 'o', 'u'.",
        "Recorre la palabra con un for y cuenta las vocales.",
        "Convierte la palabra a minúsculas para evitar errores."
      ],
      [
        "Usa un conjunto (set) para eliminar duplicados.",
        "Convierte el conjunto a lista para imprimirlo ordenado.",
        "Usa join() para mostrar los números sin comas ni corchetes."
      ]
    ];

    this.codigoInicial["AVANZADO"] = [
      "",
      "palabra = 'Programacion'\ncontador = 0\n",
      "numeros = [1, 2, 2, 3, 3, 3, 4]\n# Tu código aquí\n"
    ];
  }

  getProblemaActual() {
    const lista = this.problemas[this.nivelActual];
    if (!lista || this.indiceActual < 0 || this.indiceActual >= lista.length) {
      this.indiceActual = 0;
    }
    return lista[this.indiceActual];
  }

  getRespuestaActual() {
    return this.respuestas[this.nivelActual][this.indiceActual];
  }

  getPistasActuales() {
    return this.pistas[this.nivelActual][this.indiceActual];
  }

  getCodigoInicial() {
    return this.codigoInicial[this.nivelActual][this.indiceActual];
  }

  siguienteProblema() {
    this.indiceActual++;
    const lista = this.problemas[this.nivelActual];
    if (this.indiceActual >= lista.length) {
      if (this.nivelActual === "AVANZADO") {
        alert("¡Felicidades! Has completado todos los niveles del ambiente Python.\nTu desempeño demuestra dominio total.");
        this.nivelActual = "NOVATO";
        this.indiceActual = 0;
      } else {
        this.indiceActual = 0;
      }
    }
  }

  actualizarNivel(nuevoNivel) {
    if (nuevoNivel !== this.nivelActual) {
      this.nivelActual = nuevoNivel;
      this.indiceActual = 0;
    }
  }

  getNivelActual() {
    return this.nivelActual;
  }

  getNivelActualNumerico() {
    switch (this.nivelActual) {
      case "NOVATO": return 1.0;
      case "INTERMEDIO": return 2.0;
      case "AVANZADO": return 3.0;
      default: return 1.0;
    }
  }
}

// === Evaluador difuso simplificado (placeholder) ===
function evaluarNivel(tiempo, errores, ayudas, nivelActualNumerico) {
  const penalizacion = errores + ayudas;
  const rapido = tiempo < 120; // < 2 min
  let nivel = nivelActualNumerico;

  if (rapido && penalizacion <= 1 && nivel < 3) {
    nivel += 1;
  }

  if (nivel < 1.5) return "NOVATO";
  if (nivel < 2.5) return "INTERMEDIO";
  return "AVANZADO";
}

// === Normalización de cadenas (espacios, comas) ===
function normalizar(s) {
  return s
    .replace(/\s+/g, " ")
    .replace(/\s*,\s*/g, ",")
    .trim();
}

// === MAIN: lógica de la página ===
document.addEventListener("DOMContentLoaded", () => {
  const lblTiempo = document.getElementById("lbl-tiempo");
  const btnAyuda = document.getElementById("btn-ayuda");
  const btnCompilar = document.getElementById("btn-compilar");
  const btnEjecutar = document.getElementById("btn-ejecutar");
  const textoProblema = document.getElementById("texto-problema");
  const areaCodigo = document.getElementById("area-codigo");
  const salida = document.getElementById("salida");

  const problemas = new Problemas();
  const timer = new Temporizador((texto) => {
    lblTiempo.textContent = texto;
  });

  textoProblema.value = problemas.getProblemaActual();
  areaCodigo.value = problemas.getCodigoInicial();

  timer.iniciar();

  let errores = 0;
  let ayudas = 0;
  let ayudasMostradas = 0;

  // --- Botón AYUDA ---
  btnAyuda.addEventListener("click", () => {
    const todasLasPistas = problemas.getPistasActuales();
    const problemaActual = problemas.getProblemaActual();

    if (ayudasMostradas < todasLasPistas.length) {
      let texto = problemaActual + "\n\nAyudas:\n";
      for (let i = 0; i <= ayudasMostradas; i++) {
        texto += todasLasPistas[i] + "\n\n";
      }
      textoProblema.value = texto;
      ayudasMostradas++;
      ayudas++;
    } else {
      const textoActual = textoProblema.value;
      if (!textoActual.includes("(Ya has visto todas las ayudas disponibles.)")) {
        textoProblema.value = textoActual + "\n(Ya has visto todas las ayudas disponibles.)";
      }
    }
  });

  // --- Botón COMPILAR (verificación de sintaxis con compile()) ---
  btnCompilar.addEventListener("click", async () => {
    salida.textContent = "";
    const codigoUsuario = areaCodigo.value;

    try {
      const pyodide = await pyodideReadyPromise;
      const pythonCode = `
code = ${JSON.stringify(codigoUsuario)}
compile(code, "<usuario>", "exec")
`;
      await pyodide.runPythonAsync(pythonCode);
      salida.textContent = "Compilación correcta\n";
    } catch (e) {
      salida.textContent = "Error de compilación:\n" + e + "\n";
      errores++;
    }
  });

  // --- Botón EJECUTAR (ejecutar código y capturar print) ---
  btnEjecutar.addEventListener("click", async () => {
    salida.textContent = "";
    const codigoUsuario = areaCodigo.value;

    if (codigoUsuario.includes("input(")) {
      salida.textContent = "No se permite usar input() en este entorno.\n";
      return;
    }

    try {
      const pyodide = await pyodideReadyPromise;

      const pythonWrapper = `
import sys, io
_buffer = io.StringIO()
_old_stdout = sys.stdout
sys.stdout = _buffer
try:
    exec(${JSON.stringify(codigoUsuario)}, {})
finally:
    sys.stdout = _old_stdout
_output = _buffer.getvalue()
`;
      await pyodide.runPythonAsync(pythonWrapper);
      let salidaPython = pyodide.runPython("_output");
      salidaPython = (salidaPython || "").trim();

      const respuestaEsperada = problemas.getRespuestaActual().trim();
      const esCorrecta = normalizar(salidaPython) === normalizar(respuestaEsperada);

      if (esCorrecta) {
        salida.textContent = "Respuesta correcta\n";

        const tiempo = timer.getSegundos();
        const numErrores = errores;
        const numAyudas = ayudas;
        const nivelActualNum = problemas.getNivelActualNumerico();

        const nuevoNivel = evaluarNivel(tiempo, numErrores, numAyudas, nivelActualNum);

        if (nuevoNivel === problemas.getNivelActual()) {
          problemas.siguienteProblema();
        } else {
          problemas.actualizarNivel(nuevoNivel);
          alert("¡Has cambiado de nivel! Ahora eres " + nuevoNivel + ".");
        }

        textoProblema.value = problemas.getProblemaActual();
        areaCodigo.value = problemas.getCodigoInicial();

        timer.reiniciar();
        errores = 0;
        ayudas = 0;
        ayudasMostradas = 0;
      } else {
        salida.textContent =
          "Respuesta incorrecta\n" +
          "Obtenida:\n" + salidaPython + "\n\n" +
          "Esperada:\n" + respuestaEsperada + "\n\n" +
          "Intenta de nuevo este mismo problema.\n";
        errores++;
      }
    } catch (e) {
      salida.textContent = "Error en ejecución:\n" + e + "\n";
      errores++;
    }
  });

  function mostrarModal(texto) {
  const modal = document.getElementById("modal");
  const contenido = document.getElementById("modal-texto");
  contenido.textContent = texto;
  modal.classList.remove("oculto");
}

document.getElementById("modal-cerrar").onclick = () => {
  document.getElementById("modal").classList.add("oculto");
};


});
