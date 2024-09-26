using Microsoft.Xrm.Sdk;
using System;
using System.ServiceModel;

namespace GetDataAndSetData
{
    public class Class1 : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            Entity target = (Entity)context.InputParameters["Target"];
            string firstname = target.GetAttributeValue<string>("nw_name");
            tracingService.Trace($"{firstname}");
            string lastname = target.GetAttributeValue<string>("nw_lastname");
            tracingService.Trace($"{lastname}");
            string email = target.GetAttributeValue<string>("nw_email");
            tracingService.Trace($"{email}");
            string phoneno = target.GetAttributeValue<string>("nw_phoneno");
            tracingService.Trace($"{phoneno}");
            int classno = target.GetAttributeValue<int>("nw_classno");
            tracingService.Trace($"{classno}");
            decimal percentage = target.GetAttributeValue<decimal>("nw_percentage");
            tracingService.Trace($"{percentage}");
            Boolean transport = target.GetAttributeValue<Boolean>("nw_transport");
            tracingService.Trace($"{transport}");
            Money fee = target.GetAttributeValue<Money>("nw_fee");
            tracingService.Trace($"{fee.Value}");
            var studentuniqueid = target.GetAttributeValue<string>("nw_studentuniqueid");
            tracingService.Trace($"{studentuniqueid}");
            var gender = target.GetAttributeValue<OptionSetValue>("nw_gender");
            tracingService.Trace($"{gender.Value}");
            EntityReference classlookup = target.GetAttributeValue<EntityReference>("nw_classlookup");
            tracingService.Trace($"classlookup Id: {classlookup.Id}, LogicalName: {classlookup.LogicalName}");
           var gpa = target.GetAttributeValue<double>("nw_gpa");
            tracingService.Trace($"gpa: {gpa}");
            string studenturl = target.GetAttributeValue<string>("nw_studenturl");
            tracingService.Trace($"{studenturl}");
            DateTime? dateofbirth = target.GetAttributeValue<DateTime?>("nw_dateofbirth");
            tracingService.Trace($"{dateofbirth}");
            int age = target.GetAttributeValue<int>("nw_age");
            tracingService.Trace($"{age}");
            var leaveduration = target.GetAttributeValue<int?>("nw_leaveduration");
            tracingService.Trace($"{leaveduration.Value}");
            var studentsymbol = target.GetAttributeValue<string>("nw_studentsymbol");
            tracingService.Trace($"{studentsymbol}");
            string fullname = firstname + lastname;
            target["nw_fullname"] = fullname;

            // tracingService.Trace($"First name:{firstname} Last name:{lastname} email:{email} phoneno:{phoneno} classno:{classno} percentage:{percentage} transport:{transport} fee:{fee} student unique id:{studentuniqueid} gender:{gender}");


            //for setting data to backup table

            Entity backup = new Entity("nw_backupstudent");
            backup["nw_name"] = firstname;
            backup["nw_lastname"] = lastname;
            backup["nw_fullname"] = fullname;
            backup["nw_email"] = email;
            backup["nw_phoneno"] = phoneno;
            backup["nw_classno"] = classno;
            backup["nw_percentage"] = percentage;
            backup["nw_transport"] = transport;
            backup["nw_fee"] = fee;
            backup["nw_studentuniqueid"] = studentuniqueid;
            tracingService.Trace("line 69");
            backup["nw_gender"] = new OptionSetValue(gender.Value);
            tracingService.Trace("line 71");
            backup["nw_classlookup"] = classlookup;
            tracingService.Trace("line 73");
            backup["nw_gpa"] = gpa;
            tracingService.Trace("line 75");
            backup["nw_studenturl"] = studenturl;
            tracingService.Trace("line 77");
            backup["nw_dateofbirth"] = dateofbirth;
            tracingService.Trace("line 79");
            backup["nw_age"] = age;
            tracingService.Trace("line 81");
            backup["nw_leaveduration"] = leaveduration.Value;
            tracingService.Trace("line 83");
            backup["nw_studentsymbol"] = studentsymbol;
            tracingService.Trace("line 85");
            service.Create(backup);
            tracingService.Trace("line 87");

        }
    }
}
