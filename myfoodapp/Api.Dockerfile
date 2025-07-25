#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["MyFoodApp.API/MyFoodApp.API.csproj", "MyFoodApp.API/"]
COPY ["MyFoodApp.Resources/MyFoodApp.Resources.csproj", "MyFoodApp.Resources/"]
RUN dotnet restore "MyFoodApp.API/MyFoodApp.API.csproj"
COPY . .
WORKDIR "/src/MyFoodApp.API"
RUN dotnet build "MyFoodApp.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyFoodApp.API.csproj" -c Release -o /app/publish

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .
ENV GOOGLE_APPLICATION_CREDENTIALS=googleLoggingCredentials.json
ENV ASPNETCORE_URLS=http://*:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "MyFoodApp.API.dll"]