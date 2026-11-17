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