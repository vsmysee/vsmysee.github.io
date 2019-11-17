---
layout: article
title:  微服务模式语言
---

![](/images/MicroservicePatternLanguage.jpg)



## 两本书:


The-art-of-scalability

Microservices patterns



## Application architecture patterns

- Monolithic architecture
- Microservice architecture


## Decomposition

- Decompose by business capability
- Decompose by subdomain
- Self-contained Servicenew
- Data management

## Database per Service
- Shared database
- Saga
- API Composition
- CQRS
- Domain event
- Event sourcing

## Transactional messaging

- Transactional outbox
- Transaction log tailing
- Polling publisher

## Testing

- Service Component Test
- Consumer-driven contract test
- Consumer-side contract test

## Deployment patterns

- Multiple service instances per host
- Service instance per host
- Service instance per VM
- Service instance per Container
- Serverless deployment
- Service deployment platform

## Cross cutting concerns

- Microservice chassis
- Externalized configuration

## Communication style

- Remote Procedure Invocation
- Messaging
- Domain-specific protocol

## External API

- API gateway
- Backend for front-end

## Service discovery

- Client-side discovery
- Server-side discovery
- Service registry
- Self registration
- 3rd party registration

## Reliability

- Circuit Breaker

## Security

- Access Token

## Observability

- Log aggregation
- Application metrics
- Audit logging
- Distributed tracing
- Exception tracking
- Health check API
- Log deployments and changes

## UI patterns

- Server-side page fragment composition
- Client-side UI composition