output "alb_dns_name" {
  description = "DNS del balanceador de carga"
  value       = aws_lb.main.dns_name
}

output "vpc_id" {
  description = "ID de la VPC"
  value       = aws_vpc.main.id
}

output "db_endpoint" {
  description = "Endpoint de la base de datos"
  value       = aws_db_instance.main.endpoint
  sensitive   = true
}
