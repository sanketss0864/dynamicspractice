using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GetDataAndSetData
{
    public class retrieveallnames : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {

            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Obtain the organization service reference.
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));


            string fetchXml = @"
            <fetch>
              <entity name='nw_class'>
                <attribute name='nw_name' />
              </entity>
            </fetch>";

            // Execute the FetchXML query.
            EntityCollection result = service.RetrieveMultiple(new FetchExpression(fetchXml));

            // Process the results.
            foreach (Entity entity in result.Entities)
            {
                string nwName = entity.GetAttributeValue<string>("nw_name");
                // Implement your logic with the retrieved data
                tracingService.Trace($"name is {nwName}");
            }

        }
    }
}
