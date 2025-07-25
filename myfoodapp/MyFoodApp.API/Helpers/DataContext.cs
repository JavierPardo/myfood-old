using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Infrastructure.Extension;
using System.Linq;

namespace MyFoodApp.API.Helpers
{
    public class DynamicModelCacheKeyFactory : IModelCacheKeyFactory
    {
        public object Create(DbContext context)
            => (object)context.GetType();
    }
    public class DataContext : IdentityDbContext<User, IdentityRole<long>, long>
    {
        private readonly ILogger<DataContext> _logger;
        private readonly ILoggerFactory _loggerFactory;
        protected readonly IConfiguration Configuration;
        private readonly IUserSession _userSession;
        public DataContext(IConfiguration configuration, IUserSession userSession, ILoggerFactory loggerFactory, ILogger<DataContext> logger)
        {
            _logger = logger;
            _loggerFactory = loggerFactory;
            Configuration = configuration;
            _userSession = userSession;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            base.OnConfiguring(options);
            options.UseNpgsql(Configuration.GetConnectionString("WebApiDatabase"));
            options.ReplaceService<IModelCacheKeyFactory, DynamicModelCacheKeyFactory>();

            options.UseLoggerFactory(_loggerFactory);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssemblyWithServiceInjection(typeof(DataContext).Assembly, _userSession);
            //return;
            modelBuilder.Entity<Branch>().HasQueryFilter(branch =>
            (_userSession.HasUserRol && branch.IsActive)
            || (_userSession.HasSuperAdminRol && branch.ClientId == _userSession.ClientId)
            || (!_userSession.HasUserRol && !_userSession.HasSuperAdminRol &&
                (_userSession.ClientId == 0 || branch.ClientId == _userSession.ClientId)
                && branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId()) && branch.IsActive)
                );

            modelBuilder.Entity<BranchNotification>()
                .HasQueryFilter(branchNotification => (_userSession.HasAdminRol || _userSession.HasSuperAdminRol)
            );
           

            modelBuilder.Entity<BranchNotificationType>().HasQueryFilter(branchNotificationType =>
                _userSession.HasSuperAdminRol
            );

            modelBuilder.Entity<ReservationSpecialEvent>().HasQueryFilter(rse =>
            (!_userSession.HasUserRol && rse.BranchId == _userSession.BranchId)
            || (_userSession.HasUserRol && rse.IsActive)
                );

            modelBuilder.Entity<Reservation>().HasQueryFilter(rse =>
            (!_userSession.HasUserRol && rse.BranchId == _userSession.BranchId)
            || (_userSession.HasUserRol && rse.UserId==_userSession.GetUserId())
                );

            modelBuilder.Entity<Client>().HasQueryFilter(client =>
            _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId()) && client.IsActive
                || _userSession.HasUserRol);

            modelBuilder.Entity<BranchExceptionDate>().HasQueryFilter(preference =>
                preference.BranchId == _userSession.BranchId
                    && (
                        _userSession.HasSuperAdminRol
                        || !_userSession.HasUserRol && preference.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                       )
                );

            modelBuilder.Entity<BranchPreferences>().HasQueryFilter(preference =>
            (preference.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol || preference.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                )
                )||_userSession.HasUserRol
                );

            modelBuilder.Entity<Order>().HasQueryFilter(order =>
                order.Event.BranchId == _userSession.BranchId
                && (
                    _userSession.HasSuperAdminRol
                    || !_userSession.HasUserRol && order.Event.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                    )
                || _userSession.HasUserRol
                );

            modelBuilder.Entity<Event>().HasQueryFilter(option =>
                option.BranchId == _userSession.BranchId
                && (
                    _userSession.HasSuperAdminRol
                    || !_userSession.HasUserRol && option.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                    )
                || _userSession.HasUserRol
                );

            modelBuilder.Entity<Menu>().HasQueryFilter(menu =>
            menu.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && menu.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                )
                || _userSession.HasUserRol && menu.IsActive && (_userSession.BranchId <= 0 || _userSession.BranchId == menu.BranchId));

            modelBuilder.Entity<Category>().HasQueryFilter(cat =>
            cat.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && cat.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                )
            || _userSession.HasUserRol && cat.IsActive && cat.IsVisibleInMenu && (_userSession.BranchId <= 0 || cat.BranchId == _userSession.BranchId));

            //modelBuilder.Entity<BranchLogisticProvider>().HasQueryFilter(cat =>
            //_userSession.HasUserRol || cat.BranchId==_userSession.BranchId
            //);

            modelBuilder.Entity<Item>().HasQueryFilter(item =>
            item.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && item.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
            )
            || _userSession.HasUserRol && item.IsActive && item.IsVisibleInMenu && (_userSession.BranchId <= 0 || item.BranchId == _userSession.BranchId)
            );

            modelBuilder.Entity<Option>().HasQueryFilter(option =>
            option.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && option.BranchId == _userSession.BranchId && option.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
                )
                || _userSession.HasUserRol && option.IsActive && (_userSession.BranchId <= 0 || _userSession.BranchId == option.BranchId));

            modelBuilder.Entity<Side>().HasQueryFilter(side =>
            side.BranchId == _userSession.BranchId
            && (
                _userSession.HasSuperAdminRol
                || !_userSession.HasUserRol && side.Branch.Client.ClientsUsers.Any(cu => cu.UserId == _userSession.GetUserId())
            )
            || _userSession.HasUserRol && side.IsActive && (_userSession.BranchId <= 0 || _userSession.BranchId == side.BranchId));
        }

        //public DbSet<User> Users { get; set; }
        public DbSet<BranchNotification> BranchNotification { get; set; }
        public DbSet<BranchNotificationType> BranchNotificationType { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Group> Group { get; set; }
        public DbSet<BranchesGroups> BranchesGroups { get; set; }
        public DbSet<BranchesEventTypes> BranchesEventTypes { get; set; }
        public DbSet<BranchPreferences> BranchPreferences { get; set; }
        public DbSet<BranchPreferenceHistory> BranchPreferenceHistories { get; set; }
        public DbSet<BranchSchedule> BranchSchedule { get; set; }
        public DbSet<BranchExceptionDate> BranchExceptionDate { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MenusCategories> MenusCategories { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<Side> Sides { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<ClientTransaction> ClientTransactions { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ClientPayment> ClientPayments { get; set; }
        public DbSet<ReservationSpecialEvent> ReservationSpecialEvent { get; set; }
        public DbSet<LogisticProvider> LogisticProviders { get; set; }
        public DbSet<BranchLogisticProvider> BranchLogisticProviders { get; set; }
        public DbSet<LogisticProviderRate> LogisticProviderRates { get; set; }
        public DbSet<LogisticProviderRateType> LogisticProviderRateTypes { get; set; }
    }
}