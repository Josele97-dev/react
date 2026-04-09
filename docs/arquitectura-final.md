# Arquitectura Final del Proyecto

Este proyecto demuestra cómo TypeScript reduce errores en tiempo de ejecución gracias al uso de **genéricos**, **uniones discriminadas**, el tipo **`never`** y **tipos de utilidad**. A continuación se explica de forma breve y clara cómo cada uno aporta seguridad respecto a JavaScript estándar.

---

## 1. Genéricos: seguridad al reutilizar componentes

El componente `DataTable<T>` usa genéricos para adaptarse a cualquier tipo de dato:

```ts
export function DataTable<T extends { id: string }>(...)
```

Ventajas:

- Las columnas solo pueden usar claves válidas de T (`keyof T`).
- Si el modelo cambia, el compilador detecta errores automáticamente.
- Evita accesos a propiedades inexistentes.

En JavaScript: errores como `fila.nombrCompleto` solo aparecen al ejecutar.

---

## 2. Uniones discriminadas: estados imposibles eliminados desde el compilador

El proyecto utiliza una unión discriminada para representar el estado de una matrícula:

```ts
type EstadoMatricula =
  | { tipo: "ACTIVA"; asignaturas: Asignatura[] }
  | { tipo: "SUSPENDIDA"; motivoSuspension: string }
  | { tipo: "FINALIZADA"; mediaFinal: number };
```

Cada variante tiene un campo común (`tipo`) con un literal único.  
Esto permite que TypeScript sepa exactamente qué propiedades existen en cada caso.

La función `generarReporte` aprovecha esta estructura:

```ts
switch (estado.tipo) {
  case "ACTIVA":
    return `Matrícula activa con ${estado.asignaturas.length} asignaturas`;
  case "SUSPENDIDA":
    return `Matrícula suspendida. Motivo: ${estado.motivoSuspension}`;
  case "FINALIZADA":
    return `Matrícula finalizada con una nota media de ${estado.mediaFinal}`;
  default:
    const _exhaustive: never = estado;
    throw new Error(`Estado no manejado: ${_exhaustive}`);
}
```

Ventajas:

- Si mañana se añade un nuevo estado (por ejemplo `"ANULADA"`), el compilador obliga a actualizar el `switch`.
- No es posible acceder a propiedades que no existen en ese estado.
- El uso de `never` garantiza que no quedan ramas sin cubrir.

En JavaScript, un estado mal escrito o no contemplado provocaría errores solo en tiempo de ejecución.  
Con TypeScript, esos errores se detectan antes de ejecutar el programa.

---

## 3. Tipo `never`: detección de claves imposibles

TypeScript genera `never` cuando detecta un caso imposible, por ejemplo:

```ts
tempFila[col.clave]
```

Si `col.clave` no pertenece a `keyof T`, el tipo pasa a ser `never` y el compilador marca error.

Ventaja: evita columnas mal escritas o propiedades inexistentes.

En JavaScript: el error aparece solo en runtime.

---

## 4. Tipos de utilidad: `Partial<T>` para edición segura

El estado temporal usa:

```ts
Partial<T>
```

Ventajas:

- Permite editar campos de forma progresiva.
- Evita errores por propiedades opcionales.
- No obliga a tener todos los campos definidos.

En JavaScript: acceder a propiedades inexistentes devuelve `undefined` sin avisar.

---

## 5. Librerías externas tipadas

La función utilitaria con date-fns:

```ts
diferenciaEnDias(fechaInicio: Date, fechaFin: Date): number
```

Ventajas:

- Solo acepta fechas válidas.
- Garantiza que la salida es un número.

En JavaScript: pasar strings o valores inválidos provoca errores en ejecución.

---

## 6. Conclusión

TypeScript reduce errores en tiempo de ejecución al:

- Validar tipos antes de ejecutar.
- Evitar estados imposibles.
- Impedir accesos a propiedades inexistentes.
- Garantizar entradas y salidas correctas en funciones.

El resultado es un proyecto más seguro, mantenible y robusto que su equivalente en JavaScript estándar.
