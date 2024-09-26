using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GetDataAndSetData
{
   public class setfullname : IPlugin
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
            string fullname = firstname + lastname;
            target["nw_fullname"] = fullname;
        }
    }
}
