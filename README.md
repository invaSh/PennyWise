### PennyWise — Personal Budgeting Platform
PennyWise is a microservices-based budgeting and finance management platform built with .NET, designed to help users track income, manage expenses,and set financial goals

#### Architecture
Built with a modular microservices architecture, each service has its own database and Web API.
All services are containerized using Docker and managed locally via Docker Compose.
Client side is build with Next.js.
Requests coming from the client, are routed through a reverse proxy gateway, separating concerns and simplifying service access.

#### Services
##### Income Service: Handles registering income entries and categorizing sources.
##### Expense Service: Supports full CRUD operations for logging and categorizing expenses.
##### Goals Service: Allows users to define savings or spending goals.
##### Analytics Service: Aggregates data from income and expenses to compute monthly balances and trends.
##### Gateway Service: Uses YARP to route incoming API requests to appropriate services.

#### Tech Stack
.NET 7, ASP.NET Core Web API, Docker, PostgreSQL
MassTransit (for service communication)
RabbitMQ (for messaging)
Local development setup with docker-compose for running all services concurrently
