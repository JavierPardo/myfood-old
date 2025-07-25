using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MyFoodApp.API.Helpers;
using MyFoodApp.API.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Repositories
{
    public abstract class EntityModelRepository<T, K> : IEntityModelRepository<T, K> where T : class
    {
        public EntityModelRepository(DataContext context, ILogger<T> logger)
        {
            _dbSet = context.Set<T>();
            _logger = logger;
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        protected DbSet<T> _dbSet;
        protected readonly ILogger<T> _logger;
        internal DataContext _context;

        public virtual IQueryable<T> PreFilterContext(DbSet<T> dbSet)
        {
            return dbSet;
        }
        public virtual void Create(T entity)
        {
            _context.Attach(entity);
            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
            _context.Entry(entity).State = EntityState.Detached;
            _context.SaveChanges();
        }
        public virtual T GetByKey(K entityId)
        {
            var entityFound = _dbSet.Find(entityId);
            if (entityFound == null)
            {
                return null;
            }

            _context.Entry(entityFound).State = EntityState.Detached;
            _context.SaveChanges();
            return entityFound;
        }
        public virtual ICollection<T> GetAll()
        {
            _logger.LogDebug($"GET All:{GetType().Name}");
            return _dbSet.AsNoTracking().ToList();
        }
        public virtual void Update(T entity)
        {
            try
            {
                _logger.LogDebug($"UpdateCall:{JsonConvert.SerializeObject(entity)}");
                var entityState = _context.Entry(entity).State;
                if (entityState == EntityState.Detached)
                {
                    _dbSet.Attach(entity);
                    _context.Entry(entity).State = EntityState.Modified;
                }
                _context.SaveChanges();
                _context.Entry(entity).State = EntityState.Detached;
                _context.SaveChanges();
            }

            catch (Exception ex)
            {
                _logger.LogError("Ambiguous Match Exception", ex);
                throw ex;
            }
        }
        public void DeleteByKey(K id)
        {
            var entity = GetByKey(id);
            if (entity != null)
            {
                _context.Entry(entity).State = EntityState.Deleted;
                _context.SaveChanges();

            }
        }

        public void DeleteByEntity(T entity)
        {            
            if (entity != null)
            {
                _context.Entry(entity).State = EntityState.Deleted;
                _context.SaveChanges();

            }
        }

    }
}
