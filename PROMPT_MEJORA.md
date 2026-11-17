# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `app/src/infrastructure/repositories/DynamoDBOrderRepository.ts` — La pieza p4 (Implementación de adaptador de persistencia, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `app/src/domain/services/OrderService.ts` — La pieza p5 (Lógica de negocio para ordenes, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `app/src/acceptance/f1.test.ts`
- `app/src/acceptance/f2.test.ts`

## Como saber que terminaste

```bash
(cd app && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/local init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/local validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB expuesto por una API REST

### Misión / candidato
Persistir y consultar ordenes

### Reto
- Tema: CRUD de ordenes sobre DynamoDB
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de CRUD de ordenes en DynamoDB con API REST
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de la tabla DynamoDB — objetivo: Configurar el entorno de desarrollo y crear la tabla DynamoDB para almacenar las ordenes. — entregable (NO resolver): Proyecto configurado con Express y AWS SDK v3, y tabla DynamoDB creada.
- Fase 2: Implementación de operaciones CRUD — objetivo: Implementar las operaciones CRUD para las ordenes en la tabla DynamoDB. — entregable (NO resolver): Operaciones CRUD implementadas y funcionando correctamente con DynamoDB.
- Fase 3: Pruebas y validación — objetivo: Realizar pruebas y validación de las operaciones CRUD implementadas. — entregable (NO resolver): Pruebas unitarias y de integración escritas y ejecutadas, validando el funcionamiento correcto de las operaciones CRUD.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: app/package.json ===
{
  "name": "reto-express",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1170.0",
    "@aws-sdk/lib-dynamodb": "3.1170.0",
    "@types/supertest": "7.2.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "4.22.3",
    "reflect-metadata": "0.2.2",
    "ts-node": "10.9.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: app/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.test.ts",
    "src/**/*.spec.ts"
  ]
}

// === ARCHIVO: app/src/domain/models/Order.ts ===
/**
 * Modelo de dominio para Order.
 * Representa una orden con su estado y items asociados.
 */
export type OrderStatus = 'pending' | 'paid' | 'shipped';

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderCreateDTO {
    items: OrderItem[];
}

export interface OrderUpdateDTO {
    status?: OrderStatus;
    items?: OrderItem[];
}

export interface OrderDTO {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}

// === ARCHIVO: app/src/domain/ports/OrderRepository.port.ts ===
/**
 * Puerto (interfaz) para el repositorio de órdenes.
 * Define los métodos que deben implementarse para interactuar con la persistencia.
 */
import { Order, OrderCreateDTO, OrderUpdateDTO } from '../models/Order';

export interface OrderRepository {
    create(order: OrderCreateDTO): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: OrderUpdateDTO): Promise<Order>;
    delete(id: string): Promise<void>;
}

// === ARCHIVO: app/src/interfaces/controllers/OrderController.ts ===
import { Request, Response } from 'express';
import { OrderService } from '../../domain/services/OrderService';
import { OrderCreateDTO, OrderUpdateDTO, OrderDTO, OrderItem } from '../../domain/models/Order';
import { validate } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { OrderStatus } from '../../domain/models/Order';

class OrderItemDTO {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @Min(1)
    quantity!: number;

    @IsNumber()
    @Min(0)
    price!: number;
}

class OrderCreateDTOClass {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items!: OrderItemDTO[];
}

class OrderUpdateDTOClass {
    @IsOptional()
    @IsEnum(['pending', 'paid', 'shipped'])
    status?: OrderStatus;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items?: OrderItemDTO[];
}

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderCreateDTO = plainToInstance(OrderCreateDTOClass, req.body);
            const errors = await validate(orderCreateDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(e => ({ property: e.property, constraints: e.constraints })) });
                return;
            }

            const items: OrderItem[] = orderCreateDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }));

            const orderData: OrderCreateDTO = { items };
            const order = await this.orderService.createOrder(orderData);
            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(201).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrder(id);
            if (!order) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(200).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const orderUpdateDTO = plainToInstance(OrderUpdateDTOClass, req.body);
            const errors = await validate(orderUpdateDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(e => ({ property: e.property, constraints: e.constraints })) });
                return;
            }

            const updateData: OrderUpdateDTO = {};
            if (orderUpdateDTO.status !== undefined) {
                updateData.status = orderUpdateDTO.status;
            }
            if (orderUpdateDTO.items) {
                updateData.items = orderUpdateDTO.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }));
            }

            const order = await this.orderService.updateOrder(id, updateData);
            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(200).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.orderService.deleteOrder(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// === ARCHIVO: app/src/infrastructure/repositories/DynamoDBOrderRepository.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';

export class OrderAlreadyExistsError extends Error {
    constructor(orderId: string) {
        super(`Order with id ${orderId} already exists`);
        this.name = 'OrderAlreadyExistsError';
    }
}

export class OrderNotFoundError extends Error {
    constructor(orderId: string) {
        super(`Order with id ${orderId} not found`);
        this.name = 'OrderNotFoundError';
    }
}

export class InvalidOrderDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidOrderDataError';
    }
}

const VALID_STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped'];

function isValidStatus(status: unknown): status is OrderStatus {
  throw new Error('TODO(reto): isValidStatus');
}

export class DynamoDBOrderRepository implements OrderRepository {
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor(dynamoDBClient: DynamoDBClient, tableName: string = process.env.ORDERS_TABLE || 'orders') {
        this.docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
            marshallOptions: {
                removeUndefinedValues: true,
            },
        });
        this.tableName = tableName;
    }

    private validateOrderData(order: OrderCreateDTO): void {
      throw new Error('TODO(reto): validateOrderData');
    }

    private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
      throw new Error('TODO(reto): validateStatusTransition');
    }

    async create(orderData: OrderCreateDTO): Promise<Order> {
      throw new Error('TODO(reto): create');
    }

    async findById(id: string): Promise<Order | null> {
      throw new Error('TODO(reto): findById');
    }

    async update(id: string, orderUpdate: OrderUpdateDTO): Promise<Order> {
      throw new Error('TODO(reto): update');
    }

    async delete(id: string): Promise<void> {
      throw new Error('TODO(reto): delete');
    }
}

// === ARCHIVO: app/src/domain/services/OrderService.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { OrderRepository } from '../ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../models/Order';

export class InvalidStatusTransitionError extends Error {
    constructor(fromStatus: OrderStatus, toStatus: OrderStatus) {
        super(`Invalid status transition from ${fromStatus} to ${toStatus}`);
        this.name = 'InvalidStatusTransitionError';
    }
}

export class OrderService {
    private readonly repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    async createOrder(orderData: OrderCreateDTO): Promise<Order> {
      throw new Error('TODO(reto): createOrder');
    }

    async getOrder(orderId: string): Promise<Order | null> {
      throw new Error('TODO(reto): getOrder');
    }

    async updateOrder(orderId: string, orderUpdate: OrderUpdateDTO): Promise<Order> {
      throw new Error('TODO(reto): updateOrder');
    }

    async deleteOrder(orderId: string): Promise<void> {
      throw new Error('TODO(reto): deleteOrder');
    }

    async updateStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
      throw new Error('TODO(reto): updateStatus');
    }

    private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
      throw new Error('TODO(reto): validateStatusTransition');
    }
}

// === ARCHIVO: app/src/infrastructure/config/DynamoDBClientConfig.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const isLocal = process.env.LOCAL === 'true';
const region = process.env.AWS_REGION || 'us-east-1';

if (!region) {
    throw new Error('AWS_REGION environment variable is required');
}

const endpoint = isLocal 
    ? 'http://localhost:8000' 
    : `https://dynamodb.${region}.amazonaws.com`;

