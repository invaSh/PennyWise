FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
EXPOSE 80

COPY PennyWise.sln PennyWise.sln
COPY src/ExpenseService/ExpenseService.csproj src/ExpenseService/ExpenseService.csproj 
COPY src/GoalsService/GoalsService.csproj src/GoalsService/GoalsService.csproj
COPY src/IncomeService/IncomeService.csproj src/IncomeService/IncomeService.csproj
COPY src/GatewayService/GatewayService.csproj src/GatewayService/GatewayService.csproj
COPY src/HeatmapService/HeatmapService.csproj src/HeatmapService/HeatmapService.csproj
COPY src/Shared/Shared.csproj src/Shared/Shared.csproj
RUN dotnet restore PennyWise.sln

COPY src/HeatmapService src/HeatmapService
COPY src/Shared src/Shared
WORKDIR	/app/src/HeatmapService
RUN dotnet publish -c Release -o /app/src/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/src/out .
ENTRYPOINT ["dotnet", "HeatmapService.dll"]


