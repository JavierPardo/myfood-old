using MyFoodApp.API.Entities;
using MyFoodApp.API.GoogleStorage;
using MyFoodApp.API.Infrastructure;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFoodApp.API.Services
{
    public interface IClientService
    {
        //AppUser Authenticate(string Email, string password);
        //IEnumerable<AppUser> GetAll();
        //AppUser GetById(int id);
        //AppUser Create(AppUser user, string password);
        //void Update(AppUser user, string password = null);
        //void Delete(int id);
        void Add(Entities.Client client);
        void Update(Entities.Client client);
        Entities.Client Get(int id);
        IEnumerable<Entities.Client> GetAll();
        void Delete(int id);
        void UpdateIsActive(Entities.Client client);
    }
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IImagesStorage _imagesStorage;

        public ClientService(IClientRepository clientRepository, IImagesStorage imagesStorage)
        {
            _clientRepository = clientRepository;
            _imagesStorage = imagesStorage;
            _imagesStorage.SetBucket("client");
        }

        public void Add(Entities.Client client)
        {
            _clientRepository.Create(client);
            client.BannerURL = _imagesStorage.StoreImage($"banner-{client.Id.EncodeAsBase32String()}", client.BannerURL);
            client.LogoURL = _imagesStorage.StoreImage($"logo-{client.Id.EncodeAsBase32String()}", client.LogoURL);
        }

        public void Update(Entities.Client client)
        {
            _clientRepository.Update(client);
            client.BannerURL = _imagesStorage.StoreImage($"banner-{client.Id.EncodeAsBase32String()}", client.BannerURL);
            client.LogoURL = _imagesStorage.StoreImage($"logo-{client.Id.EncodeAsBase32String()}", client.LogoURL);
        }
        public Entities.Client Get(int id)
        {
            var client=_clientRepository.GetByKey(id);

            client.BannerURL = _imagesStorage.GetImage($"banner-{client.Id.EncodeAsBase32String()}");
            client.LogoURL = _imagesStorage.GetImage($"logo-{client.Id.EncodeAsBase32String()}");
            return client;
        }
        public IEnumerable<Entities.Client> GetAll() => _clientRepository.GetAll().OrderBy(x=>x.Id).Select(client=>
        {
            client.BannerURL = _imagesStorage.GetImage($"banner-{client.Id.EncodeAsBase32String()}");
            client.LogoURL = _imagesStorage.GetImage($"logo-{client.Id.EncodeAsBase32String()}");
            return client;
        });
        public void Delete(int id) => _clientRepository.DeleteByKey(id);

        public void UpdateIsActive(Entities.Client client)
        {
            var clientData = _clientRepository.GetByKey(client.Id);
            clientData.IsActive = client.IsActive;
            _clientRepository.Update(clientData);
        }
    }
}
