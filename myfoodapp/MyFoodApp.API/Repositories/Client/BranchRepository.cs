using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public class BranchRepository : EntityModelRepository<Branch, int>, IBranchRepository
    {
        public BranchRepository(DataContext context, ILogger<Branch> logger) : base(context, logger)
        {
        }

        public IEnumerable<Branch> GetAllByClientId(int clientId)
        {
            return _dbSet.Where(branch => branch.ClientId == clientId);
        }

        public IEnumerable<Branch> GetAllWithClients()
        {
            return _dbSet.Include(branch => branch.Client).ToList();
        }

        public Branch GetBranchClientById(int id)
        {
            return _dbSet
                .Include(x => x.Client)
                .Include(x => x.BranchesEventTypes)
                .AsNoTracking()
                .FirstOrDefault(branch => branch.Id == id);
        }

        public IEnumerable<Branch> GetBranchByNameOrTags(string searchCriteria)
        {
            searchCriteria = searchCriteria.ToLower();
            return _dbSet.Where(branch => branch.Name.ToLower().Contains(searchCriteria) 
            || branch.Tags.Contains(searchCriteria) || branch.Items.Any(i => i.Name.ToLower().Contains(searchCriteria)));         
        }

        public IEnumerable<Branch> GetAllByTags(string[] tags)
        {
            return _dbSet.Where(branch => tags.Any(x => branch.Tags.Contains(x)));
        }

        public IEnumerable<Branch> GetAllByEventTypesAndCriteria(string criteria, IEnumerable<int> eventTypes)
        {
            var query = _dbSet
                .Include(x => x.BranchesEventTypes)
                .Include(x => x.BranchPreferences)
                .Include(x => x.BranchExceptionDates)
                .AsEnumerable();
            if (eventTypes!=null&& eventTypes.Any())
            {
                query = query.Where(branch =>
                (!eventTypes.Any() || branch.BranchesEventTypes.Any(x => eventTypes.Contains(x.EventTypeId))));
            }
            return query;
        }

    }
}