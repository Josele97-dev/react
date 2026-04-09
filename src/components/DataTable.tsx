import { useState } from "react";

interface Columna<T> {
  cabecera: string;
  clave: keyof T;
}

interface DataTableProps<T> {
  datos: T[];
  columnas: Columna<T>[];
}

export function DataTable<T extends { id: string }>({
  datos,
  columnas,
}: DataTableProps<T>) {
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [tempFila, setTempFila] = useState<Partial<T>>({});

  const empezarEdicion = (fila: T) => {
    setEditandoId(fila.id);
    setTempFila(fila);
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setTempFila({});
  };

  const guardar = () => {
    console.log("Fila guardada:", tempFila);
    setEditandoId(null);
    setTempFila({});
  };

  const actualizarCampo = (clave: keyof T, valor: string) => {
    setTempFila((prev) => ({
      ...prev,
      [clave]: valor,
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          {columnas.map((col) => (
            <th key={String(col.clave)}>{col.cabecera}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {datos.map((fila) => {
          const estaEditando = editandoId === fila.id;

          return (
            <tr key={fila.id}>
              {columnas.map((col) => (
                <td key={String(col.clave)}>
                  {estaEditando ? (
                    <input
                      value={(tempFila[col.clave] as string) ?? ""}
                      onChange={(e) =>
                        actualizarCampo(col.clave, e.target.value)
                      }
                    />
                  ) : (
                    String(fila[col.clave])
                  )}
                </td>
              ))}

              <td>
                {estaEditando ? (
                  <>
                    <button onClick={guardar}>Guardar</button>
                    <button onClick={cancelarEdicion}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={() => empezarEdicion(fila)}>Editar</button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
