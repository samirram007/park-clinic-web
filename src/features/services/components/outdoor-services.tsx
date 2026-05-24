import React from "react";
import { UserRound } from "lucide-react";

const outdoorServicesData = [
   {
        department: "SPECIALIST PHYSICIAN - GENERAL MEDICINE",
        doctors: [
            "Dr. Sujata Mazumdar, MD",
            "Dr. Aritra Kr Ray, MBBS, MD",
            "Dr. Sujoy Panchadhyayee, MBBS, MD",
            "Dr. Omar Sharif Mullick, MBBS, MD",
            "Dr. Pushpita Mandal, MBBS, MD",
        ],
    }, 
            {
        department: "PAEDIATRICIAN",
        doctors: [
            "Dr. Surajit Santra, DCH, DNB, MNAMS",
            "Dr. Nikhileswar Khawash, MBBS, DCH, MD, FRCP",
        ],
    },
            {
        department: "PAEDIATRIC SURGERY",
        doctors: [
            "Dr. Ashoke Kr. Basu, MS, Mch, DNB, MNAMS, FAIS, FICA",
            "Dr. Jahurul Haque, MS, Mch, FAMS",
            "Dr. Sugato Banerjee, MS, Mch",
            "Dr. Udaysankar chatterjee, MS, Mch, Mch(Uro)",
            "Dr. Debasish Mitra, MS, Mch, MRCS",
            "Dr. Dhananjay Basak, MS, Mch, MNAMS",
            "Dr. Kuntal Bhaumik, MS, Mch, FIAS, FICS",
            "Dr. Sanghamitra Bhattacharyya, MBBS., MS., Mch.,",
            
        ],
    },
              {
        department: "ENDOCRINOLOGIST",
        doctors: [
            "Dr. Sudip Chatterjee, MD, MNAMS, FRCP, FACP",
        ],
    },
 
     {
        department: "GENERAL SURGERY",
        doctors: [
            "Dr. Suvro Ganguly, MBBS., MS., MRCS.",
        ],
    }, 
    {
        department: "ORTHOPAEDIC SURGEON",
        doctors: [
            "Dr. Ariful islam, MS (Ortho), DNB(Ortho), MNAMS",
            "Dr. Abhilash Sarkar, MS (Ortho)",
            "Dr. Kaunteya Ghosh, MBBS., MS",
        ],
    },
    {
        department: "BRAIN & SPINE SURGERY",
        doctors: [
            "Dr. Gopal Achari, MBBS, MS, MCH.",
            "Dr. Kaushik Sil, MBBS, MS, DNB.",
            "Dr. Niloy Biswas, MBBS, MS, MRCS, MCH.",
            "Dr. S.N. Ghosh D(Orth) M.S, DNB., MCH.,",
            "Dr. Pankaj Shivare , MS, MCH.",
            "Dr. Rahul Saha, MBBS, DNB (Neusurg.) MNAMS ",
            "Dr. Rituparna Haldar - M.D.",
            "Dr. Sudip Ghosh, MBBS, MS., DrNB. (Neusurg.)",
        ],
    },
    {
        department: "NEUROLOGIST",
        doctors: [
            "Dr. Ambar Chakravarty, FIAN, MD, FRCP, FICP",
            "Dr. Tapas Kumar Banerjee, MD., FRCP, FAAN",
            "Dr. Amit Halder, MD., DM.",
            "Dr. Goutam Ganguly, MD., DM. (Neuro)",
            "Dr. Kalyan Brata Bhattacharyya, FIAN, FRCP (Edin)",
            "Dr. Ankur Banik, MBBS., MD., DM.",
            
        ],
    },
    
             {
        department: "UROLOGIST",
        doctors: [
            "Dr. Himadri Pathak, DNB, MNAMS",
            "Dr. Dipankar Bera, MBBS., MS., M.Ch.",
           "Dr. Zeeshan Rahman, MBBS., MS., M.Ch.",
        ],
    },
    {
        department: "GYNAECOLOGIST & OBSTETRICIAN",
        doctors: [
            "Dr. Shabana Munshi, MBBS., DGO., DNB.",
            "Dr. Meenakshi Karan, MBBS., MD., FNB.",
        ],
    }, 
      {
        department: "HEMATOLOGIST",
        doctors: [
            "Dr. Sarmila Chandra, MD",
            "Dr. Maitreyi Bhattacharyya, MD., DM",
        ],
    },
        {
        department: "SURGICAL ONCOLOGIST",
        doctors: [
            "Dr. Arunabha Sengupta, MS",
        ],
    }, 
                 {
        department: "CARDIOLOGIST",
        doctors: [
            "Dr. Debapriyo Mondal, MBBS., MD., DM.",
        ],
    },
      {
        department: "NEPHROLOGIST",
        doctors: [
            "Dr. Tapabrata Das, MBBS., MD., DM.",
        ],
    },
                 {
        department: "PAEDIATRIC NEUROLOGIST",
        doctors: [
            "Dr. Jasodhara Chaudhuri, MD. (Ped), MRCPCH, DM. (Neuro)",
        ],
    },
             {
        department: "GASTROENTEROLOGY & HEPATOLOGIST",
        doctors: [
            "Dr. Chandan Kumar Das, MBBS., MD., DM.",
            "Dr. Sugato Narayan Biswas, MBBS., MD., DM.",
        ],
    },
             {
        department: "GASTROENTEROLOGICAL & LAPAROSCOPIC SURGERY",
        doctors: [
            "Dr. Kalyanashis Mukherjee, DNB",
        ],
    },
                 {
        department: "RHEUMATOLOGIST",
        doctors: [
            "Dr. Debasish Kumar, MRCP",
        ],
    },
                        {
        department: "ENDOCRINE & BREAST SURGERY",
        doctors: [
            "Dr. Dhritiman Moitro, MS, Mch.",
        ],
    },
                           {
        department: "BREAST & PLASTIC SURGERY",
        doctors: [
            "Dr. Suparna Ghosh, MBBS, MS, Mch",
            "Prof. Dr. Srinjoy Saha, MBBS, MS, MCH(plast), FACS, FRCS (G Larg.)",
        ],
    }, 
      {
        department: "E.N.T. SURGEON",
        doctors: [
            "Dr. Sudipta Chandra, MBBS, MS (ENT), FRCS",
        ],
    },
     
  
         {
        department: "PSYCHIATRIST",
        doctors: [
            "Dr. Amlan Kusum Jana, MBBS, MD, DPM, MRCP SYCN",
            "Dr. Rudraprasad Acharya, MBBS, MD",
        ],
    },    
          
         {
        department: "PAEDIATRIC GASTROENTEROLOGIST",
        doctors: [
            "Dr. Gautam Ray, MD. (Ped), MRCPCH, DM. (Paed. Gastro)",
        ],
    },
               {
        department: "DERMATOLOGIST",
        doctors: [
            "Dr. Sambit Chaatterjee, MBBS., MD-DVL (WBUHS)",
            "Dr. Arindrajit Panja, MBBS., MD.",
            
        ],
    }, 
          {
        department: "E.N.T. SURGEON",
        doctors: [
            "Dr. Sudipta Chandra, MBBS, MS (ENT), FRCS",
        ],
    },
               {
        department: "PSYCHOLOGIST",
        doctors: [
            "Dr. Ranjan Roy Chowdhury, MS(ENT), FRCS",
            "Dr. Debarshi Roy, MBBS, MS (ENT), MRCS, DOHNS ",
            
        ],
    }, 
               

                         


];


