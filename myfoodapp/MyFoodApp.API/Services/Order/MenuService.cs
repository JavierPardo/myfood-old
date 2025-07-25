using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class MenuService : IMenuService
    {
        private readonly IMenuRepository _menuRepository;
        private readonly IUserSession _userSession;
        private readonly IMapper _mapper;

        public MenuService(IMenuRepository menuRepository, IUserSession userSession, IMapper mapper)
        {
            _menuRepository = menuRepository;
            _userSession = userSession;
            _mapper = mapper;
        }
        public void Add(Menu client)
        {
            client.BranchId = _userSession.BranchId;
            _menuRepository.Create(client);
        }

        public void Delete(long id) => _menuRepository.DeleteByKey(id);

        public Menu Get(long id) => _menuRepository.GetByKey(id);

        public ICollection<Menu> GetAll() => _menuRepository.GetAll();

        public IEnumerable<Menu> GetMenuByBranchId(int branchId)
        {
            return _menuRepository.GetMenuByBranchId(branchId);
        }

        public void Update(Menu client)
        {
            client.BranchId = _userSession.BranchId;
            _menuRepository.Update(client);
        }

        public void UpdateSome(MenuPatchDto menu, long id)
        {
            var menuData = _menuRepository.GetByKey(id);

            if (menu.Name != null)
            {
                menuData.Name = menu.Name;
            }

            if (menu.IsActive.HasValue)
            {
                menuData.IsActive = menu.IsActive.Value;
            }
            _menuRepository.Update(menuData);
        }
    }
}
