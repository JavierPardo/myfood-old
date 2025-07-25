using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Repositories
{
    public class UserRepository : EntityModelRepository<User, long>, IUserRepository
    {

        public UserRepository(DataContext context, ILogger<User> logger) : base(context, logger)
        {            

        }

        public IEnumerable<User> GetAdminUsersByBranchId(int branchId)
        {
            return _dbSet.Where(u => u.ClientsAdminUsers.Any(x => x.Client.Branches.Any(b => b.Id == branchId)));
        }

        public IEnumerable<User> GetAllUsersByClientId(int clientId)
        {
            return _dbSet.Where(u => u.ClientsAdminUsers.Any(x => x.ClientId ==  clientId));
        }

        public IEnumerable<User> GetAllByOrderId(long id)
        {
            return _dbSet.Where(u => u.OrderStatusHistories.Any(o=>o.OrderId==id)).ToList();
        }

        public User GetClientById(long userId)
        {
            var userList = _dbSet
                .Include(x => x.ClientsAdminUsers)
                .ThenInclude(ys => ys.Client)
                .ThenInclude(ys1 => ys1.Branches)
                .ToList();
            return userList.FirstOrDefault(user => user.Id == userId);
        }

        public IEnumerable<User> GetWithEvents()
        {
            return _dbSet.Where(user=>user.Events.Any()).ToList();
        }

        public User GetByEmail(string emailUser)
        {
            return _dbSet.FirstOrDefault(user => user.Email.ToLower()==emailUser.ToLower());
        }
    }
}