// Definicion de Variables
let rigthAnswer;

let currentQuestionIndex = 0;

let jackpot = 100000;

let timeInterval;

let time = 10;

let user;

// Definicion de Matrices de pregutnas segun un Nivel
const veryeasy = [
  {
    question: "¿Cuál es el nombre del río más largo del mundo?",
    answers: ["Río Amazonas", "Río Nilo", "Río Danubio", "Río Senna"],
  },
  {
    question: "¿Cuándo terminó la II Guerra Mundial?",
    answers: ["1945", "1947", "1943", "1942"],
  },
  {
    question: "¿Quién escribió La Odisea?",
    answers: ["Homero", "Virgilio", "Cervantes", "Odiseo"],
  },
  {
    question: "¿Cómo se denomina al resultado de una multiplicación?",
    answers: ["Producto", "Múltiplo", "Resultado", "Divisor"],
  },
  {
    question: "¿Cuántas patas tiene una araña?",
    answers: ["8", "6", "10", "12"],
  },
];

const easy = [
  {
    question: "¿Cuál es el país más poblado de la tierra?",
    answers: ["China", "Estados Unidos", "Rusia", "Europa"],
  },
  {
    question: "¿En qué año llegó Cristóbal Colón a América?",
    answers: ["1492", "1429", "1592", "1427"],
  },
  {
    question: "¿Cuál es la obra más importante de la literatura en español?",
    answers: [
      "Don Quijote de la Mancha",
      "El Principito",
      "Cien años de soledad",
      "El coronel no tiene quien le escriba",
    ],
  },
  {
    question: "¿A cuánto equivale el numero Pi?",
    answers: ["3.1416", "3.1614", "3.1415", "3.416"],
  },
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    answers: ["Guepardo", "Cóndor", "Leopardo", "Tigre"],
  },
];

const medium = [
  {
    question: "¿Cuál es la ciudad de los rascacielos?",
    answers: ["New York", "Tokio", "Hong Kong", "Dubái"],
  },
  {
    question: "¿Quién es el padre del psicoanálisis?",
    answers: ["Sigmund Freud", "Carl Gustav Jung", "Skinner", "Sócrates"],
  },
  {
    question: "¿Cómo se llama el Himno Nacional de Francia?",
    answers: [
      "La Marsellesa",
      "La Internacional",
      "La solitaria",
      "La Triunfante",
    ],
  },
  {
    question: "¿Cuál es el símbolo químico del oro?",
    answers: ["Au", "Or", "Ao", "Pl"],
  },
  {
    question: "¿Cuál es el único mamífero que puede volar?",
    answers: ["Murciélago", "Avestruz", "Águila", "Condor"],
  },
];

const hard = [
  {
    question: "¿En qué país se encuentra ubicada la Casa Rosada?",
    answers: ["Argentina", "Chile", "México", "Colombia"],
  },
  {
    question: "¿Cuál es el idioma más antiguo que pervive en Europa?",
    answers: ["Vasco", "Inglés", "Francés", "Hebreo"],
  },
  {
    question: "¿A qué se denomina séptimo arte?",
    answers: ["Cine", "Pintura", "Escultura", "Música"],
  },
  {
    question: "¿Qué es el cobalto?",
    answers: ["Un mineral", "Un vegetal", "Un catalizador", "Un sustrato"],
  },
  {
    question: "¿Cuál es el ave voladora más grande del mundo?",
    answers: ["Condor Andino", "Águila real", "Halcón", "Águila Arpía"],
  },
];

const veryhard = [
  {
    question: "¿Cuál es la única ciudad que está en dos continentes distintos?",
    answers: ["Estambul", "Moscú", "Egipto", "Berlín"],
  },
  {
    question:
      "¿De qué año es la primera constitución española conocida como «La Pepa»?",
    answers: ["1812", "1835", "1978", "1811"],
  },
  {
    question:
      "¿Cómo se llama la estrofa poética que está conformada por 10 versos de 8 sílabas cada uno?",
    answers: [
      "Décima espinela",
      "Decasílabo",
      "Decasílabo octogonal",
      "Decima silaba",
    ],
  },
  {
    question: "¿Qué se le agrega al hierro para hacer acero?",
    answers: ["Carbono", "Estaño", "Cobre", "Bronce"],
  },
  {
    question: "¿Cuántos corazones tienen los pulpos?",
    answers: ["3", "Ninguno", "2", "1"],
  },
];

// Crearmos el Cuestionario completo
const questionnaire = [veryeasy, easy, medium, hard, veryhard];

