# 📦 React + TypeScript Mini-Projects

Colección de miniproyectos construidos con **React**, **TypeScript** y **Vite**.

---

### 1. `DataTable<T>` — Tabla genérica con edición inline

**Archivo:** `src/components/DataTable.tsx`

Componente React genérico que renderiza una tabla a partir de cualquier array de datos tipado. Soporta edición de filas directamente desde la interfaz.

**Características:**
- Tipado genérico con `T extends { id: string }`, lo que garantiza que las columnas solo referencian claves válidas del modelo.
- Estado de edición por fila con `useState`, usando `Partial<T>` para actualizaciones progresivas y seguras.
- Botones de acción por fila: *Editar*, *Guardar* y *Cancelar*.

**Uso básico:**
```tsx
<DataTable
  datos={[{ id: "1", nombre: "Ana", edad: "30" }]}
  columnas={[
    { cabecera: "Nombre", clave: "nombre" },
    { cabecera: "Edad", clave: "edad" },
  ]}
/>
```

---

### 2. `diferenciaEnDias` — Utilidad de fechas

**Archivo:** `src/utils/diferenciaEnDias.ts`

Función utilitaria que calcula la diferencia en días entre dos fechas usando la librería [`date-fns`](https://date-fns.org/).

**Signatura:**
```ts
diferenciaEnDias(fechaInicio: Date, fechaFin: Date): number
```

**Ejemplo:**
```ts
import { diferenciaEnDias } from "./utils/diferenciaEnDias";

const dias = diferenciaEnDias(new Date("2024-01-01"), new Date("2024-03-01"));
console.log(dias); // 60
```

**Ventaja sobre JavaScript puro:** solo acepta objetos `Date` válidos; pasar strings u otros tipos provoca error en compilación, no en ejecución.

---

## 🏗️ Conceptos TypeScript demostrados

| Concepto | Dónde se aplica |
|---|---|
| **Genéricos** (`<T>`) | `DataTable<T>` — columnas tipadas sobre el modelo |
| **`keyof T`** | Garantiza que las claves de columna existen en el tipo |
| **`Partial<T>`** | Estado temporal de edición sin requerir todos los campos |
| **Uniones discriminadas** | `EstadoMatricula` con campo `tipo` como discriminante |
| **Tipo `never`** | Detección de ramas no cubiertas en `switch` exhaustivo |
| **Librerías tipadas** | `date-fns` con entradas y salidas verificadas en compilación |

Para una explicación detallada, ver [`docs/arquitectura-final.md`](./docs/arquitectura-final.md).

---

## 🛠️ Stack tecnológico

- [React](https://react.dev/) 
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [date-fns](https://date-fns.org/)
- ESLint

