// Assets
import imgLibro from "../../assets/img/libro.png";
import imgGalleta from "../../assets/img/galleta.png";
import imgDiente from "../../assets/img/diente.png";

export const exampleData = [
  {
    explain:
      "¡Un repaso rápido de los bucles que vimos! Recordemos cómo funciona, qué los diferencia y en qué situaciones conviene usarlos",
    title: "Bucle For",
    img: imgLibro,
    example: `Imagina que decides ler un libro de 5 páginas. el bucle for seria como decir: "Voy a leer desde la pagina 1 hasta la 5"`,
    code: `establecer pagina a 1
repetir (5)
    decir (unir "Estoy leyendo la pagina " pagina)
    cambiar pagina por (1)`,
  },
  {
    explain:
      "Ahora veremos este bucle que también funciona de una forma distinta, con un estilo propio que lo hace único dentro de la programación",
    title: "Bucle While",
    img: imgGalleta,
    example:
      "Imagina que tienes una caja llena de galletas y decides comerlas mientras haya galletas disponibles.",
    code: `establecer galletas a 5
repetir hasta que <galletas = 0>
    decir (unir "Me como una galleta, quedan " (galletas - 1))
    cambiar galletas por (-1)
decir ("¡La caja está vacía!")`,
  },
  {
    explain:
      "¿Has comprendido? Ahora pasemos a un nivel más avanzado, esto nos permitirá entender mejor su potencial",
    title: "Bucle Do-While",
    img: imgDiente,
    example:
      "El personaje se lava los dientes al menos una vez y sigue hacíendolo hasta que estén limpios.",
    code: `al presionar bandera verde:
    establecer dientesLimpios = falso
    repetir hasta que <dientesLimpios = verdadero>
        decir ("Me lavo los dientes")
        esperar 1 segundo
        cambiar dientesLimpios a verdadero (simulación de que los dientes están limpios)
    decir ("¡Mis dientes están limpios!")`,
  },
];
