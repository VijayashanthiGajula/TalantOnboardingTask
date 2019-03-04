using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TalantOnboardingTask1_.Models;

namespace TalantOnboardingTask1_.Controllers
{
    public class SaleController : Controller
    {

     

        public ActionResult Index()
        {
            return View();
        }
        //customerList
        public JsonResult SalesList()
        {
            TalentEntities db = new TalentEntities();
            {
                var salesList = db.Sales_.Include("Customer_")
                    .Include("Product_")
                    .Include("Store_").ToList();
            //    var salesList = (from customer in db.Customer_
            //                     join sale in db.Sales_ on customer.Id equals sale.CustomerId
            //                     join product in db.Product_ on sale.ProductId equals product.Id
            //                     join store in db.Store_ on sale.StoreId equals store.Id
            //                     select new
            //                     {
            //                        Id= sale.Id,
            //                         CustomerId = customer.Name,
            //                         ProductID = product.Name,
            //                         StoreID = store.Name,
            //                         DateSold=sale.DateSold,

            //                     }).ToList();
                return new JsonResult { Data = salesList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }
        //var SalesList = db.Sales_.Select(s => new
        //{
        //    Id = s.Id,
        //    DateSold = s.DateSold,
        //    CustomerName = s.Customer_.Name,
        //    ProductName = s.Product_.Name,
        //    StoreName = s.Store_.Name

        //}).ToList();
        //return new JsonResult { Data = SalesList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };



        //Create
        public JsonResult CreateSales(Sales_ s)
        {
            TalentEntities db = new TalentEntities();
            db.Sales_.Add(s);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult DeleteSales(int id)
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
            var sales = db.Sales_.Where(x => x.Id == id).FirstOrDefault();
            return new JsonResult { Data = sales, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Sales_ s)
        {
            TalentEntities db = new TalentEntities();
            var sales = db.Sales_.Where(x => x.Id == s.Id).SingleOrDefault();
            sales.Id = s.Id;
            sales.Customer_.Id = s.Customer_.Id;
            sales.Product_.Id = s.Product_.Id;
            sales.Store_.Id = s.Store_.Id;
            sales.DateSold = s.DateSold;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}

//public JsonResult CutomerList()
//{

//        var Customerdata = db.Customer_.Select(p => new { id = p.Id, CustomerName = p.Name }).ToList();

//        return new JsonResult { Data = Customerdata, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


//}

//public JsonResult ProductList()
//{

//        var ProductsData = db.Product_.Select(p => new { id = p.Id, ProductName = p.Name }).ToList();

//        return new JsonResult { Data = ProductsData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };


//}

//public JsonResult StoreList()
//{

//        var StoresData = db.Store_.Select(p => new { id = p.Id, StoreName = p.Name }).ToList();

//        return new JsonResult { Data = StoresData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

//}