# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de CRUD de ordenes en DynamoDB con API REST**.

| | |
|---|---|
| Tema | CRUD de ordenes sobre DynamoDB |
| Nivel | advanced-l2 |
| Chapter | Backend |
| Especialidad | Node |
| Stack | TypeScript / Express 4.21 |
| Patron arquitectonico | capas estándar (dominio, aplicación, infraestructura) |
| Tiempo estimado | 8 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`
- `Express como framework (vinculante: no mezcles otro framework del mismo ecosistema)`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @aws-sdk/client-dynamodb 3.1170.0
- @aws-sdk/lib-dynamodb 3.1170.0
- @types/supertest 7.2.1
- class-transformer 0.5.1
- class-validator 0.15.1
- express 4.22.3
- reflect-metadata 0.2.2
- ts-node 10.9.2
- @types/express 4.17.25
- @types/node 22.20.5
- typescript 5.7.3
- jest 29.7.0
- ts-jest 29.2.5
- @types/jest 29.5.14

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial y creación de la tabla DynamoDB**: Proyecto configurado con Express y AWS SDK v3, y tabla DynamoDB creada.
- **Fase 2 — Implementación de operaciones CRUD**: Operaciones CRUD implementadas y funcionando correctamente con DynamoDB.
- **Fase 3 — Pruebas y validación**: Pruebas unitarias y de integración escritas y ejecutadas, validando el funcionamiento correcto de las operaciones CRUD.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `app/src/infrastructure/repositories/DynamoDBOrderRepository.ts` — La pieza p4 (Implementación de adaptador de persistencia, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `app/src/domain/services/OrderService.ts` — La pieza p5 (Lógica de negocio para ordenes, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

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

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar AWS SDK v3 (@aws-sdk/client-dynamodb) para hablar con DynamoDB | chequeo estatico (code): exige `@aws-sdk/client-dynamodb` | Verificada |
| No usar Dynamoose ni otro ORM para DynamoDB | chequeo estatico (code): prohibe `dynamoose`, `Dynamoose` | Verificada |
| Las ordenes tienen un campo status con los valores pending, paid y shipped; las pruebas de aceptacion los verifican | sin ubicar | Restriccion no verificada en sin ubicar |

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (2 de 20)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `app/src/acceptance/f1.test.ts`
- [ ] `app/src/acceptance/f2.test.ts`

### Presentes (24)

- `app/package.json`
- `app/tsconfig.json`
- `app/src/domain/models/Order.ts`
- `app/src/domain/ports/OrderRepository.port.ts`
- `app/src/interfaces/controllers/OrderController.ts`
- `app/src/infrastructure/repositories/DynamoDBOrderRepository.ts`
- `app/src/domain/services/OrderService.ts`
- `app/src/infrastructure/config/DynamoDBClientConfig.ts`
- `app/src/interfaces/routes/orderRoutes.ts`
- `app/src/app.ts`
- `app/src/main.ts`
- `app/src/tests/unit/OrderService.test.ts`
- `app/src/tests/integration/DynamoDBOrderRepository.test.ts`
- `infra/outputs.tf`
- `infra/variables.tf`
- `infra/versions.tf`
- `infra/providers.tf`
- `infra/modules/dynamodb/main.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/environments/local/main.tf`
- `infra/README.md`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `app` (presente)
- `app/src/domain/models` (presente)
- `app/src/domain/ports` (presente)
- `app/src/domain/services` (presente)
- `app/src/infrastructure/repositories` (presente)
- `app/src/infrastructure/config` (presente)
- `app/src/interfaces/controllers` (presente)
- `app/src/interfaces/routes` (presente)
- `app/tests/unit` (ausente)
- `app/tests/integration` (ausente)
- `infra` (presente)
- `infra/modules/dynamodb` (presente)
- `infra/environments/local` (presente)

## Verificacion

```bash
(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **capas estándar (dominio, aplicación, infraestructura)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB expuesto por una API REST
- Mision: Persistir y consultar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
