// Definición de la estructura de Tarea
type Tarea = {
  id: number;
  nombre: string;
  completada: boolean;
};

//  inicial de tareas
let tareas: Tarea[] = [
  { id: 1, nombre: "Estudiar JavaScript", completada: false },
  { id: 2, nombre: "Practicar TypeScript", completada: false },
  { id: 3, nombre: "Hacer ejercicios", completada: false },
];

// Función flecha para .map()
const cambiarEstadoTarea = (lista: Tarea[], id: number): Tarea[] => {
  return lista.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
  );
};

// Función flecha para obtener el estado textual de una tarea usando el operador ternario
const obtenerEstadoTarea = (tarea: Tarea): string => {
  return tarea.completada ? "Completada" : "Pendiente";
};

// Función para agregar una nueva tarea usando el spread operator
const agregarTarea = (lista: Tarea[], nuevaTarea: Tarea): Tarea[] => {
  return [...lista, nuevaTarea];
};

// Función para mostrar la lista de tareas en el DOM
const mostrarTareas = (lista: Tarea[]): void => {
  const taskListElement = document.getElementById("task-list");
  if (taskListElement) {
    taskListElement.innerHTML = ""; // Limpiar el contenido existente
    lista.map((tarea) => {
      const tareaElement = document.createElement("div");
      tareaElement.innerHTML = `
                <span>${tarea.nombre} - ${obtenerEstadoTarea(tarea)}</span>
                <button onclick="toggleTask(${tarea.id})">
                    ${
                      tarea.completada
                        ? "Marcar como Pendiente"
                        : "Marcar como Completada"
                    }
                </button>
            `;
      taskListElement.appendChild(tareaElement);
    });
  }
};

// Función para manejar el cambio de estado de una tarea al hacer clic en el botón
const toggleTask = (id: number): void => {
  tareas = cambiarEstadoTarea(tareas, id);
  mostrarTareas(tareas);
};

// Evento para agregar una nueva tarea desde el formulario
const formElement = document.getElementById("task-form") as HTMLFormElement;
if (formElement) {
  formElement.addEventListener("submit", (event) => {
    event.preventDefault(); // Evitar el envío del formulario
    const taskNameInput = document.getElementById(
      "task-name"
    ) as HTMLInputElement;
    if (taskNameInput.value.trim()) {
      const newTask: Tarea = {
        id: tareas.length + 1,
        nombre: taskNameInput.value,
        completada: false,
      };
      tareas = agregarTarea(tareas, newTask);
      taskNameInput.value = ""; // Limpiar el campo de entrada
      mostrarTareas(tareas);
    }
  });
}

// Inicializar mostrando las tareas iniciales
mostrarTareas(tareas);