export const dynamoDBConfig = {
    region,
    endpoint,
    credentials: isLocal
        ? { accessKeyId: 'local', secretAccessKey: 'local' }
        : undefined
};

export const dynamoDBClient = new DynamoDBClient(dynamoDBConfig);

export { DynamoDBClient };

// === ARCHIVO: app/src/interfaces/routes/orderRoutes.ts ===
import { Router, Request, Response, NextFunction } from 'express';
import { OrderController } from '../controllers/OrderController';

/**
 * Definición de rutas HTTP para el recurso Orders.
 * Expone los endpoints REST para crear, leer, actualizar y eliminar órdenes.
 */
const orderRoutes = Router();

/**
 * Crea una nueva orden.
 * POST /orders
 * Request body: OrderCreateDTO
 * Response: OrderDTO (201 Created)
 */
orderRoutes.post(
    '/orders',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.createOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Obtiene una orden por su identificador.
 * GET /orders/:id
 * Response: OrderDTO (200 OK) o 404 si no existe
 */
orderRoutes.get(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.getOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Actualiza una orden existente.
 * PUT /orders/:id
 * Request body: OrderUpdateDTO
 * Response: OrderDTO (200 OK)
 */
orderRoutes.put(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.updateOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Elimina una orden por su identificador.
 * DELETE /orders/:id
 * Response: 204 No Content
 */
orderRoutes.delete(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.deleteOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

export default orderRoutes;

// === ARCHIVO: app/src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import { OrderController } from './interfaces/controllers/OrderController';
import { OrderService } from './domain/services/OrderService';
import { DynamoDBOrderRepository } from './infrastructure/repositories/DynamoDBOrderRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: process.env.AWS_ACCESS_KEY_ID ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    } : undefined,
});

const docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});

