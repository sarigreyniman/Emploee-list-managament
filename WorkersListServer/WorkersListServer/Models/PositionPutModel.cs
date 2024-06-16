using System.Xml.Linq;
using WorkersList.Core.Entities;

namespace WorkersListServer.Models
{
    public class PositionPutModel
    {

        public bool IsAdministrative { get; set; }

        public DateTime StartPositionDate { get; set; }

        public string positionName { get; set; }


    }
}
