using AutoMapper;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System.Collections.Generic;
using System.Linq;

namespace MyFoodApp.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IImagesStorage _imagesStorage;
        private readonly IMenusCategoriesRepository _menusCategoriesRepository;
        private readonly IUserSession _userSession;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository,
            IMenusCategoriesRepository menusCategoriesRepository,
            IUserSession userSession,
            IMapper mapper,
            IImagesStorage imagesStorage)
        {
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("category");
            _menusCategoriesRepository = menusCategoriesRepository;
            _userSession = userSession;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }
        public void Add(Category category)
        {
            category.BranchId = _userSession.BranchId;
            var imageDataUrl = category.Image;
            category.Position = _categoryRepository.GetMaxPosition()+1;
            _categoryRepository.Create(category);
            category.Image = _imagesStorage.StoreImage(category.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(long id) => _categoryRepository.DeleteByKey(id);

        public Category Get(long id)
        {
            var category=_categoryRepository.GetByKey(id);
            category.Image = _imagesStorage.GetImage(id.EncodeAsBase32String());
            return category;
        }

        public IEnumerable<Category> GetAll()
        {
            foreach (var category in _categoryRepository.GetAll())
            {
                category.Image = _imagesStorage.GetImage(category.Id.EncodeAsBase32String());
                yield return category;
            }
        }
        public IEnumerable<Category> GetByMenuId(long menuId)
        {
            foreach (var category in _categoryRepository.GetByMenuId(menuId))
            {
                category.Image = _imagesStorage.GetImage(category.Id.EncodeAsBase32String());
                yield return category;
            }
        }

        public void Rearrangement(Category[] categories)
        {
            foreach (var category in categories)
            {
                var catFromDb = _categoryRepository.GetByKey(category.Id);
                catFromDb.Position = category.Position;
                _categoryRepository.Update(catFromDb);
            }
        }

        public void Update(Category category)
        {
            _menusCategoriesRepository.ClearByCategoryId(category.Id);
            var imageDataUrl = category.Image;
            category.Image = string.Empty;
            _categoryRepository.Update(category);
            category.Image= _imagesStorage.StoreImage(category.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void UpdateSome(CategoryDto category, long id)
        {
            var model = _mapper.Map<Category>(category);
            var categoryData = _categoryRepository.GetByKey(id);
            if (category.Name != null)
            {
                categoryData.Name = model.Name;
            }

            if (category.IsVisibleInMenu.HasValue)
            {
                categoryData.IsVisibleInMenu = model.IsVisibleInMenu;
            }

            if (category.MenusCategories!=null)
            {
                _menusCategoriesRepository.ClearByCategoryId(id);
                categoryData.MenusCategories = category.MenusCategories.ToList();
            }
            _categoryRepository.Update(categoryData);
            if (category.Image != null)
            {
                categoryData.Image = _imagesStorage.StoreImage(id.EncodeAsBase32String(), categoryData.Image);
            }
        }
    }
}
