using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TalantOnboardingTask1_.Models;
using Newtonsoft.Json;

namespace TalantOnboardingTask1_.Controllers
{
    public class CustomerController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }
        //customerList
        public JsonResult CustomerList()
        {
            TalentEntities db = new TalentEntities();
            var customerList = db.Customer_.Select( x => new CustomerModel
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();
            return Json(customerList, JsonRequestBehavior.AllowGet);
            //return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //Create
        public JsonResult CreateCustomer(Customer_ c)
        {

            TalentEntities db = new TalentEntities();
            db.Customer_.Add(c);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult GetDelete(int id)
        {

            TalentEntities db = new TalentEntities();
            var customer = db.Customer_.Where(x => x.Id == id).SingleOrDefault();
            return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetDeleteCustomer(int id)
        {

            TalentEntities db = new TalentEntities();
            var customer = db.Customer_.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
         //   return Json(value, JsonRequestBehavior.AllowGet);
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult DeleteCustomer(int id)
        {

            TalentEntities db = new TalentEntities();
            var customer = db.Customer_.Where(x => x.Id == id).SingleOrDefault();
            if (customer != null)
            {
                db.Customer_.Remove(customer);
                db.SaveChanges();
            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //Edit
        public JsonResult GetEdit(int id)
        {

            TalentEntities db = new TalentEntities();
            Customer_ customer = db.Customer_.Where(x => x.Id == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(value, JsonRequestBehavior.AllowGet);
            //return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Customer_ c)
        {

            TalentEntities db = new TalentEntities();
            Customer_ cust = db.Customer_.Where(x => x.Id == c.Id).SingleOrDefault();


           
            cust.Name = c.Name;
            cust.Address = c.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}