const tableName = process.env.ORDERS_TABLE || 'orders';
const orderRepository = new DynamoDBOrderRepository(dynamoDBClient, tableName);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

app.post('/orders', (req: Request, res: Response) => orderController.createOrder(req, res));
app.get('/orders/:id', (req: Request, res: Response) => orderController.getOrder(req, res));
app.put('/orders/:id', (req: Request, res: Response) => orderController.updateOrder(req, res));
app.delete('/orders/:id', (req: Request, res: Response) => orderController.deleteOrder(req, res));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;

// === ARCHIVO: app/src/main.ts ===
import 'reflect-metadata';
import app from './app';
import { createServer } from 'http';

const server = createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`AWS Region: ${process.env.AWS_REGION || 'us-east-1'}`);
    console.log(`DynamoDB Table: ${process.env.ORDERS_TABLE || 'orders'}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

// === ARCHIVO: app/src/tests/unit/OrderService.test.ts ===
import { OrderService } from '../../domain/services/OrderService';
import { OrderRepository } from '../../domain/ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';
import { InvalidStatusTransitionError } from '../../domain/services/OrderService';

describe('OrderService', () => {
    let orderService: OrderService;
    let mockRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<OrderRepository>;
        orderService = new OrderService(mockRepository);
    });

    const createMockOrder = (overrides?: Partial<Order>): Order => ({
        id: 'order-123',
        status: 'pending' as OrderStatus,
        items: [{ productId: 'prod-1', quantity: 2, price: 100 }],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides
    });

    describe('createOrder', () => {
        it('debe crear una orden exitosamente', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            const mockOrder = createMockOrder();
            mockRepository.create.mockResolvedValue(mockOrder);

            const result = await orderService.createOrder(orderData);

            expect(mockRepository.create).toHaveBeenCalledWith(orderData);
            expect(result).toEqual(mockOrder);
        });

        it('debe propagar errores del repositorio', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            mockRepository.create.mockRejectedValue(new Error('DB error'));

            await expect(orderService.createOrder(orderData)).rejects.toThrow('DB error');
        });
    });

    describe('getOrder', () => {
        it('debe retornar una orden por su id', async () => {
            const mockOrder = createMockOrder();
            mockRepository.findById.mockResolvedValue(mockOrder);

            const result = await orderService.getOrder('order-123');

            expect(mockRepository.findById).toHaveBeenCalledWith('order-123');
            expect(result).toEqual(mockOrder);
        });

        it('debe retornar null si la orden no existe', async () => {
            mockRepository.findById.mockResolvedValue(null);

            const result = await orderService.getOrder('non-existent');

            expect(mockRepository.findById).toHaveBeenCalledWith('non-existent');
            expect(result).toBeNull();
        });
    });

    describe('updateOrder', () => {
        it('debe actualizar una orden exitosamente', async () => {
            const updateData: OrderUpdateDTO = { status: 'paid' };
            const mockOrder = createMockOrder({ status: 'paid' });
            mockRepository.update.mockResolvedValue(mockOrder);

            const result = await orderService.updateOrder('order-123', updateData);

            expect(mockRepository.update).toHaveBeenCalledWith('order-123', updateData);
            expect(result.status).toBe('paid');
        });

        it('debe propagar errores del repositorio', async () => {
            const updateData: OrderUpdateDTO = { status: 'paid' };
            mockRepository.update.mockRejectedValue(new Error('Update failed'));

            await expect(orderService.updateOrder('order-123', updateData))
                .rejects.toThrow('Update failed');
        });
    });

    describe('deleteOrder', () => {
        it('debe eliminar una orden exitosamente', async () => {
            mockRepository.delete.mockResolvedValue();

            await orderService.deleteOrder('order-123');

            expect(mockRepository.delete).toHaveBeenCalledWith('order-123');
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.delete.mockRejectedValue(new Error('Delete failed'));

            await expect(orderService.deleteOrder('order-123'))
                .rejects.toThrow('Delete failed');
        });
    });

    describe('updateStatus', () => {
        it('debe actualizar el status de una orden exitosamente', async () => {
            const mockOrder = createMockOrder({ status: 'paid' });
            mockRepository.findById.mockResolvedValue(mockOrder);
            mockRepository.update.mockResolvedValue(mockOrder);

            const result = await orderService.updateStatus('order-123', 'paid');

            expect(mockRepository.update).toHaveBeenCalledWith('order-123', { status: 'paid' });
            expect(result.status).toBe('paid');
        });

        it('debe lanzar error cuando la orden no existe', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(orderService.updateStatus('non-existent', 'paid'))
                .rejects.toThrow();
        });

        it('debe lanzar error en transición de estado inválida', async () => {
            const mockOrder = createMockOrder({ status: 'shipped' });
            mockRepository.findById.mockResolvedValue(mockOrder);

            await expect(orderService.updateStatus('order-123', 'pending'))
                .rejects.toThrow(InvalidStatusTransitionError);
        });
    });

    describe('validateStatusTransition', () => {
        it('debe permitir transición de pending a paid', () => {
            expect(() => {
                orderService['validateStatusTransition']('pending', 'paid');
            }).not.toThrow();
        });

        it('debe permitir transición de paid a shipped', () => {
            expect(() => {
                orderService['validateStatusTransition']('paid', 'shipped');
            }).not.toThrow();
        });

        it('debe lanzar error en transición inválida de pending a shipped', () => {
            expect(() => {
                orderService['validateStatusTransition']('pending', 'shipped');
            }).toThrow(InvalidStatusTransitionError);
        });

        it('debe lanzar error en transición de shipped a cualquier estado', () => {
            expect(() => {
                orderService['validateStatusTransition']('shipped', 'pending');
            }).toThrow(InvalidStatusTransitionError);
            expect(() => {
                orderService['validateStatusTransition']('shipped', 'paid');
            }).toThrow(InvalidStatusTransitionError);
        });
    });
});

// === ARCHIVO: app/src/tests/integration/DynamoDBOrderRepository.test.ts ===
import { DynamoDBOrderRepository } from '../../infrastructure/repositories/DynamoDBOrderRepository';
import { dynamoDBClient } from '../../infrastructure/config/DynamoDBClientConfig';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';
import { OrderAlreadyExistsError, OrderNotFoundError, InvalidOrderDataError } from '../../infrastructure/repositories/DynamoDBOrderRepository';

describe('DynamoDBOrderRepository', () => {
    let repository: DynamoDBOrderRepository;
    let mockDocClient: {
        send: jest.Mock;
    };
    let mockDynamoDBClient: jest.Mocked<typeof dynamoDBClient>;

    beforeEach(() => {
        mockDocClient = {
            send: jest.fn()
        };
        mockDynamoDBClient = {
            send: mockDocClient.send
        } as unknown as jest.Mocked<typeof dynamoDBClient>;
        
        repository = new DynamoDBOrderRepository(mockDynamoDBClient, 'test-orders-table');
    });

    const createMockOrder = (overrides?: Partial<Order>): Order => ({
        id: 'order-123',
        status: 'pending' as OrderStatus,
        items: [{ productId: 'prod-1', quantity: 2, price: 100 }],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides
    });

    describe('create', () => {
        it('debe crear una orden exitosamente', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            const mockOrder = createMockOrder();
            
            mockDocClient.send.mockResolvedValueOnce({});

            const result = await repository.create(orderData);

            expect(mockDocClient.send).toHaveBeenCalled();
            expect(result.items).toEqual(orderData.items);
            expect(result.status).toBe('pending');
        });

        it('debe lanzar error si los items están vacíos', async () => {
            const orderData: OrderCreateDTO = { items: [] };

            await expect(repository.create(orderData)).rejects.toThrow(InvalidOrderDataError);
        });

        it('debe lanzar error si un item tiene cantidad negativa', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: -1, price: 100 }]
            };

            await expect(repository.create(orderData)).rejects.toThrow(InvalidOrderDataError);
        });
    });

    describe('findById', () => {
        it('debe retornar una orden por su id', async () => {
            const mockOrder = createMockOrder();
            
            mockDocClient.send.mockResolvedValueOnce({
                Item: {
                    id: mockOrder.id,
                    status: mockOrder.status,
                    items: mockOrder.items,
                    createdAt: mockOrder.createdAt.toISOString(),
                    updatedAt: mockOrder.updatedAt.toISOString()
                }
            });

            const result = await repository.findById('order-123');

            expect(result).toBeDefined();
            expect(result?.id).toBe('order-123');
            expect(result?.status).toBe('pending');
        });

        it('debe retornar null si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            const result = await repository.findById('non-existent');

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('debe actualizar una orden exitosamente', async () => {
            const existingOrder = createMockOrder();
            const updateData: OrderUpdateDTO = { status: 'paid' };
            const updatedOrder = { ...existingOrder, status: 'paid' as OrderStatus };
            
            mockDocClient.send
                .mockResolvedValueOnce({
                    Item: {
                        id: existingOrder.id,
                        status: existingOrder.status,
                        items: existingOrder.items,
                        createdAt: existingOrder.createdAt.toISOString(),
                        updatedAt: existingOrder.updatedAt.toISOString()
                    }
                })
                .mockResolvedValueOnce({});

            const result = await repository.update('order-123', updateData);

            expect(result.status).toBe('paid');
        });

        it('debe lanzar error si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            await expect(repository.update('non-existent', { status: 'paid' }))
                .rejects.toThrow(OrderNotFoundError);
        });

        it('debe validar transición de estado', async () => {
            const existingOrder = createMockOrder({ status: 'shipped' });
            
            mockDocClient.send.mockResolvedValueOnce({
                Item: {
                    id: existingOrder.id,
                    status: existingOrder.status,
                    items: existingOrder.items,
                    createdAt: existingOrder.createdAt.toISOString(),
                    updatedAt: existingOrder.updatedAt.toISOString()
                }
            });

            await expect(repository.update('order-123', { status: 'pending' }))
                .rejects.toThrow();
        });
    });

    describe('delete', () => {
        it('debe eliminar una orden exitosamente', async () => {
            const existingOrder = createMockOrder();
            
            mockDocClient.send
                .mockResolvedValueOnce({
                    Item: {
                        id: existingOrder.id,
                        status: existingOrder.status,
                        items: existingOrder.items,
                        createdAt: existingOrder.createdAt.toISOString(),
                        updatedAt: existingOrder.updatedAt.toISOString()
                    }
                })
                .mockResolvedValueOnce({});

            await repository.delete('order-123');

            expect(mockDocClient.send).toHaveBeenCalledTimes(2);
        });

        it('debe lanzar error si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            await expect(repository.delete('non-existent')).rejects.toThrow(OrderNotFoundError);
        });
    });
});

// === ARCHIVO: infra/outputs.tf ===
# Outputs globales del proyecto de infraestructura
# Expone los recursos creados para consumo por otros componentes

output "dynamodb_table_arn" {
  description = "ARN of the DynamoDB table"
  value       = try(aws_dynamodb_table.orders_table[0].arn, "")
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = try(aws_dynamodb_table.orders_table[0].name, "")
}

output "dynamodb_table_stream_arn" {
  description = "Stream ARN of the DynamoDB table"
  value       = try(aws_dynamodb_table.orders_table[0].stream_arn, "")
}

output "api_gateway_url" {
  description = "URL of the API Gateway endpoint"
  value       = try(aws_api_gateway_deployment.this[0].invoke_url, "")
}

output "lambda_function_arn" {
  description = "ARN of the Lambda function"
  value       = try(aws_lambda_function.this[0].arn, "")
}

output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = try(aws_lambda_function.this[0].name, "")
}

output "sqs_queue_arn" {
  description = "ARN of the SQS queue"
  value       = try(aws_sqs_queue.this[0].arn, "")
}

output "sqs_queue_url" {
  description = "URL of the SQS queue"
  value       = try(aws_sqs_queue.this[0].url, "")
}

// === ARCHIVO: infra/variables.tf ===
variable "aws_region" {
  description = "AWS region where resources will be deployed"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., dev, prod)"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
}

variable "dynamodb_billing_mode" {
  description = "DynamoDB billing mode (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_read_capacity" {
  description = "DynamoDB read capacity units (only used if billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_write_capacity" {
  description = "DynamoDB write capacity units (only used if billing_mode is PROVISIONED)"
  type        = number
  default     = 5
}

variable "dynamodb_hash_key" {
  description = "DynamoDB table hash key"
  type        = string
}

variable "dynamodb_range_key" {
  description = "DynamoDB table range key (optional)"
  type        = string
  default     = null
}

variable "dynamodb_attributes" {
  description = "List of DynamoDB table attributes"
  type = list(object({
    name = string
    type = string
  }))
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo de DynamoDB para la tabla de órdenes
# Este módulo define la tabla de DynamoDB con sus atributos y configuración de índices secundarios.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders"
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "customerId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "createdAt"
      type = "S"
    }
  ]
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = [
    {
      name            = "CustomerIndex"
      hash_key        = "customerId"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "StatusIndex"
      hash_key        = "status"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]
}

resource "aws_dynamodb_table" "orders_table" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null
  hash_key       = var.hash_key
  range_key      = var.range_key

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.read_capacity : null
      write_capacity  = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.write_capacity : null
    }
  }

  tags = {
    Name        = "OrdersTable"
    Environment = "dev"
    Project     = "OrderManagement"
  }
}

output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = aws_dynamodb_table.orders_table.stream_arn
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# Configuración del entorno de desarrollo
# Valores específicos para el ambiente de desarrollo

# Configuración de la tabla DynamoDB para órdenes
table_name         = "orders-dev"
billing_mode       = "PAY_PER_REQUEST"
read_capacity      = 5
write_capacity     = 5

# Clave de partición y ordenamiento
hash_key           = "orderId"
range_key          = "createdAt"

# Atributos adicionales para la tabla
attributes = [
  { name = "orderId", type = "S" },
  { name = "createdAt", type = "S" },
  { name = "customerId", type = "S" },
  { name = "status", type = "S" }
]

# Índices secundarios globales para consultas eficientes
global_secondary_indexes = [
  {
    name            = "customerId-index"
    hash_key        = "customerId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  },
  {
    name            = "status-index"
    hash_key        = "status"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }
]

# Configuración de etiquetas para recursos
tags = {
  Environment = "dev"
  Project     = "orders-api"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
}

# Configuración de retención de datos
enable_point_in_time_recovery = true
enable_server_side_encryption = true

# Configuración de streams para procesamiento de eventos
enable_streams = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# Límites de capacidad bajo demanda
max_read_request_units  = 40000
max_write_request_units = 40000

# Configuración de TTL para limpieza automática
enable_ttl         = true
ttl_attribute_name = "expiresAt"
ttl_days           = 90

// === ARCHIVO: infra/environments/local/main.tf ===
# Configuración del entorno local para desarrollo
# Utiliza el módulo de DynamoDB para crear la tabla de órdenes

terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  # Backend local para desarrollo
  backend "local" {
    path = "terraform.tfstate"
  }
}

# Proveedor AWS con configuración local
provider "aws" {
  region = "us-east-1"

  # Configuración para desarrollo local
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    dynamodb = "http://localhost:8000"
    sts     = "http://localhost:4566"
  }
}

# Módulo de DynamoDB para la tabla de órdenes
module "dynamodb" {
  source = "../../modules/dynamodb"

  # Configuración de la tabla
  table_name     = "orders-local"
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = 5
  write_capacity = 5

  # Claves de la tabla
  hash_key  = "orderId"
  range_key = "createdAt"

  # Definición de atributos
  attributes = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "createdAt"
      type = "S"
    },
    {
      name = "customerId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    }
  ]

  # Índices secundarios globales
  global_secondary_indexes = [
    {
      name            = "customerId-index"
      hash_key        = "customerId"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    },
    {
      name            = "status-index"
      hash_key        = "status"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]
}

# Output: nombre de la tabla para uso en la aplicación
output "table_name" {
  description = "Nombre de la tabla DynamoDB de órdenes"
  value       = module.dynamodb.table_name
}

# Output: ARN de la tabla para permisos IAM
output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = module.dynamodb.table_arn
}

# Output: ARN del stream para procesamiento de eventos
output "table_stream_arn" {
  description = "ARN del stream de DynamoDB"
  value       = module.dynamodb.table_stream_arn
}

# Recurso local para validación de la configuración
resource "local_file" "dynamodb_config" {
  filename = "dynamodb_config.json"
  content  = jsonencode({
    table_name = module.dynamodb.table_name
    table_arn  = module.dynamodb.table_arn
    endpoint   = "http://localhost:8000"
    region     = "us-east-1"
  })
}

// === ARCHIVO: infra/README.md ===
# Infraestructura - Entornos

Este directorio contiene la configuración de infraestructura para diferentes entornos de la aplicación de órdenes.

## Estructura

```
environments/
├── dev/              # Entorno de desarrollo
│   └── terraform.tfvars
├── local/            # Entorno local con Docker
│   └── main.tf
└── README.md
```

## Entornos Disponibles

### Desarrollo (dev)

El entorno de desarrollo utiliza una tabla DynamoDB dedicada con las siguientes características:

- **Nombre de tabla**: `orders-dev`
- **Modo de facturación**: PAY_PER_REQUEST
- **Índices GSI**: customerId-index, status-index
- **Recuperación point-in-time**: habilitada
- **Cifrado**: habilitado con AWS managed keys

**Uso**:
```bash
cd environments/dev
terraform init
terraform plan
terraform apply
```

### Local

El entorno local está diseñado para desarrollo con DynamoDB local (Docker):

- **Endpoint**: `http://localhost:8000`
- **Tabla**: `orders-local`
- **Región**: `us-east-1`

**Requisitos previos**:

1. Iniciar DynamoDB local:
```bash
docker run -d -p 8000:8000 amazon/dynamodb-local
```

2. Crear tabla inicial (necesario para LocalStack):
```bash
aws dynamodb create-table \
  --cli-input-json file://modules/dynamodb/table-definition.json \
  --endpoint-url http://localhost:8000
```

**Uso**:
```bash
cd environments/local
terraform init
terraform plan
terraform apply
```

## Módulo DynamoDB

La tabla de órdenes se crea utilizando el módulo `modules/dynamodb` que proporciona:

- Tabla DynamoDB con clave de partición y ordenamiento
- Índices secundarios globales para consultas eficientes
- Streams para procesamiento de eventos
- Configuración de TTL para limpieza automática

### Atributos de la tabla

| Atributo | Tipo | Descripción |
|----------|------|-------------|
| orderId | S | Identificador único de la orden |
| createdAt | S | Fecha de creación (ISO 8601) |
| customerId | S | ID del cliente |
| status | S | Estado: pending, paid, shipped |
| totalAmount | N | Monto total de la orden |
| items | L | Lista de items de la orden |
| expiresAt | N | TTL para expiración |

### Índices disponibles

1. **customerId-index**: Para consultas por cliente
2. **status-index**: Para consultas por estado

## Validación Local

Para validar la configuración sin crear recursos:

```bash
terraform validate
terraform plan -out=tfplan
terraform show tfplan
```

Para destruir los recursos:

```bash
terraform destroy
```

## Notas

- El entorno local usa el proveedor AWS con endpoints locales
- Para producción, configurar backend remoto (S3 + DynamoDB)
- Las variables sensibles se gestionan via terraform.tfvars o variables de entorno

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
