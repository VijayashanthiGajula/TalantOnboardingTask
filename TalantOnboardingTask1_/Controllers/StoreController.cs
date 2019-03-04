using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TalantOnboardingTask1_.Models;

namespace TalantOnboardingTask1_.Controllers
{
    public class StoreController : Controller
    {
       
    
        public ActionResult Index()
        {
            return View();
        }
        //customerList
        public JsonResult StoreList()
        {
            TalentEntities db = new TalentEntities();
            var StoreList = db.Store_.ToList();
            return new JsonResult { Data = StoreList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        //Create
        public JsonResult CreateStoreList(Store_ s)
        {

            TalentEntities db = new TalentEntities();
            db.Store_.Add(s);
            db.SaveChanges();

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        //delete
        public JsonResult GetDeleteStoreList(int id)
        {

            TalentEntities db = new TalentEntities();
            var Store = db.Store_.Where(x => x.Id == id).SingleOrDefault();
            
            return new JsonResult { Data = Store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult DeleteStoreList(int id)
        {

            TalentEntities db = new TalentEntities();
            var Store = db.Store_.Where(x => x.Id == id).SingleOrDefault();
            if (Store != null)
            {
                db.Store_.Remove(Store);
                db.SaveChanges();
            }

            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult GetEdit(int id)
        {

            TalentEntities db = new TalentEntities();
            var Store = db.Store_.Where(x => x.Id == id).FirstOrDefault();
            return new JsonResult { Data = Store, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }
        public JsonResult Edit(Store_ s)
        {

            TalentEntities db = new TalentEntities();
            var Store = db.Store_.Where(x => x.Id == s.Id).SingleOrDefault();
            Store.Name = s.Name;
            Store.Address = s.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }


    }
}
