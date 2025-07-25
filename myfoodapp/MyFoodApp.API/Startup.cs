using AutoMapper;
using Google.Cloud.Diagnostics.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Infrastructure.Middleware;
using MyFoodApp.API.Integrations;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Migrations.DataInitializer;
using MyFoodApp.API.Models;
using MyFoodApp.API.Processors;
using MyFoodApp.API.Repositories;
using MyFoodApp.API.Repositories.Order;
using MyFoodApp.API.Services;
using MyFoodApp.API.Services.Client;
using MyFoodApp.Resources;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MyFoodApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            ////add this: simply creates db if it doesn't exist, no migrations
            //using (var context = new IdentityDbContext())
            //{
            //    context.Database.EnsureCreated();
            //}
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddControllers();
            services.AddLogging(config =>
            {
                // clear out default configuration
                config.ClearProviders();
                config.AddConfiguration(Configuration.GetSection("Logging"));
                config.AddDebug();
                config.AddEventSourceLogger();
                config.AddConsole();
                if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Microsoft.Extensions.Hosting.Environments.Development)
                {
                    config.AddConsole();
                }
            });

            //configure localization
            services.AddLocalization(o => { o.ResourcesPath = "Resources"; });
            services.AddMvc()
                .AddViewLocalization()
                .AddDataAnnotationsLocalization(options =>
                {
                    options.DataAnnotationLocalizerProvider = (type, factory) =>
                        factory.Create(typeof(SharedResource));
                });

            var locale = Configuration["SiteLocale"];
            services.Configure<RequestLocalizationOptions>(options =>
            {
                CultureInfo[] supportedCultures = new[]
                {
                    new CultureInfo("en-US"),
                    new CultureInfo("es-BO")
                };
                options.DefaultRequestCulture = new RequestCulture(locale);
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;
                options.FallBackToParentCultures = false;
            });

            // Database connection
            //services.AddDbContext<DataContext>(item => item.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase")));
            services.AddDbContext<DataContext>(item => item
            .UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"))
            .EnableSensitiveDataLogging(), ServiceLifetime.Transient
            );
            services.AddIdentity<User, IdentityRole<long>>()
                .AddEntityFrameworkStores<DataContext>()
                .AddDefaultTokenProviders()
                .AddErrorDescriber<CustomIdentityErrorDescriber>();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                options.User.RequireUniqueEmail = false;
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddRouting(options => options.LowercaseUrls = true);

            // Register the Swagger generator
            services.AddSwaggerGen(c =>
            {
                // Use method name as operationId
                c.CustomOperationIds(e => e.TryGetMethodInfo(out MethodInfo methodInfo) ? methodInfo.Name : null);
            });

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            var smtpSettingsSection = Configuration.GetSection("Smtp");
            services.Configure<SmtpSettings>(smtpSettingsSection);

            var paymentSettingsSection = Configuration.GetSection("Payment");
            services.Configure<PaymentSettings>(paymentSettingsSection);

            // configure Jwt Authentication 
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                })
                .AddFacebook(facebookOptions =>
                {
                    facebookOptions.AppId = Configuration["Authentication:Facebook:AppId"];
                    facebookOptions.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
                })
                .AddGoogle(googleOptions=>
                {
                    googleOptions.ClientId = Configuration["Authentication:Google:AppId"];
                    googleOptions.ClientSecret = Configuration["Authentication:Google:AppSecret"];
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = appSettingsSection["JwtIssuer"],
                        ValidAudience = appSettingsSection["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettingsSection["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            services.AddSingleton(provider => new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapping());
            }).CreateMapper());

            //configure HealthChecks
            services.AddHealthChecks()
                .AddDbContextCheck<DataContext>();

            // configure DI for application services
            services.TryAdd(ServiceDescriptor.Singleton(typeof(ILogger<>), typeof(Logger<>)));
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IGroupService, GroupService>();
            services.AddScoped<IGroupRepository, GroupRepository>();

            services.AddScoped<IPaymentProviderService, PaymentProviderService>();
            services.AddScoped<IPaymentProviderRepository, PaymentProviderRepository>();
            services.AddScoped<IInvoiceService, InvoiceService>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<IPaymentTypeService, PaymentTypeService>();
            services.AddScoped<IPaymentTypeRepository, PaymentTypeRepository>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ITransactionRepository, TransactionRepository>();
            services.AddScoped<ITransactionStatusService, TransactionStatusService>();
            services.AddScoped<ITransactionStatusRepository, TransactionStatusRepository>();
            
            services.AddScoped<IBranchRepository, BranchRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();
            services.AddScoped<IBranchesGroupsRepository, BranchesGroupsRepository>();
            services.AddScoped<IBranchesEventTypesRepository, BranchesEventsTypeRepository>();
            services.AddScoped<IBranchService, BranchService>();
            services.AddScoped<IBranchNotificationsRepository, BranchNotificationsRepository>();
            services.AddScoped<IBranchNotificationTypesRepository, BranchNotificationTypesRepository>();
            services.AddScoped<IBranchNotificationService, BranchNotificationService>();
            services.AddScoped<IBranchNotificationTypesService, BranchNotificationTypesService>();
            services.AddScoped<IBranchPaymentTypeRepository, BranchPaymentTypeRepository>();
            services.AddScoped<IBranchPaymentTypeService, BranchPaymentTypeService>();
            services.AddScoped<IBranchPreferenceRepository, BranchPreferenceRepository>();
            services.AddScoped<IBranchPreferenceService, BranchPreferenceService>();
            services.AddScoped<ICountryRepository, CountryRepository>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<ICityRepository, CityRepository>();
            services.AddScoped<ICityService, CityService>();

            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IEventRepository, EventRepository>();

            services.AddScoped<IEventTypeService, EventTypeService>();
            services.AddScoped<IEventTypeRepository, EventTypeRepository>();
            
            services.AddScoped<IEventStatusService, EventStatusService>();
            services.AddScoped<IEventStatusRepository, EventStatusRepository>();
            
            services.AddScoped<IEventStatusHistoryService, EventStatusHistoryService>();
            services.AddScoped<IEventStatusHistoryRepository, EventStatusHistoryRepository>();
            
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            
            services.AddScoped<IOrderStatusHistoryService, OrderStatusHistoryService>();
            services.AddScoped<IOrderStatusHistoryRepository, OrderStatusHistoryRepository>();
            
            services.AddScoped<IOrderStatusService, OrderStatusService>();
            services.AddScoped<IOrderStatusRepository, OrderStatusRepository>();

            services.AddScoped<ITransactionStatusHistoryService, TransactionStatusHistoryService>();
            services.AddScoped<ITransactionStatusHistoryRepository, TransactionStatusHistoryRepository>();

            services.AddScoped<IFavoriteService, FavoriteService>();
            services.AddScoped<IFavoriteRepository, FavoriteRepository>();

            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ILocationRepository, LocationRepository>();

            services.AddScoped<IUserNotificationService, UserNotificationService>();
            services.AddScoped<IUserNotificationRepository, UserNotificationRepository>();

            services.AddScoped<IClientsAdminUsersService, ClientsAdminUsersService>();
            services.AddScoped<IClientsAdminUsersRepository, ClientsAdminUsersRepository>();

            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<IMenuService, MenuService>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICategoryService, CategoryService>();

            services.AddScoped<IMenusCategoriesRepository, MenusCategoriesRepository>();
            services.AddScoped<IMenusCategoriesService, MenusCategoriesService>();

            services.AddScoped<ICategoriesItemsRepository, CategoriesItemsRepository>();
            services.AddScoped<ICategoriesItemsService, CategoriesItemsService>();

            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IItemService, ItemService>();

            services.AddScoped<IItemPriceHistoryRepository, ItemPriceHistoryRepository>();
            services.AddScoped<IItemPriceHistoryService, ItemPriceHistoryService>();

            services.AddScoped<ISideRepository, SideRepository>();
            services.AddScoped<ISideService, SideService>();

            services.AddScoped<ISidePriceHistoryRepository, SidePriceHistoryRepository>();
            services.AddScoped<ISidePriceHistoryService, SidePriceHistoryService>();

            services.AddScoped<ILogisticProviderBranchRepository, LogisticProviderBranchRepository>();

            //services.AddScoped<IItemsSidesRepository, ItemsSidesRepository>();
            //services.AddScoped<IItemsSidesService, ItemsSidesService>();

            services.AddScoped<IOptionRepository, OptionRepository>();
            services.AddScoped<IOptionService, OptionService>();

            services.AddScoped<IItemsOptionsRepository, ItemsOptionsRepository>();
            services.AddScoped<IItemsOptionsService, ItemsOptionsService>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserSession, UserSession>();

            services.AddScoped<IReservationService, ReservationService>();
            services.AddScoped<IReservationRepository, ReservationRepository>();

            services.AddScoped<IReservationStatusService, ReservationStatusService>();
            services.AddScoped<IReservationStatusRepository, ReservationStatusRepository>();

            services.AddScoped<IReservationStatusHistoryService, ReservationStatusHistoryService>();
            services.AddScoped<IReservationStatusHistoryRepository, ReservationStatusHistoryRepository>();

            services.AddScoped<IReservationSpecialEventService, ReservationSpecialEventService>();
            services.AddScoped<IReservationSpecialEventRepository, ReservationSpecialEventRepository>();

            services.AddScoped<IBranchScheduleService, BranchScheduleService>();
            services.AddScoped<IBranchScheduleRepository, BranchScheduleRepository>();

            services.AddScoped<IBranchExceptionDateService, BranchExceptionDateService>();
            services.AddScoped<IBranchExceptionDateRepository, BranchExceptionDateRepository>();

            services.AddScoped<ICouponRepository, CouponRepository>();
            services.AddScoped<ICouponService, CouponService>();

            services.AddScoped<IOrderExtraRepository, OrderExtraRepository>();
            services.AddScoped<IOrderExtraService, OrderExtraService>();

            services.AddScoped<IOrderItemSelectedSideRepository, OrderItemSelectedSideRepository>();
            services.AddScoped<IOrderItemSelectedSideService, OrderItemSelectedSideService>();

            services.AddScoped<IOrderItemService, OrderItemService>();
            services.AddScoped<IOrderItemRepository, OrderItemRepository>();

            services.AddScoped<IOrderItemOptionRepository, OrderItemOptionRepository>();
            services.AddScoped<IOrderItemOptionService, OrderItemOptionService>();

            services.AddScoped<IOrderReportService, OrderReportService>();
            services.AddScoped<IOrderReportRepository, OrderReportRepository>();

            services.AddScoped<IOrderItemReportService, OrderItemReportService>();
            services.AddScoped<IOrderItemReportRepository, OrderItemReportRepository>();

            services.AddScoped<IClientTransactionReportService, ClientTransactionReportService>();
            services.AddScoped<IClientTransactionReportRepository, ClientTransactionReportRepository>();
            services.AddScoped<IReservationReportService, ReservationReportService>();
            services.AddScoped<IReservationReportRepository, ReservationReportRepository>();

            services.AddScoped<IOperationalReportService, OperationalReportService>();

            services.AddScoped<IUserReportService, UserReportService>();
            services.AddScoped<IUserReportRepository, UserReportRepository>();

            services.AddScoped<IActionPointsRepository, ActionPointsRepository>();
            services.AddScoped<IActionPointsService, ActionPointsService>();
            services.AddScoped<IActionPointsHistoryRepository, ActionPointsHistoryRepository>();
            services.AddScoped<IActionPointsHistoryService, ActionPointsHistoryService>();
            services.AddScoped<IPointsExchangeRepository, PointsExchangeRepository>();
            services.AddScoped<IPointsExchangeService, PointsExchangeService>();
            services.AddScoped<IUserPointsTransactionRepository, UserPointsTransactionRepository>();
            services.AddScoped<IUserPointsTransactionService, UserPointsTransactionService>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IBranchGroupService, BranchGroupService>();
            services.AddScoped<ILogisticProviderRepository, LogisticProviderRepository>();
            services.AddScoped<ILogisticProviderService, LogisticProviderService>();
            services.AddScoped<IImagesStorage, ImagesStorage>();
            services.AddScoped<IBranchPreferenceHistoryRepository, BranchPreferenceHistoryRepository>();
            services.AddScoped<ILogisticProviderRateRepository, LogisticProviderRateRepository>();
            services.AddScoped<IZoneRepository, ZoneRepository>();
            services.AddScoped<IZoneService, ZoneService>();
            services.AddScoped<ILogisticProviderRateService, LogisticProviderRateService>();
            services.AddScoped<ILogisticProviderRateTypeRepository, LogisticProviderRateTypeRepository>();
            services.AddScoped<IDistanceCoordinatesCalculator, DistanceCoordinatesCalculator>();
            services.AddScoped<ILogisticProviderRateTypeService, LogisticProviderRateTypeService>();
            services.AddScoped<IBranchLogisticProviderRepository, BranchLogisticProviderRepository>();
            services.AddScoped<ISocialLoginService, SocialLoginService>();

            services.AddScoped<IMessagingHelperService, MessagingHelperService>();
            services.AddScoped<ITwilioService, TwilioService>();

            services.AddScoped<IRoleService, RoleService>();
            //services.AddScoped<ITodoTixService, TodotixService>();
            services.AddHttpClient<ITodoTixService, TodotixService>();

        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<DataContext>();

                context.Database.Migrate();
                var serviceProvider = scope.ServiceProvider;
                var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
                var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<long>>>();
                UserAndRoleDataInitializer.SeedData(userManager, roleManager);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseRequestLocalization();

            if (env.IsDevelopment() || env.IsStaging())
            {
                app.UseExceptionHandler("/error-development");
            }
            else
            {
                app.UseExceptionHandler("/error");
                app.UseHsts();
            }

            app.UseMiddleware<ErrorWrappingMiddleware>();

            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseAuthentication();
            app.UseHttpsRedirection();

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(c =>
            {
                c.RouteTemplate = "api/swagger/{documentname}/swagger.json";
                c.SerializeAsV2 = true;  //specify OpenApi 2.0 specification as Google endpoints only supports v2.0
            });
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "MyFoodApp.API V1");
                c.RoutePrefix = "api/swagger";
            });

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            //HealthChecks
            app.UseHealthChecks("/health", new HealthCheckOptions
            {
                ResponseWriter = async (context, report) =>
                {
                    context.Response.ContentType = "application/json";
                    var response = new HealthCheckReponse
                    {
                        Status = report.Status.ToString(),
                        HealthChecks = report.Entries.Select(x => new IndividualHealthCheckResponse
                        {
                            Component = x.Key,
                            Status = x.Value.Status.ToString(),
                            Description = x.Value.Description
                        }),
                        HealthCheckDuration = report.TotalDuration
                    };
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
                }
            });

            // Log to Google.
            loggerFactory.AddGoogle(app.ApplicationServices, "aqueous-aileron-281300");

            try
            {
                InitializeDatabase(app);
            }
            catch(Exception e)
            {

            }
        }

        private async Task AddExtraInformationLog(IServiceScope currentScope, HttpContext context, Func<Task> next)
        {
            try
            {
                var logger = currentScope.ServiceProvider.GetRequiredService<ILogger<object>>();
                logger.LogDebug($"IPAddres:: {context.Connection.RemoteIpAddress}");
                logger.LogInformation($"IPAddress:: {context.Connection.RemoteIpAddress}");
            }
            catch(Exception ex)
            {

            }
            await next.Invoke();
        }
    }
}
