// === CARGA DE PYODIDE ===
let pyodideReady = loadPyodide({
  indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.0/full/"
});

// === TEMPORIZADOR ===
class Temporizador {
  constructor(cb) {
    this.seg = 0;
    this.id = null;
    this.cb = cb;
  }
  iniciar() {
    if (this.id) return;
    this.id = setInterval(() => {
      this.seg++;
      let m = Math.floor(this.seg / 60);
      let s = this.seg % 60;
      this.cb(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    }, 1000);
  }
  detener() {
    clearInterval(this.id);
    this.id = null;
  }
  reiniciar() {
    this.detener();
    this.seg = 0;
    this.cb("00:00");
    this.iniciar();
  }
  getSegundos() {
    return this.seg;
  }
}

// === PROBLEMAS ===
class Problemas {
  constructor() {
    this.niv = "NOVATO";
    this.i = 0;

    // === PROBLEMAS ===
    this.p = {
      NOVATO: [
        "Problema 1: Imprime 'Hola mundo'.\n\nSalida esperada:\nHola mundo",
        "Problema 2: Suma 10 + 15 + 25 y muestra el resultado.\n\nSalida esperada:\n50",
        "Problema 3: Calcula y muestra el cuadrado de 3.\n\nSalida esperada:\n9",
        "Problema 4: Muestra la suma de los elementos de la lista [2, 4, 6].\n\nSalida esperada:\n12",
        "Problema 5: Muestra el resultado de 8 * 3.\n\nSalida esperada:\n24",
        "Problema 6: Muestra la última letra de la cadena 'Python'.\n\nSalida esperada:\nn"
      ],
      INTERMEDIO: [
        "Problema 1: Determina si el número 7 es primo.\n\nSalida esperada:\nEs primo",
        "Problema 2: Crea una función que invierta la cadena 'Python'.\n\nSalida esperada:\nnohtyP",
        "Problema 3: Calcula la suma de los números pares del 1 al 100.\n\nSalida esperada:\n2550",
        "Problema 4: Muestra los números del 1 al 5 usando un ciclo for.\n\nSalida esperada:\n1, 2, 3, 4, 5",
        "Problema 5: Calcula el cubo de cada número en la lista [1, 2, 3, 4].\n\nSalida esperada:\n[1, 8, 27, 64]",
        "Problema 6: Determina cuántos elementos de [1,3,5,7,9] son mayores que 4.\n\nSalida esperada:\n3 elementos"
      ],
      AVANZADO: [
        "Problema 1: Calcula el factorial de 5 usando recursión.\n\nSalida esperada:\n120",
        "Problema 2: Cuenta cuántas vocales tiene 'Programacion'.\n\nSalida esperada:\n5",
        "Problema 3: Elimina duplicados de [1,2,2,3,3,3,4].\n\nSalida esperada:\n[1, 2, 3, 4]",
        "Problema 4: Usa recursión para sumar [1,2,3,4,5].\n\nSalida esperada:\n15",
        "Problema 5: Suma los valores del diccionario {'a':1,'b':2,'c':3}.\n\nSalida esperada:\n6",
        "Problema 6: Ordena la lista [9,1,4,2,7].\n\nSalida esperada:\n[1, 2, 4, 7, 9]"
      ]
    };

    // === RESPUESTAS ===
    this.r = {
      NOVATO: ["Hola mundo", "50", "9", "12", "24", "n"],
      INTERMEDIO: [
        "Es primo",
        "nohtyP",
        "2550",
        "1, 2, 3, 4, 5",
        "[1, 8, 27, 64]",
        "3 elementos"
      ],
      AVANZADO: ["120", "5", "[1, 2, 3, 4]", "15", "6", "[1, 2, 4, 7, 9]"]
    };

    // === PISTAS ===
    this.h = {
      NOVATO: [
        ["'Hola mundo' es string.", "Usa print().", "Usa comillas."],
        ["Usa '+'.", "Suma dentro de print().", "No uses comillas."],
        ["Usa 3*3.", "Guarda en variable.", "Imprime la variable."],
        ["Crea lista [2,4,6].", "Usa sum(lista).", "Imprime suma."],
        ["Multiplica 8*3.", "Usa print().", "Sin comillas."],
        ["cadena='Python'", "Indexa con [-1].", "print(cadena[-1])."]
      ],
      INTERMEDIO: [
        ["Un primo tiene 2 divisores.", "Prueba divisores.", "Si divide → no es primo."],
        ["Usa slicing.", "cadena[::-1].", "Devuelve resultado."],
        ["Pares: divisible entre 2.", "range(2,101,2).", "sum(...)"],
        ["for con range(1,6).", "Imprime cada número.", "Debe llegar a 5."],
        ["n**3.", "Recorre lista.", "Guarda en nueva lista."],
        ["Compara >4.", "Cuenta coincidencias.", "Imprime total."]
      ],
      AVANZADO: [
        ["Recursión: n*f(n-1).", "Caso base: 1.", "Llama factorial(5)."],
        ["Convierte a minúsculas.", "Cuenta si c in 'aeiou'.", "Incrementa contador."],
        ["Usa set().", "Convierte a lista.", "Ordénala."],
        ["Caso base lista vacía.", "lista[0] + rec(lista[1:]).", "Suma acumulada."],
        ["dict.values().", "Usa sum().", "Imprime resultado."],
        ["sorted(lista).", "Imprime lista.", "Sin comas extras."]
      ]
    };

    // === CÓDIGO INICIAL ===
    this.init = {
      NOVATO: ["", "", "", "lista=[2,4,6]\n", "", "cadena='Python'\n"],
      INTERMEDIO: [
        "n=7\n",
        "cadena='Python'\n",
        "",
        "",
        "lista=[1,2,3,4]\n",
        "lista=[1,3,5,7,9]\n"
      ],
      AVANZADO: [
        "",
        "palabra='Programacion'\ncontador=0\n",
        "numeros=[1,2,2,3,3,3,4]\n",
        "",
        "",
        ""
      ]
    };

    // Construcción de índices aleatorios
    const MAX = 3;
    this.indices = {
      NOVATO: this.randomIndices("NOVATO", MAX),
      INTERMEDIO: this.randomIndices("INTERMEDIO", MAX),
      AVANZADO: this.randomIndices("AVANZADO", MAX)
    };
  }

  randomIndices(niv, max) {
    const total = this.p[niv].length;
    let arr = Array.from({ length: total }, (_, i) => i);
    for (let i = total - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, Math.min(max, total));
  }

  idx() {
    return this.indices[this.niv][this.i];
  }

  act() {
    return this.p[this.niv][this.idx()];
  }
  resp() {
    return this.r[this.niv][this.idx()];
  }
  pistas() {
    return this.h[this.niv][this.idx()];
  }
  code() {
    return this.init[this.niv][this.idx()] || "";
  }

  sig() {
    this.i++;
    if (this.i >= this.indices[this.niv].length) {
      this.i = 0;
    }
  }

  cambiar(n) {
    this.niv = n;
    this.i = 0;
  }

  numNivel() {
    return this.niv === "NOVATO" ? 1 : this.niv === "INTERMEDIO" ? 2 : 3;
  }

  total() {
    return this.indices[this.niv].length;
  }
}

// === NORMALIZAR ===
function normalizar(s) {
  return s.replace(/\s+/g, " ").replace(/\s*,\s*/g, ",").trim();
}

// === EVALUADOR ===
function evaluar(t, e, a, n) {
  const penal = e + a;
  if (t < 120 && penal <= 1 && n < 3) return n + 1;
  return n;
}
