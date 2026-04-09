import { DataTable } from "./components/DataTable";

interface Estudiante {
  id: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  email: string;
}

const estudiantes: Estudiante[] = [
  { id: "1", nombreCompleto: "Pablo Pérez", fechaNacimiento: "1991-01-15", email: "pabloP@gmail.com" },
  { id: "2", nombreCompleto: "Vicenta Garrido", fechaNacimiento: "1999-05-20", email: "vicentaG@gmail.com" },
  { id: "3", nombreCompleto: "Carlos García", fechaNacimiento: "2002-03-10", email: "carlosG@gmail.com" },
];

const columnas = [
  { cabecera: "Nombre", clave: "nombreCompleto" as const },
  { cabecera: "Fecha de nacimiento", clave: "fechaNacimiento" as const },
  { cabecera: "Email", clave: "email" as const },
];

function App() {
  return (
    <div>
      <h1>Sistema universitario</h1>
      <DataTable<Estudiante> datos={estudiantes} columnas={columnas} />
    </div>
  );
}

export default App;