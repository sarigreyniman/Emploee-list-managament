using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace WorkersList.Core.Entities
{
    public enum PositionsNames
    {
        CEO,

        CFO,

        SurgeryDepartmentManager,

        NursesInTheSurgicalDepartment,

        Pharmacist,

        Physiotherapist,

        SocialWorker,

        AccountingManager,

        NursesInTheNeurologyDepartment,

        FamilyPhysician,

        PhysicalTrainingDepartmentAssistant,

        PhysiciansDepartmentManager,

        NursesInTheWomensDepartment,

        Nutritionist,

        SurgicalDepartmentManager,

        Pediatrician,

        Pharmacologist,

        NursesInTheOncologyDepartment,

        InternalMedicineDepartmentManager,

        EmergencyDepartmentManager,

        PlasticSurgeryPhysician,

        Psychiatrist,

        NursesInTheChemotherapyDepartment,

        PlasticSurgeryAssistant,

        OrthopedicPhysician,

        DialysisDepartmentAssistant,

        NursesInTheNeonatalOncologyDepartment,

        Oncologist,

        WomensDepartmentManagerInBirth,

        NursesInTheHeartSurgeryDepartment,

        SurgicalAndSurgicalPhysician,

        EndocrinologyDepartmentAssistant,

        Pulmonologist,

        NursesInTheGastroenterologyDepartment,

        Cardiologist,

        EndoscopyDepartmentManager,

        NursesInTheCardiologyDepartment,

        NeurologyDepartmentAssistant,

        Obstetrician,

        NursingDepartmentManager,

        RespiratoryPhysician,

        NursesInTheGynecologyDepartment,

        OrthopedicDepartmentAssistant,

        PediatricOrthopedicPhysician,

        PsychiatryDepartmentManager,

        NursesInTheMentalHealthDepartment,

        PainPhysician,

        ChemotherapyDepartmentAssistant,

        InternalMedicinePhysician,

        AndrologyDepartmentManager,
    }
    public class Position
    {

        public int Id { get; set; }

        public bool IsAdministrative { get; set; }

        public string positionName { get; set; }

        public DateTime StartPositionDate { get; set; }


    }
}