// Funcion para imprimir la pregunta
const printQuestion = (k) => {
  let level = questionnaire[currentQuestionIndex];

  const q = level[k];

  let ans = q.answers;

  // Respuesta Correcta
  rigthAnswer = ans[0];

  // Mezclamos el orden de las respuestas
  ans = ans.sort((a, b) => Math.floor(Math.random() * 3) - 1);

  // Creacion de las respuestas
  const htmlAnswersArray = ans.map(
    (currentA) =>
      `<p class="answer"><button onClick="evaluateAnswer('${currentA}', this)">◉</button> <span>${currentA}</span></p>`
  );
  // Convertimos el array en una cadena de texto
  const htmlAnswers = htmlAnswersArray.join(" ");

  let htmlQuestion = `<p>${q.question}</p><div>${htmlAnswers}</div>`;
  document.querySelector(".question").innerHTML = htmlQuestion;

  // Creamos el tiempo del Temporizador y la opcion de perder por tiempo y se da por finalizado el juego
  time = 10;
  document.querySelector(".time").innerHTML = time;
  clearInterval(timeInterval);

  timeInterval = setInterval(() => {
    time--;
    if (time == 0) {
      alert("Has perdido, no has ganado nada");
      clearInterval(timeInterval);
      document.querySelector(".questionnaire").style.display = "none";
      jackpot = 0;
      gameHistory(user, jackpot, currentQuestionIndex);
    } else {
      document.querySelector(".time").innerHTML = time;
    }
  }, 1000);

  currentQuestionIndex++;
};

// Funcion para evaluar la respuesta correcta
const evaluateAnswer = (answer, obj) => {
  document
    .querySelectorAll(".answer")
    .forEach((a) => a.classList.remove("rigth", "wrong"));

  const parentP = obj.parentNode;
  // Verificamos la repuesta y aumentamos la recompensa
  if (answer == rigthAnswer) {
    if (currentQuestionIndex > 1) {
      jackpot = jackpot * 2;
    }
    parentP.classList.add("rigth");
    document.querySelector(".rigthCounter").innerHTML = jackpot;
    clearInterval(timeInterval);
    // Restablecemos el valor del acumulado a 0 y se da por finalizado el juego
  } else {
    parentP.classList.add("wrong");
    document.querySelector(".rigthCounter").innerHTML = 0;
    alert("Has perdido, no has ganado nada");
    clearInterval(timeInterval);
    jackpot = 0;
    document.querySelector(".questionnaire").style.display = "none";
    gameHistory(user, jackpot, currentQuestionIndex);
  }

  // Validacion que el jugaddor responde por completo las respuestas y se lleva el acumulado, el juego finaliza
  if (jackpot === 1600000) {
    alert("Felicitaciones Ganaste el Juego! Tu Premio es de: $" + jackpot);
    document.querySelector(".questionnaire").style.display = "none";
    gameHistory(user, jackpot, currentQuestionIndex);
  }
};

// Funcion para cuando el jugador decide retirarse y finaliza el juego
const finishTest = (_) => {
  alert("Te retiraste tu Premio Acumulado es: $" + jackpot);
  clearInterval(timeInterval);
  document.querySelector(".questionnaire").style.display = "none";
  gameHistory(user, jackpot, currentQuestionIndex);
};

// Funcion para empezar el juego
const startTest = (_) => {
  printQuestion(Math.floor(Math.random() * questionnaire.length));
  document.querySelector(".btnStart").style.display = "none";
  document.querySelector(".questionnaire").style.display = "block";
  document.querySelector(".user").style.display = "none";
  document.querySelector(".btnHistory").style.display = "none";
  user = document.querySelector("#nombre_id").value;
};

// Almacenamiento de informacion
const gameHistory = (user, jackpot, level) => {
  const history = JSON.parse(localStorage.getItem("Reto"));
  const data = {
    user,
    jackpot,
    level,
  };
  const matrizHistory = [];
  if (history !== null) {
    history.push(data);
    localStorage.setItem("Reto", JSON.stringify(history));
  } else {
    matrizHistory.push(data);
    localStorage.setItem("Reto", JSON.stringify(matrizHistory));
  }
};

// Funcion para imprimir el Historial
const printHistory = () => {
  document.querySelector(".btnStart").style.display = "none";
  const history = JSON.parse(localStorage.getItem("Reto"));
  let historic = history.map(function (data) {
    return "<li>" + data.user + " " + data.jackpot + " " + data.level + "</li>";
  });
  let printHistoric = historic.join(" ");
  document.querySelector("div").innerHTML = printHistoric;
};
