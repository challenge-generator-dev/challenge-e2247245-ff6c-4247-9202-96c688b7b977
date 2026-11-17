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