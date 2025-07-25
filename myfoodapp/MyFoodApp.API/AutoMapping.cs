using AutoMapper;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using MyFoodApp.API.DTO;
using MyFoodApp.API.Entities;
using MyFoodApp.API.Enum;
using MyFoodApp.API.Infrastructure.Extension;
using MyFoodApp.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;

public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<OrderItemDto, OrderItem>()
            .ForMember(u => u.ItemId, x => x.MapFrom(u => u.OrderItemId))
            .ForMember(u => u.Quantity, x => x.MapFrom(u => u.Quantity))
            .ForMember(u => u.Price, x => x.MapFrom(u => u.CurrentPrice))
            .ForMember(u => u.SelectedSides, x => x.MapFrom(u => u.Sides.Select(side => new OrderItemSelectedSides
            {
                SideId = side.Id
            })))
            .ForMember(u => u.SelectedOptions, x => x.MapFrom(u => new OrderItemSelectedOptions[] { new OrderItemSelectedOptions {
            OptionId=u.Option.Id
            } }));
        CreateMap<OrderItemDto, OrderExtra>()
            .ForMember(u => u.SideId, x => x.MapFrom(u => u.ExtraId))
            .ForMember(u => u.Quantity, x => x.MapFrom(u => u.Quantity))
            .ForMember(u => u.Price, x => x.MapFrom(u => u.CurrentPrice));

        CreateMap<OrderDto, Order>()
            .ForMember(u => u.OrderStatus, x => x.Ignore());

        CreateMap<Order, OrderDto>()
        .ForMember(u => u.OrderStatus, x => x.MapFrom(u => u.CurrentStatusId))
        .ForMember(u => u.OrderStatusDetail, x => x.MapFrom(u => u.OrderStatus))
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .AfterMap(AfterMap);

        CreateMap<Order, OrderDetailDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.OrderStatus, x => x.MapFrom(u => u.OrderStatus.Name))
        .ForMember(dest => dest.CreateOrderDateTime,
            opts => opts.MapFrom(src => src.CreateOrderDateTime))
        .AfterMap(AfterMap);

        CreateMap<OrderItemDto, OrderItem>()
            .ForMember(u => u.ItemId, x => x.MapFrom(u => u.OrderItemId))
            .ForMember(u => u.Quantity, x => x.MapFrom(u => u.Quantity))
            .ForMember(u => u.Price, x => x.MapFrom(u => u.CurrentPrice))
            .ForMember(u => u.SelectedSides, x => x.MapFrom(u => u.Sides.Select(side => new OrderItemSelectedSides
            {
                SideId = side.Id
            })))
            .ForMember(u => u.SelectedOptions, x => x.MapFrom(u => new OrderItemSelectedOptions[] { new OrderItemSelectedOptions {
            OptionId=u.Option.Id
            } }));
        CreateMap<OrderItemDto, OrderExtra>()
            .ForMember(u => u.SideId, x => x.MapFrom(u => u.ExtraId))
            .ForMember(u => u.Quantity, x => x.MapFrom(u => u.Quantity))
            .ForMember(u => u.Price, x => x.MapFrom(u => u.CurrentPrice));

        //CreateMap<Order, OrderDto>()
        //.ForMember(u => u.Customer, x => x.MapFrom(u => new CustomerDto { Name = u.CustomerName, Id = u.CustomerId }))
        //.ForMember(u => u.OrderDetail, x => x.MapFrom(u => u.OrderItems.Select(oi => 
        //new OrderItemDto
        //{
        //    CurrentPrice = oi.Price,
        //    OrderItemId = oi.ItemId,
        //    Id = oi.Id,
        //    Name = oi.Item.Name,
        //    Option = new KeyValue<int>
        //    {
        //        Id = oi.SelectedOptions.First().Option.Id
        //    },
        //    PrepTimeMins = oi.Item.PrepTimeMins,
        //    Quantity = oi.Quantity,
        //    Sides = oi.SelectedSides.Select(s => new KeyValue<int>
        //    {
        //        Id = s.SideId
        //    }).ToList()

        //}).Concat(u.OrderItems.Select(oi =>
        //new OrderItemDto
        //{
        //    CurrentPrice = oi.Price,
        //    ExtraId = oi.ItemId,
        //    Id = oi.Id,
        //    Quantity = oi.Quantity

        //}))));
        //.ForMember(u => u.Details, x => x.MapFrom(u => JsonConvert.SerializeObject(u)));

        //.ForMember(u => u.OrderDetail, x.res x =>  x.MapFrom(u => u.OrderItems.Select(oi =>
        //new OrderItemDto
        //{
        //    CurrentPrice = oi.Price,
        //    OrderItemId = oi.ItemId,
        //    Id = oi.Id,
        //    Name = oi.Item.Name,
        //    Option = new KeyValue<int>
        //    {
        //        Id = oi.SelectedOptions.First().Option.Id
        //    },
        //    PrepTimeMins = oi.Item.PrepTimeMins,
        //    Quantity = oi.Quantity,
        //    Sides = oi.SelectedSides.Select(s => new KeyValue<int>
        //    {
        //        Id = s.SideId
        //    }).ToList()

        //}).Concat(u.OrderItems.Select(oi =>
        //new OrderItemDto
        //{
        //    CurrentPrice = oi.Price,
        //    ExtraId = oi.ItemId,
        //    Id = oi.Id,
        //    Quantity = oi.Quantity

        //}))));
        //.ForMember(u => u.Details, x => x.MapFrom(u => JsonConvert.SerializeObject(u)));

        CreateMap<IEnumerable<Order>, OrdersDetailByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<Order, OrderDetailByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.Date, x => x.MapFrom(u => u.CreateOrderDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.Time, x => x.MapFrom(u => u.CreateOrderDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.TotalAmount, x => x.MapFrom(u => u.Event.TotalAmount))
        .ForMember(u => u.FullNameAppUser,
            x => x.MapFrom(u =>
                string.Join(
                    " ",
                    u.Event.AppUser.FirstName,
                    u.Event.AppUser.LastName)))
        .ForMember(u => u.EventTypeName, x => x.MapFrom(u => u.Event.EventType.Name))
        .ForMember(u => u.DeliveryCost, x => x.MapFrom(u => u.Event.DeliveryCost))
        .ForMember(u => u.TotalOrderPlusDeliveryCost, x => x.MapFrom(u => u.Event.TotalAmount + u.Event.DeliveryCost))
        .ForMember(u => u.TotalPaidMinusTransaction, x => x.MapFrom(u => u.Event.TotalAmount + u.Event.MyFoodAppFeeAmount))
        .ForMember(u => u.AmountItems, x => x.MapFrom(u => u.OrderItems.Count()));

        CreateMap<IEnumerable<ClientTransaction>, LogisticReconciliationsByDateReportDto>()
        .AfterMap(AfterMap);

        CreateMap<ClientTransaction, LogisticReconciliationByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.TransactionDate, x => x.MapFrom(u => u.TransactionDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.TransactionTime, x => x.MapFrom(u => u.TransactionDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.EventId, x => x.MapFrom(u => u.EventId))
        .ForMember(u => u.AmountTransaction, x => x.MapFrom(u => u.Amount))
        .ForMember(u => u.MethodType, x => x.MapFrom(u => u.PaymentType.Name))
        .ForMember(u => u.DeliveryCost, x => x.MapFrom(u => u.Event.DeliveryCost.HasValue ? Convert.ToDecimal(u.Event.DeliveryCost.Value) : decimal.Zero))
        .ForMember(u => u.ConciliationDate, x => x.MapFrom(u => u.Invoice.InvoiceDate))
        .ForMember(u => u.ConciliationId, x => x.MapFrom(u => u.Invoice.Id))
        .AfterMap(AfterMap);

        CreateMap<IEnumerable<ClientTransaction>, ClientTransactionsByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<ClientTransaction, ClientTransactionByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.TransactionDate, x => x.MapFrom(u => u.TransactionDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.TransactionTime, x => x.MapFrom(u => u.TransactionDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.ProcessorTransactionId, x => x.MapFrom(u => u.ProcessorTransactionId))
        .ForMember(u => u.EventId, x => x.MapFrom(u => u.EventId))
        .ForMember(u => u.AmountTransaction, x => x.MapFrom(u => u.Amount))
        .ForMember(u => u.DeliveryCost, x => x.MapFrom(u => u.Event.DeliveryCost.HasValue ? Convert.ToDecimal(u.Event.DeliveryCost.Value) : decimal.Zero))
        .ForMember(u => u.AmountProduct, x => x.MapFrom(u => u.Event.TotalAmount))
        .ForMember(u => u.PctMyFoodApp, x => x.MapFrom(u => u.PctMyFoodApp))
        .ForMember(u => u.TotalAmountClient, x => x.MapFrom(u => u.Invoice.Amount))
        .ForMember(u => u.ConciliationDate, x => x.MapFrom(u => u.Invoice.InvoiceDate))
        .ForMember(u => u.ConciliationId, x => x.MapFrom(u => u.Invoice.Id));

        CreateMap<IEnumerable<ClientTransaction>, CommissionsReconciliationByDateReportDto>()
        .AfterMap(AfterMap);

        CreateMap<IEnumerable<ClientTransaction>, CommissionsReconciliationOnlineByDateReportDto>()
        .AfterMap(AfterMap);

        CreateMap<ClientTransaction, CommissionReconciliationOnlineByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.TransactionDate, x => x.MapFrom(u => u.TransactionDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.TransactionTime, x => x.MapFrom(u => u.TransactionDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.ProcessorTransactionId, x => x.MapFrom(u => u.ProcessorTransactionId))
        .ForMember(u => u.EventId, x => x.MapFrom(u => u.EventId))
        .ForMember(u => u.AmountTransaction, x => x.MapFrom(u => u.Amount))
        .ForMember(u => u.MethodType, x => x.MapFrom(u => u.PaymentType.PaymentProvider.Name))
        .ForMember(u => u.DeliveryCost, x => x.MapFrom(u => u.Event.DeliveryCost.HasValue ? Convert.ToDecimal(u.Event.DeliveryCost.Value) : decimal.Zero))
        .ForMember(u => u.MyFoodAppFeeAmount, x => x.MapFrom(u => u.MyFoodAppFeeAmount))
        .ForMember(u => u.PaymentProcessorFeeAmount, x => x.MapFrom(u => u.PaymentProcessorFeeAmount))
        .ForMember(u => u.TotalAmountClient, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.Amount : (decimal?) null))
        .ForMember(u => u.ConciliationDate, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.InvoiceDate : (DateTime?) null))
        .ForMember(u => u.ConciliationId, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.Id : (long?) null));

        CreateMap<IEnumerable<ClientTransaction>, CommissionsReconciliationCashByDateReportDto>()
        .AfterMap(AfterMap);

        CreateMap<ClientTransaction, CommissionReconciliationCashByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.TransactionDate, x => x.MapFrom(u => u.TransactionDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.TransactionTime, x => x.MapFrom(u => u.TransactionDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.EventId, x => x.MapFrom(u => u.EventId))
        .ForMember(u => u.AmountTransaction, x => x.MapFrom(u => u.Amount))
        .ForMember(u => u.DeliveryCost, x => x.MapFrom(u => u.Event.DeliveryCost.HasValue ? Convert.ToDecimal(u.Event.DeliveryCost.Value) : decimal.Zero))
        .ForMember(u => u.MyFoodAppFeeAmount, x => x.MapFrom(u => u.MyFoodAppFeeAmount))
        .ForMember(u => u.TotalAmountClient, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.Amount : (decimal?)null))
        .ForMember(u => u.ConciliationDate, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.InvoiceDate : (DateTime?)null))
        .ForMember(u => u.ConciliationId, x => x.MapFrom(u => u.Invoice != null ? u.Invoice.Id : (long?)null));

        CreateMap<Reservation, ReservationsDetailByDateReportDto>()
        .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
        .ForMember(u => u.RequestedDate, x => x.MapFrom(u => u.RequestedDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.RequestedTime, x => x.MapFrom(u => u.RequestedDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.ReservationDate, x => x.MapFrom(u => u.ReservationDateTime.ToString("dd/MM/yyyy")))
        .ForMember(u => u.ReservationTime, x => x.MapFrom(u => u.ReservationDateTime.ToString("HH:mm:ss")))
        .ForMember(u => u.EventTypeName, x => x.MapFrom(u => u.SpecialEvent != null ? u.SpecialEvent.Name : "Reserva normal"))
        .ForMember(u => u.Prepaid, x => x.MapFrom(u => u.SpecialEvent != null && u.SpecialEvent.Prepaid ? "Si" : "No"))
        .ForMember(u => u.NumberOfGuests, x => x.MapFrom(u => u.NumberOfGuests));

        CreateMap<IEnumerable<OperationalDetailByDateReportDto>, OperationalsDetailByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<Reservation, OperationalDetailByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<Order, OperationalDetailByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<IEnumerable<OperationalTimesByDateReportDto>, OperationalsTimesByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<Order, OperationalTimesByDateReportDto>()
            .AfterMap(AfterMap);

        CreateMap<Reservation, ReservationsByDateAndStatusDto>()
        .ForMember(dest => dest.AppUserFullName,
        opts => opts.MapFrom(source =>
        string.Join(
            " ",
            source.User.FirstName,
            source.User.LastName)))
        .ForMember(dest => dest.AppUserFirstName,
        opts => opts.MapFrom(src => src.User.FirstName))
        .ForMember(dest => dest.AppUserLastName,
        opts => opts.MapFrom(src => src.User.LastName))
        .ForMember(dest => dest.AppUserPhoneNumber,
        opts => opts.MapFrom(src => src.User.PhoneNumber))
        .ForMember(dest => dest.Payments,
        opts => opts.MapFrom(src => src.Transactions))
        .ForMember(dest => dest.OrderDetail,
        opts => opts.MapFrom(src => src.Event.Orders));

        CreateMap<User, WebUserDto>()
            .ForMember(u => u.Fullname, x => x.MapFrom(u => $"{u.FirstName} {u.LastName}"))
            ;//.ForMember(u => u.Fullname, x => x.MapFrom(u => u.));

        CreateMap<RegisterModel, User>()
            .ForMember(u => u.UserName, x => x.MapFrom(u => u.Email));

        CreateMap<CategoryDto, Category>()
            .ForMember(u => u.Image, x => x.MapFrom(u => u.Image))
            .ForMember(u => u.IsVisibleInMenu, x => x.MapFrom(u => u.IsVisibleInMenu.HasValue && u.IsVisibleInMenu.Value));

        CreateMap<SideDto, Side>()
            .ForMember(u => u.CurrentPrice, x => x.MapFrom(u => u.CurrentPrice.HasValue ? Convert.ToDecimal(u.CurrentPrice.Value) : decimal.Zero));

        CreateMap<Side, SideDto>()
            .ForMember(u => u.CurrentPrice, x => x.MapFrom(u => u.CurrentPrice));

        CreateMap<OrderItemSelectedSides, OrderItemSelectedSidesDto>()
            .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
            .ForMember(u => u.Name, x => x.MapFrom(u => u.Side.Name))
            .ForMember(u => u.Description, x => x.MapFrom(u => u.Side.Description))
            .ForMember(u => u.Image, x => x.MapFrom(u => u.Side.Image))
            .ForMember(u => u.Price, x => x.MapFrom(u => u.Side.CurrentPrice));

        CreateMap<OrderItemSelectedOptions, OrderItemSelectedOptionsDto>()
            .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
            .ForMember(u => u.OptionChoice, x => x.MapFrom(u => u.OptionChoice))
            .ForMember(u => u.Name, x => x.MapFrom(u => u.Option.Name))
            .ForMember(u => u.Choices, x => x.MapFrom(u => u.Option.Choices));

        CreateMap<OrderStatus, KeyValueDto<int>>()
            .ForMember(u => u.Id, x => x.MapFrom(u => u.Id))
            .ForMember(u => u.Description, x => x.MapFrom(u => u.Name));

        CreateMap<ItemDto, Item>()
            .ForMember(u => u.Image, x => x.MapFrom(u => u.Image.ToByteArray()))
            .ForMember(u => u.IsVisibleInMenu, x => x.MapFrom(u => u.IsVisibleInMenu.HasValue && u.IsVisibleInMenu.Value))
            .ForMember(u => u.IsActive, x => x.MapFrom(u => u.IsActive.HasValue && u.IsActive.Value));

        CreateMap<OptionDto, Option>()
            .ForMember(u => u.IsActive, x => x.MapFrom(u => u.IsActive.HasValue && u.IsActive.Value));

        CreateMap<User, AppUserModel>()
            .ForMember(u => u.Email, x => x.MapFrom(u => u.UserName))
            .ForMember(u => u.Preferences, x => x.MapFrom(u => string.Join(",", u.Preferences)));

        CreateMap<ExternalLoginDto, AppUserModel>();

        CreateMap<ExternalLoginDto, RegisterModel>();
        CreateMap<AppUserModel, User>();

        CreateMap<User, RegisterModel>()
            .ForMember(u => u.Email, x => x.MapFrom(u => u.UserName))
            .ForMember(u => u.Password, x => x.MapFrom(u => u.PasswordHash));
        CreateMap<Branch, BranchDto>()
            .ForMember(u => u.ClientName, x => x.MapFrom(u => u.Client.ClientName))
            .ForMember(u => u.BranchName, x => x.MapFrom(u => u.Name));

        CreateMap<BranchNotification, BranchNotificationsDto>();


        CreateMap<Order, OrdersByDateAndStatusDto>()
          .ForMember(dest => dest.CreateOrderDateTime,
            opts => opts.MapFrom(src => src.CreateOrderDateTime))
          .ForMember(dest => dest.Details,
            opts => opts.MapFrom(src => src.Event.Details))
          .ForMember(dest => dest.AppUserFullName,
            opts => opts.MapFrom(source =>
                string.Join(
                    " ",
                    source.Event.AppUser.FirstName,
                    source.Event.AppUser.LastName)))
          .ForMember(dest => dest.AppUserFirstName,
            opts => opts.MapFrom(src => src.Event.AppUser.FirstName))
          .ForMember(dest => dest.AppUserLastName,
            opts => opts.MapFrom(src => src.Event.AppUser.LastName))
          .ForMember(dest => dest.AppUserPhoneNumber,
            opts => opts.MapFrom(src => src.Event.AppUser.PhoneNumber))
          .ForMember(dest => dest.BranchId,
            opts => opts.MapFrom(src => src.Event.BranchId))
          .ForMember(dest => dest.TotalAmount,
            opts => opts.MapFrom(src => src.Event.TotalAmount))
          .ForMember(dest => dest.TypeId,
            opts => opts.MapFrom(src => src.Event.TypeId))
          .ForMember(dest => dest.EventType,
            opts => opts.MapFrom(src => src.Event.EventType.Name))
          .ForMember(dest => dest.CurrentStatusId,
            opts => opts.MapFrom(src => src.Event.CurrentStatusId))
          .ForMember(dest => dest.TableNumber,
            opts => opts.MapFrom(src => src.Event.TableNumber))
          .ForMember(dest => dest.DeliveryCost,
            opts => opts.MapFrom(src => src.Event.DeliveryCost))
          .ForMember(dest => dest.Payments,
            opts => opts.MapFrom(src => src.Event.Transactions))
          .ForMember(dest => dest.OrderDetail,
            opts => opts.MapFrom(src => src));

        CreateMap<Event, EventsByDateAndStatusDto>()
             .ForMember(dest => dest.EventType,
                opts => opts.MapFrom(src => src.EventType.Name))
              .ForMember(dest => dest.AppUserFullName,
                opts => opts.MapFrom(source =>
                    string.Join(
                        " ",
                        source.AppUser.FirstName,
                        source.AppUser.LastName)))
              .ForMember(dest => dest.AppUserFirstName,
                opts => opts.MapFrom(src => src.AppUser.FirstName))
              .ForMember(dest => dest.AppUserLastName,
                opts => opts.MapFrom(src => src.AppUser.LastName))
              .ForMember(dest => dest.AppUserPhoneNumber,
                opts => opts.MapFrom(src => src.AppUser.PhoneNumber))
              .ForMember(dest => dest.Payments,
                opts => opts.MapFrom(src => src.Transactions))
              .ForMember(dest => dest.OrderDetail,
                opts => opts.MapFrom(src => src.Orders));

        CreateMap<Event, EventsGetDetailByIdDto>()
     .ForMember(dest => dest.EventType,
        opts => opts.MapFrom(src => src.EventType.Name))
      .ForMember(dest => dest.AppUserFullName,
        opts => opts.MapFrom(source =>
            string.Join(
                " ",
                source.AppUser.FirstName,
                source.AppUser.LastName)))
      .ForMember(dest => dest.AppUserFirstName,
        opts => opts.MapFrom(src => src.AppUser.FirstName))
      .ForMember(dest => dest.AppUserLastName,
        opts => opts.MapFrom(src => src.AppUser.LastName))
      .ForMember(dest => dest.AppUserPhoneNumber,
        opts => opts.MapFrom(src => src.AppUser.PhoneNumber))
      .ForMember(dest => dest.AppUserEmail,
        opts => opts.MapFrom(src => src.AppUser.Email))
      .ForMember(dest => dest.AppUserUserName,
        opts => opts.MapFrom(src => src.AppUser.UserName))
      .ForMember(dest => dest.AppUserCoordinates,
        opts => opts.MapFrom(src => src.DestinationLocation.Coordinates))
      .ForMember(dest => dest.AppUserAddress,
        opts => opts.MapFrom(src => src.DestinationLocation.Address))
      .ForMember(dest => dest.AppUserIconIndex,
        opts => opts.MapFrom(src => src.DestinationLocation.IconIndex))
      .ForMember(dest => dest.AppUserNotes,
        opts => opts.MapFrom(src => src.DestinationLocation.Notes))
      .ForMember(dest => dest.AppUserZone,
        opts => opts.MapFrom(src => src.DestinationLocation.Zone))
      .ForMember(dest => dest.AppUserCity,
        opts => opts.MapFrom(src => src.DestinationLocation.City))
      .ForMember(dest => dest.AppUserCountry,
        opts => opts.MapFrom(src => src.DestinationLocation.Country))
      .ForMember(dest => dest.Payments,
        opts => opts.MapFrom(src => src.Transactions))
      .ForMember(dest => dest.OrderDetail,
        opts => opts.MapFrom(src => src.Orders));

        CreateMap<Event, DeliveryRequestDto>()
           .ForMember(dest => dest.BranchId,
              opts => opts.MapFrom(src => src.Branch.Id))
           .ForMember(dest => dest.EventId,
              opts => opts.MapFrom(src => src.Id))
           .ForMember(dest => dest.EventTypeId,
              opts => opts.MapFrom(src => src.EventType.Id))
           .ForMember(dest => dest.BranchName,
              opts => opts.MapFrom(src => src.Branch.Name))
           .ForMember(dest => dest.BranchAddress,
              opts => opts.MapFrom(src => src.Branch.Address))
           .ForMember(dest => dest.BranchCoordinates,
              opts => opts.MapFrom(src => src.Branch.Coordinates))
           .ForMember(dest => dest.BranchWhatsapp,
              opts => opts.MapFrom(src => src.Branch.Whatsapp))
           .ForMember(dest => dest.PaymentTypeId,
              opts => opts.MapFrom(src => src.Transactions.FirstOrDefault().PaymentTypeId))
           .ForMember(dest => dest.PaymentTypeName,
              opts => opts.MapFrom(src => src.Transactions.FirstOrDefault().PaymentType.Name))
           .ForMember(dest => dest.AppUserFullName,
              opts => opts.MapFrom(source =>
                  string.Join(
                      " ",
                      source.AppUser.FirstName,
                      source.AppUser.LastName)))

           .ForMember(dest => dest.AppUserWhatsapp,
              opts => opts.MapFrom(src => src.AppUser.PhoneNumber))
           .ForMember(dest => dest.OrderAmount,
              opts => opts.MapFrom(src => src.TotalAmount))
           .ForMember(dest => dest.LocationAddress,
              opts => opts.MapFrom(src => src.DestinationLocation.Address))
           .ForMember(dest => dest.LocationAddressNotes,
              opts => opts.MapFrom(src => src.DestinationLocation.Notes))
           .ForMember(dest => dest.LocationCoordinates,
              opts => opts.MapFrom(src => src.DestinationLocation.Coordinates))
           .ForMember(dest => dest.DeliveryDistance,
              opts => opts.MapFrom(src => src.DeliveryDistanceKm))
           .ForMember(dest => dest.DeliveryCost,
              opts => opts.MapFrom(src => src.DeliveryCost));

        //Need to review if this are needed
        CreateMap<User, ClientsAdminUsers>()
            .ForMember(cau => cau.UserId, x => x.MapFrom(au => au.Id));
        CreateMap<Client, ClientsAdminUsers>()
            .ForMember(cau => cau.ClientId, x => x.MapFrom(c => c.Id));
        CreateMap<UpdateModel, User>();

        CreateMap<Client, ClientDto>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ClientName))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive));
        CreateMap<ClientDto, Client>()
                .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive));

        CreateMap<ClientTransaction, PaymentDto>()
                .ForMember(dest => dest.MethodType, opt => opt.MapFrom(src => src.PaymentType));

        CreateMap<OrderExtra, OrderItemDto>()
                .ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.ExtraId, opt => opt.MapFrom(src => src.SideId))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));

        CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.OrderItemId, opt => opt.MapFrom(src => src.ItemId))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                //.ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Item.Name))
                //.ForMember(dest => dest.Option, opt => opt.MapFrom(src => new KeyValue<long> { Id = src.SelectedOptions.First().Option.Id }))
                //.ForMember(dest => dest.PrepTimeMins, opt => opt.MapFrom(src => src.Item.PrepTimeMins))
                //.ForMember(dest => dest.Sides, opt => opt.MapFrom(src => src.SelectedSides.Select(s=>new KeyValue<long> { Id = s.SideId })));
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity));

        CreateMap<OrderExtra, OrderDetailExtraDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Side.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Side.Description))
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Side.Image))
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Side.CurrentPrice));

        CreateMap<OrderItem, OrderDetailItemDto>()
                .ForMember(dest => dest.CurrentPrice, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Item.Name))
                .ForMember(dest => dest.Notes, opt => opt.MapFrom(src => src.Notes))
                .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
                .AfterMap(AfterMap);
    }

    private void AfterMap(Order src, OperationalTimesByDateReportDto dest, ResolutionContext context)
    {
        //#1 Id
        dest.Id = src.Id;
        //#2 Fecha / Hora Realizado
        dest.DateTimeDone = src.CreateOrderDateTime.ToString("dd/MM/yyyy HH:mm:ss");
        //#3 Tipo Pedido
        dest.EventTypeName = src.Event.EventType.Name;

        if (src.CurrentStatusId == (int)OrderStatusEnum.Rejected)
        {
            OrderStatusHistory orderRejected = src.OrderStatusHistories
            .OrderByDescending(x => x.ChangeDateTime)
            .Where(osh => osh.StatusId == (int)OrderStatusEnum.Rejected)
            .FirstOrDefault();
            //#4 Fecha / Hora Rechazo
            dest.DateTimeRejected = orderRejected.ChangeDateTime.ToString("dd/MM/yyyy HH:mm:ss");
        }
        else
        {
            OrderStatusHistory orderToBeConfirmed = src.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.ToBeConfirmed)
                .FirstOrDefault();

            OrderStatusHistory orderInProcess = src.OrderStatusHistories
                    .OrderByDescending(x => x.ChangeDateTime)
                    .Where(osh => osh.StatusId == (int)OrderStatusEnum.InProcess)
                    .FirstOrDefault();
            //#5 Tiempo respuesta
            if (orderInProcess != null && orderInProcess.ChangeDateTime.CompareTo(orderToBeConfirmed.ChangeDateTime) >= 0)
                dest.ResponseTime = Math.Round(orderInProcess.ChangeDateTime.Subtract(orderToBeConfirmed.ChangeDateTime).TotalMinutes, 2);

            OrderStatusHistory orderReadyToDispatch = src.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.ReadyToDispatch)
                .FirstOrDefault();
            //#6 Tiempo Proceso Pedido
            if (orderReadyToDispatch != null && orderReadyToDispatch.ChangeDateTime.CompareTo(orderToBeConfirmed.ChangeDateTime) >= 0)
                dest.ProcessOrderTime = Math.Round(orderReadyToDispatch.ChangeDateTime.Subtract(orderToBeConfirmed.ChangeDateTime).TotalMinutes, 2);

            //#7 Tiempo Evento / Rotacion mesa
            dest.TimeEvent = src.Event.EndDateTime?.Subtract(src.Event.StartDateTime).Minutes;

            OrderStatusHistory orderDispatched = src.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.Dispatched)
                .FirstOrDefault();
            //#8 Tiempo de Despacho
            if (orderDispatched != null && orderDispatched.ChangeDateTime.CompareTo(orderToBeConfirmed.ChangeDateTime) >= 0)
                dest.DispatchTime = Math.Round(orderDispatched.ChangeDateTime.Subtract(orderToBeConfirmed.ChangeDateTime).TotalMinutes, 2);
        }

        //#10 OrderStatus
        dest.OrderStatus = src.OrderStatus.Name;
    }

    private void AfterMap(Order src, OperationalDetailByDateReportDto dest, ResolutionContext context)
    {
        //#1 Id
        dest.Id = src.Id;
        //#2 Fecha Realizado
        dest.DateCreated = src.CreateOrderDateTime.ToString("dd/MM/yyyy");
        //#3 Hora Realizado
        dest.TimeCreated = src.CreateOrderDateTime.ToString("HH:mm:ss");
        //#4 Tipo Pedido
        dest.EventTypeName = src.Event.EventType.Name;

        if (src.CurrentStatusId == (int)OrderStatusEnum.Rejected)
        {
            OrderStatusHistory orderRejected = src.OrderStatusHistories
            .OrderByDescending(x => x.ChangeDateTime)
            .Where(osh => osh.StatusId == (int)OrderStatusEnum.Rejected)
            .FirstOrDefault();
            //#5 Fecha Rechazo
            dest.DateRejected = orderRejected.ChangeDateTime.ToString("dd/MM/yyyy");
            //#6 Hora Rechazo
            dest.TimeRejected = orderRejected.ChangeDateTime.ToString("HH:mm:ss");
        }
        else
        {
            OrderStatusHistory orderToBeConfirmed = src.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.ToBeConfirmed)
                .FirstOrDefault();

            OrderStatusHistory orderInProcess = src.OrderStatusHistories
                    .OrderByDescending(x => x.ChangeDateTime)
                    .Where(osh => osh.StatusId == (int)OrderStatusEnum.InProcess)
                    .FirstOrDefault();
            //#7 Tiempo respuesta
            if (orderInProcess != null && orderInProcess.ChangeDateTime.CompareTo(orderToBeConfirmed.ChangeDateTime) >= 0)
                dest.ResponseTime = Math.Round(orderInProcess.ChangeDateTime.Subtract(orderToBeConfirmed.ChangeDateTime).TotalMinutes, 2);
        }

        //#8 Motivo
        //dest.Reason = src.Notes;//TODO: ADD TO DATABASE FIRST
    }

    private void AfterMap(Reservation src, OperationalDetailByDateReportDto dest, ResolutionContext context)
    {
        //#1 Id
        dest.Id = src.Id;
        //#2 Fecha Realizado
        dest.DateCreated = src.ReservationDateTime.ToString("dd/MM/yyyy");
        //#3 Hora Realizado
        dest.TimeCreated = src.ReservationDateTime.ToString("HH:mm:ss");
        //#4 Tipo Pedido
        dest.EventTypeName = src.Event.EventType.Name;

        if (src.CurrentStatusId == (int)ReservationStatusEnum.Rejected)
        {
            ReservationStatusHistory reservationRejected = src.ReservationStatusHistories
            .OrderByDescending(x => x.ChangeDateTime)
            .Where(osh => osh.StatusId == (int)ReservationStatusEnum.Rejected)
            .FirstOrDefault();
            //#5 Fecha Rechazo
            dest.DateRejected = reservationRejected.ChangeDateTime.ToString("dd/MM/yyyy");
            //#6 Hora Rechazo
            dest.TimeRejected = reservationRejected.ChangeDateTime.ToString("HH:mm:ss");
        }
        else
        {
            ReservationStatusHistory reservationToBeConfirmed = src.ReservationStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)ReservationStatusEnum.ToConfirm)
                .FirstOrDefault();

            ReservationStatusHistory reservationInProcess = src.ReservationStatusHistories
                    .OrderByDescending(x => x.ChangeDateTime)
                    .Where(osh => osh.StatusId == (int)ReservationStatusEnum.Confirmed)
                    .FirstOrDefault();
            //#7 Tiempo respuesta
            if (reservationInProcess != null && reservationInProcess.ChangeDateTime.CompareTo(reservationToBeConfirmed.ChangeDateTime) >= 0)
                dest.ResponseTime = Math.Round(reservationInProcess.ChangeDateTime.Subtract(reservationToBeConfirmed.ChangeDateTime).TotalMinutes, 2);
        }

        //#8 Motivo
        dest.Reason = src.Notes;
    }

    private void AfterMap(IEnumerable<OperationalTimesByDateReportDto> src, OperationalsTimesByDateReportDto dest, ResolutionContext context)
    {
        dest.OperationalsTimesByDateReport = src;
        if (src.Count() > 0)
        {
            IEnumerable<double?> ResponseTime = src
                .Select(x => x.ResponseTime)
                .Where(x => x.HasValue);

            if (ResponseTime != null && ResponseTime.Count() > 0)
                dest.AvgResponseTimeBs = ResponseTime
                    .Average(x => x.Value);

            IEnumerable<double?> ProcessOrderTime = src
                .Select(x => x.ProcessOrderTime)
                .Where(x => x.HasValue);

            if (ProcessOrderTime != null && ProcessOrderTime.Count() > 0)
                dest.AvgProcessOrderTimeBs = ProcessOrderTime
                    .Average(x => x.Value);
        }
    }

    private void AfterMap(IEnumerable<OperationalDetailByDateReportDto> src, OperationalsDetailByDateReportDto dest, ResolutionContext context)
    {
        dest.OperationalsDetailByDateReport = src;
        if (src.Count() > 0)
        {
            IEnumerable<double?> ResponseTime = src
                .Select(x => x.ResponseTime)
                .Where(x => x.HasValue);

            if (ResponseTime != null && ResponseTime.Count() > 0)
                dest.AvgResponseTimeBs = ResponseTime
                    .Average(x => x.Value);
        }

    }

    private void AfterMap(IEnumerable<Order> src, OrdersDetailByDateReportDto dest, ResolutionContext context)
    {
        dest.OrdersDetailByDateReport = context.Mapper.Map<ICollection<OrderDetailByDateReportDto>>(src);
        dest.AmountOrders = src.Count();
        if (dest.AmountOrders > 0)
        {
            dest.TotalAmountTotalBs = dest.OrdersDetailByDateReport.Sum(x => x.TotalAmount);
            dest.TotalAmountAvgBs = dest.OrdersDetailByDateReport.Average(x => x.TotalAmount);
            dest.DeliveryCostTotalBs = dest.OrdersDetailByDateReport.Sum(x => x.DeliveryCost.HasValue ? x.DeliveryCost.Value : decimal.Zero);
            dest.DeliveryCostAvgBs = dest.OrdersDetailByDateReport.Average(x => x.DeliveryCost.HasValue ? x.DeliveryCost.Value : decimal.Zero);
            dest.AmountItemsTotalBs = dest.OrdersDetailByDateReport.Sum(x => x.AmountItems);
            dest.AmountItemsAvgBs = dest.OrdersDetailByDateReport.Average(x => x.AmountItems);
        }
    }

    private void AfterMap(IEnumerable<ClientTransaction> src, ClientTransactionsByDateReportDto dest, ResolutionContext context)
    {
        dest.ClientTransactionsByDateReport = context.Mapper.Map<ICollection<ClientTransactionByDateReportDto>>(src);
        if (src.Count() > 0)
        {
            dest.TotalAmountTransactionBs = dest.ClientTransactionsByDateReport.Sum(x => x.AmountTransaction);
            dest.TotalDeliveryCostBs = dest.ClientTransactionsByDateReport.Sum(x => x.DeliveryCost);
            dest.TotalAmountProductBs = dest.ClientTransactionsByDateReport.Sum(x => x.AmountProduct);
            dest.TotalPctMyFoodAppBs = dest.ClientTransactionsByDateReport.Sum(x => x.PctMyFoodApp);
            dest.TotalTotalAmountClientBs = dest.ClientTransactionsByDateReport.Sum(x => x.TotalAmountClient);
        }
    }

    private void AfterMap(ClientTransaction src, LogisticReconciliationByDateReportDto dest, ResolutionContext context)
    {
        Order order = src.Event
            .Orders
            .OrderByDescending(x => x.CreateOrderDateTime)
            .Where(o => o.CurrentStatusId == (int)OrderStatusEnum.Dispatched)
            .FirstOrDefault();

        if (order != null)
        {
            OrderStatusHistory orderToBeConfirmed = order.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.ToBeConfirmed)
                .FirstOrDefault();

            OrderStatusHistory orderDispatched = order.OrderStatusHistories
                .OrderByDescending(x => x.ChangeDateTime)
                .Where(osh => osh.StatusId == (int)OrderStatusEnum.Dispatched)
                .FirstOrDefault();

            //#8 Tiempo de Despacho
            if (orderDispatched != null && orderDispatched.ChangeDateTime.CompareTo(orderToBeConfirmed.ChangeDateTime) >= 0)
                dest.DispatchTime = Math.Round(orderDispatched.ChangeDateTime.Subtract(orderToBeConfirmed.ChangeDateTime).TotalMinutes, 2);
        }
    }

    private void AfterMap(IEnumerable<ClientTransaction> src, LogisticReconciliationsByDateReportDto dest, ResolutionContext context)
    {
        dest.LogisticReconciliationsByDateReport = context.Mapper.Map<ICollection<LogisticReconciliationByDateReportDto>>(src);
        if (src.Count() > 0)
        {
            dest.TotalAmountTransactionBs = dest.LogisticReconciliationsByDateReport.Sum(x => x.AmountTransaction);
            dest.TotalDeliveryCostBs = dest.LogisticReconciliationsByDateReport.Sum(x => x.DeliveryCost);
        }
    }

    private void AfterMap(IEnumerable<ClientTransaction> src, CommissionsReconciliationByDateReportDto dest, ResolutionContext context)
    {
        dest.CommissionsReconciliationOnlineByDateReport = context.Mapper.Map<CommissionsReconciliationOnlineByDateReportDto>(src);
        dest.CommissionsReconciliationCashByDateReport = context.Mapper.Map<CommissionsReconciliationCashByDateReportDto>(src);
        if (src.Count() > 0)
            dest.TotalDepositMyFoodAppToClient = dest.CommissionsReconciliationOnlineByDateReport.TotalTotalAmountClientBs +
                dest.CommissionsReconciliationOnlineByDateReport.TotalMyFoodAppFeeAmountBs;
    }

    private void AfterMap(IEnumerable<ClientTransaction> src, CommissionsReconciliationOnlineByDateReportDto dest, ResolutionContext context)
    {
        dest.CommissionReconciliationOnlineByDateReport = context.Mapper.Map<ICollection<CommissionReconciliationOnlineByDateReportDto>>(src.Where(x => x.PaymentTypeId == (int)PaymentTypeEnum.Online));
        if (src.Count() > 0)
        {
            dest.TotalAmountTransactionBs = dest.CommissionReconciliationOnlineByDateReport.Sum(x => x.AmountTransaction);
            dest.TotalDeliveryCostBs = dest.CommissionReconciliationOnlineByDateReport.Sum(x => x.DeliveryCost);
            dest.TotalMyFoodAppFeeAmountBs = dest.CommissionReconciliationOnlineByDateReport.Sum(x => x.MyFoodAppFeeAmount);
            dest.TotalTotalAmountClientBs = dest.CommissionReconciliationOnlineByDateReport.Sum(x => x.TotalAmountClient);
        }
    }

    private void AfterMap(IEnumerable<ClientTransaction> src, CommissionsReconciliationCashByDateReportDto dest, ResolutionContext context)
    {
        dest.CommissionReconciliationCashByDateReport = context.Mapper.Map<ICollection<CommissionReconciliationCashByDateReportDto>>(src.Where(x => x.PaymentTypeId == (int)PaymentTypeEnum.Cash));
        if (src.Count() > 0)
        {
            dest.TotalAmountTransactionBs = dest.CommissionReconciliationCashByDateReport.Sum(x => x.AmountTransaction);
            dest.TotalDeliveryCostBs = dest.CommissionReconciliationCashByDateReport.Sum(x => x.DeliveryCost);
            dest.TotalMyFoodAppFeeAmountBs = dest.CommissionReconciliationCashByDateReport.Sum(x => x.MyFoodAppFeeAmount);
            dest.TotalTotalAmountClientBs = dest.CommissionReconciliationCashByDateReport.Sum(x => x.TotalAmountClient);
        }
    }

    private void AfterMap(OrderItem src, OrderDetailItemDto dest, ResolutionContext context)
    {
        dest.SelectedSides = context.Mapper.Map<ICollection<OrderItemSelectedSidesDto>>(src.SelectedSides);
        dest.SelectedOptions = context.Mapper.Map<ICollection<OrderItemSelectedOptionsDto>>(src.SelectedOptions);
    }


    private void AfterMap(Order src, OrderDto dest, ResolutionContext context)
    {
        dest.OrderDetail = context.Mapper.Map<IEnumerable<OrderItemDto>>(src.OrderItems).Concat(
            context.Mapper.Map<IEnumerable<OrderItemDto>>(src.OrderExtras));
        //new OrderItemDto
        //{
        //    CurrentPrice = oi.Price,
        //    OrderItemId = oi.ItemId,
        //    Id = oi.Id,
        //    Name = oi.Item.Name,
        //    Option = new KeyValue<int>
        //    {
        //        Id = oi.SelectedOptions.First().Option.Id
        //    },
        //    PrepTimeMins = oi.Item.PrepTimeMins,
        //    Quantity = oi.Quantity,
        //    Sides = oi.SelectedSides.Select(s => new KeyValue<int>
        //    {
        //        Id = s.SideId
        //    }
    }

    private void AfterMap(Order src, OrderDetailDto dest, ResolutionContext context)
    {
        dest.OrderDetailItem = context.Mapper.Map<IEnumerable<OrderDetailItemDto>>(src.OrderItems);
        dest.OrderDetailExtras = context.Mapper.Map<IEnumerable<OrderDetailExtraDto>>(src.OrderExtras);
    }
}