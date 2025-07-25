using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Interfaces;
using MyFoodApp.API.Infrastructure.Extension;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public class GroupService : IGroupService
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IImagesStorage _imagesStorage;

        public GroupService(IGroupRepository groupRepository,
            IImagesStorage imagesStorage)
        {
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("group");
            _groupRepository = groupRepository;
        }
        public void Add(Group group) {

            string imageDataUrl =group.Image;
            _groupRepository.Create(group);
            group.Image = _imagesStorage.StoreImage(group.Id.EncodeAsBase32String(), imageDataUrl);
        }

        public void Delete(int id) { 
            _groupRepository.DeleteByKey(id); 
        }

        public Group Get(int id) {
            var group=_groupRepository.GetByKey(id);
            group.Image = _imagesStorage.GetImage(id.EncodeAsBase32String());
            return group;
        }

        public IEnumerable<Group> GetAll()
        {
            foreach (var group in _groupRepository.GetAll())
            {
                group.Image = _imagesStorage.GetImage(group.Id.EncodeAsBase32String());
                yield return group;
            }
        }

        public void Update(Group group) {
            var imageDataUrl = group.Image;
            _groupRepository.Update(group);
            group.Image = _imagesStorage.StoreImage(group.Id.EncodeAsBase32String(), imageDataUrl);
        }
    }
}
