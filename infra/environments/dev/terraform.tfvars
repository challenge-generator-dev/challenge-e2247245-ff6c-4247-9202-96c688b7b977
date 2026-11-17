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