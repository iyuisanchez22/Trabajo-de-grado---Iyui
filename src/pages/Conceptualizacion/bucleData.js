// Datos e información sobre bucles

export const sabiasQue = [
  "Scratch permite repetir acciones, logrando que los personajes hagan movimientos y sonidos.",
];

export const teHazPreguntado = [
  "I. ¿Qué cosas o situaciones se repiten en tu vida cotidiana, una y otra vez?",
  "II. ¿Qué podrías crear en Scratch si tuvieras un bucle que se repite cierta cantidad de veces?",
];

export const buclesData = [
  {
    title: "For",
    description:
      "Se utiliza cuando conocemos de antemano cuántas veces queremos repetir una acción. Incluye una variable de control, una condición y un incremento o decremento.",
    code: `al presionar bandera verde
establecer [i v] a (1)
repetir (5)
    decir (i)
    cambiar [i v] por (1)
fin`,
    codeDescription:
      "Recorrer una lista de estudiantes para imprimir sus nombres.",
  },
  {
    title: "While",
    description:
      "Repite instrucciones mientras se cumpla una condición lógica. Se usa cuando no sabemos cuántas veces se ejecutará el bucle.",
    code: `al presionar bandera verde
repetir hasta <tocando borde>
    moverr (10) pasos
fin
decir "¡Llegué al borde!"`,
    codeDescription:
      "Pedir una contraseña hasta que el usuario la escriba correctamente.",
  },
  {
    title: "Do-While",
    description:
      "Similar al while, pero la condición se evalúa después de ejecutar el bloque. Garantiza al menos una ejecución.",
    code: `al presionar bandera verde
mover (10) pasos
repetir hasta <tocando borde>
    mover (10) pasos
fin
decir "¡Llegué!"`,
    codeDescription:
      'Mostrar un menú al menos una vez y repetir mientras el usuario no elija "Salir".',
  },
];
