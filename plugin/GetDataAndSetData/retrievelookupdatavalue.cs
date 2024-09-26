using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GetDataAndSetData
{
    public class retrievelookupdatavalue : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            Entity target = (Entity)context.InputParameters["Target"];

             EntityReference classlookup = target.GetAttributeValue<EntityReference>("nw_classlookup");
            Entity relatedEntity = service.Retrieve(classlookup.LogicalName, classlookup.Id, new ColumnSet("nw_name"));
            string className = relatedEntity.GetAttributeValue<string>("nw_name");
            tracingService.Trace($"Class Name: {className}");
        }
    }
}
