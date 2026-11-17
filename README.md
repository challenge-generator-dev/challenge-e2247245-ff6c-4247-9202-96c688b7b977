# Implementación de CRUD de ordenes en DynamoDB con API REST

El sistema debe permitir la creación, lectura, actualización y eliminación de ordenes en una tabla DynamoDB. Las ordenes tienen un campo status con los valores pending, paid y shipped. El sistema debe usar AWS SDK v3 para interactuar con DynamoDB y no debe utilizar ORMs como Dynamoose.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | CRUD de ordenes sobre DynamoDB |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración inicial y creación de la tabla DynamoDB

**Objetivo:** Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las ordenes.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto con Express y AWS SDK v3.
- Crear la tabla DynamoDB con los atributos necesarios para las ordenes.

**Entregable:** Proyecto configurado con Express y AWS SDK v3, y tabla DynamoDB creada.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.

</details>

### Fase 2: Implementación de operaciones CRUD

**Objetivo:** Implementar las operaciones CRUD para las ordenes en la tabla DynamoDB.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementar las rutas y controladores para crear, leer, actualizar y eliminar ordenes.
- Asegurar que las operaciones CRUD interactúen correctamente con DynamoDB usando AWS SDK v3.

**Entregable:** Operaciones CRUD implementadas y funcionando correctamente con DynamoDB.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de AWS SDK v3 para interactuar con DynamoDB.

</details>

### Fase 3: Pruebas y validación

**Objetivo:** Realizar pruebas y validación de las operaciones CRUD implementadas.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Escribir pruebas unitarias y de integración para las operaciones CRUD.
- Validar que las operaciones CRUD funcionan correctamente y cumplen con las restricciones del solicitante.

**Entregable:** Pruebas unitarias y de integración escritas y ejecutadas, validando el funcionamiento correcto de las operaciones CRUD.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para la configuración de la infraestructura.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una operación CRUD y cómo se implementa en este contexto?
- **paraQueSirve**: ¿Para qué sirve cada operación CRUD en el dominio de las ordenes?
- **comoSeUsa**: ¿Cómo se usa AWS SDK v3 para interactuar con DynamoDB en este reto?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD con DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de operaciones CRUD con DynamoDB y cómo se justifican?

## Criterios de Evaluacion

- Configuración correcta del proyecto con Express y AWS SDK v3.
- Creación correcta de la tabla DynamoDB con los atributos necesarios.
- Implementación correcta de las operaciones CRUD para las ordenes.
- Uso correcto de AWS SDK v3 para interactuar con DynamoDB.
- Manejo correcto de los errores comunes al implementar operaciones CRUD con DynamoDB.
- Escritura y ejecución de pruebas unitarias y de integración para validar las operaciones CRUD.
- Cumplimiento de las restricciones del solicitante en la implementación de las operaciones CRUD.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración inicial y creación de la tabla DynamoDB | Definición de recursos de infraestructura con Terraform | — | Proyecto configurado con Express y AWS SDK v3; Tabla DynamoDB creada con la estructura correcta para ordenes; Configuración de Terraform para provisionar la tabla DynamoDB; Validación de que la tabla no existe previamente (manejo de error) | — | — |
| f1 — Configuración inicial y creación de la tabla DynamoDB | Configuración de cliente DynamoDB con AWS SDK v3 | — | Proyecto configurado con Express y AWS SDK v3; Tabla DynamoDB creada con la estructura correcta para ordenes; Configuración de Terraform para provisionar la tabla DynamoDB; Validación de que la tabla no existe previamente (manejo de error) | — | — |
| f2 — Implementación de operaciones CRUD | Implementación de operaciones CRUD con DynamoDB | `app/src/infrastructure/repositories/DynamoDBOrderRepository.ts:OrderRepository` | Operaciones CRUD implementadas y funcionando con DynamoDB; Validación de campos obligatorios y status válido; Manejo de errores para recursos no encontrados | — | — |
| f2 — Implementación de operaciones CRUD | Adaptador para operaciones DynamoDB | `app/src/infrastructure/repositories/DynamoDBOrderRepository.ts:DynamoDBOrderAdapter` | Operaciones CRUD implementadas y funcionando con DynamoDB; Validación de campos obligatorios y status válido; Manejo de errores para recursos no encontrados | — | — |
| f2 — Implementación de operaciones CRUD | Controlador REST para operaciones CRUD | `app/src/domain/services/OrderService.ts:OrderController` | Operaciones CRUD implementadas y funcionando con DynamoDB; Validación de campos obligatorios y status válido; Manejo de errores para recursos no encontrados | — | — |
| f3 — Pruebas y validación | Pruebas unitarias para OrderRepository | — | Pruebas unitarias escritas para validar lógica de negocio; Pruebas de integración para validar interacción con DynamoDB; Pruebas de error para casos de borde (status inválido, orden no encontrada) | — | — |
| f3 — Pruebas y validación | Pruebas de integración para OrderController | — | Pruebas unitarias escritas para validar lógica de negocio; Pruebas de integración para validar interacción con DynamoDB; Pruebas de error para casos de borde (status inválido, orden no encontrada) | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar AWS SDK v3 (@aws-sdk/client-dynamodb) para hablar con DynamoDB | chequeo estatico (code): exige `@aws-sdk/client-dynamodb` | Verificada |
| No usar Dynamoose ni otro ORM para DynamoDB | chequeo estatico (code): prohibe `dynamoose`, `Dynamoose` | Verificada |
| Las ordenes tienen un campo status con los valores pending, paid y shipped; las pruebas de aceptacion los verifican | sin ubicar | Restriccion no verificada en sin ubicar |

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `app` | `app/` | practice, chapter | server | Node | Express, DynamoDB |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd app && npm install --no-audit --no-fund && npm run build` — componente `app` (practice, chapter).

### Contratos entre componentes

- `app` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
