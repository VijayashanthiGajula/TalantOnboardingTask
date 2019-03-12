using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TalantOnboardingTask1_.Models;
using Newtonsoft.Json;

namespace TalantOnboardingTask1_.Controllers
{
    public class SaleController : Controller
    {



        public ActionResult Index()
        {
            return View();
        }


        public JsonResult SalesList()
        {
            TalentEntities db = new TalentEntities();
            var saleList = db.Sales_.Select(s => new
            {
                Id = s.Id,
                DateSold = s.DateSold,
                CustomerName = s.Customer_.Name,
                ProductName = s.Product_.Name,
                StoreName = s.Store_.Name

            }).ToList();
            return new JsonResult { Data = saleList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult CustomerList()
        {
            TalentEntities db = new TalentEntities();
            var Customerdata = db.Customer_.Select(p => new { Id = p.Id, CustomerName = p.Name }).ToList();

            return new JsonResult { Data = Customerdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }



        public JsonResult ProductList()
        {
            TalentEntities db = new TalentEntities();

            var ProductsData = db.Product_.Select(p => new { Id = p.Id, ProductName = p.Name }).ToList();

            return new JsonResult { Data = ProductsData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


        public JsonResult StoreList()
        {
            TalentEntities db = new TalentEntities();
            var StoresData = db.Store_.Select(p => new { Id = p.Id, StoreName = p.Name }).ToList();

            return new JsonResult { Data = StoresData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }





        //Create
        public JsonResult CreateSale(Sales_ s)
        {
            TalentEntities db = new TalentEntities();
            db.Sales_.Add(s);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult DeleteSale(int id)
        {
            TalentEntities db = new TalentEntities();
            var sales = db.Sales_.Where(x => x.Id == id).SingleOrDefault();
            if (sales != null)
            {
                db.Sales_.Remove(sales);
                db.SaveChanges();
            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetEdit(int id)
        {
            TalentEntities db = new TalentEntities();
            Sales_ sale = db.Sales_.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(sale, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
         public JsonResult Edit(Sales_ s)
        {
            {
                try
                {
                    TalentEntities db = new TalentEntities();
                    Sales_ sales = db.Sales_.Where(x => x.Id == s.Id).SingleOrDefault();


                    sales.CustomerId = s.CustomerId;
                    sales.ProductId = s.ProductId;
                    sales.StoreId = s.StoreId;
                    sales.DateSold = s.DateSold;

                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    Console.Write(e.Data + "Exception Occured");
                    return new JsonResult { Data = "Sale Update Failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
                }

                return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

            }
        }
    }
}