const OutdoorServices: React.FC = () => {
    const departmentColors = [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500",
        "from-green-500 to-emerald-500",
        "from-orange-500 to-red-500",
        "from-indigo-500 to-blue-500",
        "from-teal-500 to-green-500",
    ];

    const getColorClass = (index: number) => departmentColors[index % departmentColors.length];

    return (
        <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-16 px-4 md:px-8 min-h-screen">
            
            {/* Title */}
            <div className="text-center mb-12">
                <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Outdoor Services</p>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 uppercase tracking-wide mb-2">
                    Outdoor Doctor List
                </h1>
                <p className="text-slate-500 text-base font-semibold">Expert Specialists Available for Consultation</p>
                <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">

                {outdoorServicesData.map((dept, deptIndex) => (
                    <div key={dept.department} className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">
                        
                        {/* Department Header */}
                        <div className={`bg-gradient-to-r ${getColorClass(deptIndex)} p-5 rounded-t-3xl`}> 
                            <h2 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider leading-tight">
                                {dept.department}
                            </h2>
                        </div>

                        {/* Doctor List */}
                        <div className="p-4 flex-1">
                            {dept.doctors.map((doctor, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 px-3 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-200"
                                >
                                    <UserRound
                                        size={16}
                                        className="text-blue-500 shrink-0 mt-0.5"
                                    />

                                    <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                                        {doctor}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OutdoorServices;