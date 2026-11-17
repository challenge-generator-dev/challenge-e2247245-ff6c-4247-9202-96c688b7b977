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