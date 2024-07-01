import React, { useCallback } from 'react';
import { Form, Input, InputNumber, Row, Col, Select, Typography, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;
const { MonthPicker } = DatePicker;


const carMakes = [
  "ALFA_ROMEO", "AUDI", "BEDFORD", "BEI_BEN", "BENTLEY", "BMW", "CADILLAC",
  "CAM", "CHEVROLET", "CHRYSLER", "CITROEN", "DAIHATSU", "DAEWOO", "DODGE",
  "EICHER", "FAW", "FERRARI", "FIAT", "FORD", "FOTON", "GREATWALL", "HINO",
  "HONDA", "HUMMER", "HYUNDAI", "INFINITY", "ISUZU", "IVECO", "JAC", "JAGUAR",
  "JEEP", "KIA", "LANDROVER", "LEYLAND", "DAF", "MACK", "MAHINDRA", "MAN",
  "MARUTI", "MAZDA", "MERCEDES", "MINI", "MITSUBISHI", "NISSAN", "NISSAN_DIESEL__UD",
  "OPEL", "PEUGEOT", "PORSCHE", "RENAULT", "ROVER", "SAAB", "SAILOR_MEIYA",
  "SCANIA", "SHACMAN", "SKODA", "SMART_CITY", "SUBARU", "SUZUKI", "SSANG_YONG",
  "TATA", "TELSA", "TIGGO", "TOYOTA", "LEXUS", "VAUXHALL", "VOLKSWAGEN", "VOLVO"
];

const toyotaModels = [
  "AMBULANCE - L/CRUISER HZJ78R-RJMRS STANDARD",
  "AMBULANCE - L/CRUISER HZJ78R-RJMRS DELUXE ",
  "AMBULANCE - L/CRUISER HZJ78R-RJMRS DUBAI SPECS",
  "AMBULANCE-HIACE 2KD KDH222R-LEMDY",
  "Allex",
  "aqua",
  "Auris",
  "Auris",
  "Auris",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE ",
  "ALPHARD/VELFIRE  EXCUTIVE LOUNGE with recliner passenger ( leather seats)",
  "ALPHARD/VELFIRE  EXCUTIVE LOUNGE with recliner passenger (leather seats)",
  "ALPHARD/VELFIRE  EXCUTIVE LOUNGE hybrid with recliner pass (leather seats)  ",
  "ALPHARD/VELFIRE  EXCUTIVE LOUNGE hybrid with recliner pass (leather seats) ",
  "ALPHARD EXCUTIVE LOUNGE MT (LEATHER  RECLINER SEATS)",
  "ALPHARD EXCUTIVE LOUNGE AT (LEATHER  RECLINER SEATS)",
  "Prius C",
  "Prius C",
  "Prius C",
  "AVANZA F602RM-GMMFJN-HI spec",
  "AVANZA F602RM-GMDFJN-Middle spec",
  "AVANZA F652RM-GMMFN-HI spec VVT-i",
  "AVANZA 35Z F654RM-GQDFN AUTO",
  "AVANZA 35Z F654RM-GMMFN MT",
  "Avensis 1.8L HB",
  "Avensis 1.8L SW",
  "Avensis 1.8L SAL",
  "Avensis 2.0L SW",
  "Avensis 2.0L SAL",
  "Avensis 2.0L SAL TDI ",
  "Avensis 2.2L SAL TDI",
  "Avensis 2.4L SAL",
  "Belta",
  "Belta",
  "Blade",
  "Caldina",
  "Caldina",
  "Caldina  1.8 L 1ZZ-FE I4",
  "Caldina  2.0 L 1AZ-FSE I4",
  "Caldina  2.0 L 3S-GTE I4 Turbo",
  "Cami",
  "Cami",
  "Camry SV40 AT",
  "Camry SV41 AT",
  "Camry ACV30 AT",
  "Camry ACV40R-AEANKW ",
  "Camry ACV40R-AEANKW ",
  "Camry AVV50-HYBRID",
  "Camry ASV50R-AEANKW AT",
  "Carina 1.6",
  "Carina 1.8",
  "Celica 2.0",
  "Celica 1.4",
  "Celica 1.6",
  "Celica 2.0",
  "Celica 2.2",
  "Chaser",
  "CH-R",
  "Coaster",
  "Coaster HZB70R-ZGMSS",
  "Condor 4x2",
  "Condor 4x4 fully loaded",
  "Corolla Axio NZE164-AEXGK 4WD CVT 1.5",
  "Corolla Axio NZE161-AEXGK CVT 1.5",
  "FIELDER- NZE161G AT",
  "Corolla Axio NZE161-AEXGK MT 1.5",
  "COROLLA FIELDER AEROTOURER- NZE161G MT",
  "COROLLA FIELDER AEROTOURER- NZE161G AT",
  "COROLLA FIELDER AEROTOURER- NZE164G AT",
  "Corolla Axio NKE165-AEXNB CVT 1.5",
  "COROLLA AXIO/ FIELDER HYBRID- NKE165G",
  "COROLLA FIELDER- NRE161G",
  "Corolla Rumion NZE151N-FHXEK",
  "Corolla Rumion ZRE152N-FHXSK",
  "Corolla Rumion ZRE154N-FHXSK",
  "Corolla Axio NZE141-AEXEK 1.5 G CVT",
  "Corolla Axio NZE144-AEXNK 1.5 X 4WD CVT",
  "Corolla Axio/ FIELDER NZE144",
  "Corolla Axio  ZRE142-AEXGP 1.8 LUXEL CVT",
  "Corolla Axio ZRE142-AEXGK",
  "Corolla Axio/ Fielder    ZRE142G-AWXEK",
  "Corolla Axio ZRE144-AEXGP 1.8 LUXEL 4WD",
  "COROLLA FIELDER-ZRE144",
  "Corolla Axio NRE160-AEXNK 1.3X CVT 1.3",
  "Corolla NZE 120R (A) STANDARD",
  "Corolla NZE 120R (A/C) ",
  "Corolla NZE 120R (B) FULLY LOADED",
  "Corolla NZE121 2wd",
  "Corolla NZE124 4wd",
  "Corolla NRE150R-DEFDK(A) 1.33",
  "Corolla NRE150R-DEFDK(A) WITH AC",
  "Corolla NRE150R-DEFNK(B) 1.33",
  "Corolla ZRE151R-DEMNK-(loaded spec)manual",
  "Corolla ZRE151R-DEMNK-(loaded spec)auto",
  "Corolla ZRE152R-DEFNK (Manual)",
  "Corolla ZRE152R-DEPNK (Auto)",
  "Corolla ALTIS ZRE171R- CVT",
  "Corolla Axio/ Fielder    ZRE162 ",
  "Corolla ZRE181R-GEXNKN CVT",
  "Corolla ZRE182R-GEXNKN MT",
  "Corolla ZRE182R-GEXNKN CVT",
  "Corolla ZRE182R-GEFNKN MT",
  "Corolla ZRE182R-GEXGKN CVT",
  "Corolla ZZE122R",
  "Corolla ZZE121R",
  "Corolla ZZE150R-DEMDK-(basic spec ) with AC",
  "Corolla ZZE150R-DEMDK-(basic spec) A",
  "Corolla ZZE150R-DEMNK-(loaded spec ) B",
  "Corolla Fielder(NZE121)",
  "Corolla Fielder(NZE124)",
  "Corolla Fielder(NZE141) axio",
  "Corolla Fielder(NZE141) axio",
  "Corolla G,L AND Z touring",
  "Corolla AE100/110/111  1.5",
  "Corolla AE100/110/111 1.6",
  "Corolla CE110/109/101 2.0",
  "Corolla CE110/109/101 2.2",
  "Corolla starlet",
  "Corona 1.6",
  "Corona E1.8",
  "Corona 2.0G",
  "Corsa 1.3",
  "Crown Royal",
  "Crown HYBRID",
  "Crown Athlete V6",
  "Crown Athlete V6",
  "Duet 1.0",
  "Estima",
  "Etios ",
  "Funcargo 1.3",
  "Funcargo 1.5",
  "Fortuner KUN51R - NKPSYD 1KD AUTO TURBO",
  "Fortuner KUN51R - NKMSYN 1KD MANUALTURBO",
  "Fortuner KUN6R - NKPDHN AUTO TURBO",
  "Fortuner LAN50-NKMSEN 3.0L  hi-spec",
  "Fortuner LAN50-NKMSEN 3.0L  me-spec",
  "Fortuner TGN61 MANUAL",
  "Fortuner TGN61 AUTO",
  "Fortuner KUN155-SNTLHN AT",
  "Fortuner KUN156-SNASYN AT",
  "FortunerKUN156-SNAFYN MT",
  "Fortuner 1GD GUN156R-SNFSHN MT",
  "Fortuner 1GD GUN156R-SNTSHN AT",
  "Fortuner  GUN166R-SNfSHN AT",
  "Gaia",
  "Harrier ACU 30",
  "Harrier ACU 35",
  "Harrier MCU 30",
  "Harrier MCU 35",
  "Harrier GCU 30 ",
  "Harrier GCU 35  ",
  "Harrier XU10  2WD",
  "Harrier XU10 4WD",
  "Harrier XU30 4WD",
  "Harrier XU60 2WD",
  "Harrier XU60 4WD",
  "Harrier XU60 2WD",
  "Harrier XU60 4WD",
  "Harrier  Hybrid ZSU60",
  "Harrier  Hybrid ZSU65",
  "Harrier  Hybrid ZSU60",
  "Harrier  Hybrid ZSU65",
  "Harrier Hybrid MCU38 ",
  "Harrier Hybrid MhU38",
  "Hiace LH113",
  "Hiace LH172",
  "Hiace (LH114)",
  "Hiace (LH202R) REMDE",
  "HIACE LH212R-LEMDE",
  "HIACE KDH220R    MT 17 seats (Front 3 Rear 14)",
  "HIACE KDH222R LEMDY   MT Without seats",
  "HIACE KDH222R LEMDY   MT 15 seats (Front 3 Rear 12)",
  "HIACE KDH222R LEMDY   MT 17 seats (Front 3 Rear 14)",
  "Hiace 2KD KDH222R-LEMDY for Public Schools ",
  "HIACE MT 30 seater",
  "Hiace (RZH114)",
  "HIACE BB42R-BRMRS",
  "HIACE KDH200V-JEMDY",
  "HIACE KDH201V-JEMDY",
  "HIACE KDH205",
  "HIACE KDH212R-JEMDY ",
  "HIACE KDH212R-JEMDY WITH A/C",
  "HIACE KDH221",
  "HIACE KDH223B",
  "HIACE TRH223",
  "HIACE KDH206",
  "HIACE TRH203R - REMDK STD BODY",
  "HIACE TRH112R",
  "HIACE TRH200",
  "HIACE TRH221/224",
  "HILUX YN85",
  "HILUX  LN 85/100/107/145",
  "HILUX LN147",
  "HILUX LN166",
  "HILUX LN167",
  "HILUX 2.8L High Spec 1GD GUN126-DNFMHN MT",
  "HILUX 2.8L High Spec GUN126 1GD -DNTMHN AT",
  "HILUX 2.8L Mid Spec GUN126 1GD-DNTSHN AT",
  "HILUX Basic   2GD GUN125R-BNFXHN",
  "HILUX Basic   2GD GUN125R-BNFXHN MT",
  "HILUX Std 2GD GUN135R-BNFXHN",
  "HILUX  2GD GUN135R-BJFXHJ M/T",
  "HILUX Std 2GD GUN125R-BNFSHN m/t",
  "HILUX base  2GD GUN125R-DNFXHN m/t",
  "HILUX base  2GD GUN125R-Djfxhj m/t",
  "HILUX Deluxe  2GD GUN125R-DNFSHN",
  "HILUX   2GD GUN125R-DNtSHN auto",
  "HILUX MID SPEC 2GD GUN126R-DNTSHN AUTO",
  "HILUX HIGH SPEC 1GD GUN126R-DNFMHN MANUAL",
  "HILUX HIGH SPEC 1GD GUN126R-DNTMHN AUTO",
  "HILUX  KUN15R-TRMDYN",
  "HILUX KUN16R",
  "HILUX  KUN25R-TRMDYN",
  "HILUX  KUN25 DELUXE",
  "HILUX  KUN25R-PRMDHN DELUXE",
  "HILUX  KUN25R-PRMDHN-STD",
  "HILUX  KUN35R-PRMDHN",
  "HILUX  KUN26R-PRPSYN DELUXE IKD AUTOMATIC",
  "HILUX  KUN26R-PRMSYN DELUXE IKD MANUAL",
  "HILUX 3L  KUN126R-DNFMYN MANUAL",
  "HILUX 3L  KUN126R-DNAMYN AT",
  "HILUX 2.5L  KUN125R-DNFSYN",
  "HILUX 2.5L  KUN125R-BNFSYN",
  "HILUX  2.5L KUN122R-BNMXYN",
  "HILUX  TGN15R-TRMDKN",
  "HILUX  TGN26R - Manual",
  "HILUX  TGN26R - Auto",
  "Hilux Surf 3.0",
  "Hilux Surf 2.7",
  "Innova 1.5",
  "Innova 2.0",
  "Innova 2.5",
  "IPSUM 2.4",
  "iq",
  "ISIS",
  "Ist/Scion",
  "Ist/Scion",
  "Kluger 2.4 4WD",
  "Kluger 2.4 4WD",
  "Kluger 2.4 2WD",
  "Land Cruiser UZJ 200/100",
  "Land Cruiser GDJ150",
  "Land Cruiser GDJ151",
  "Land Cruiser HDJ 100 /101",
  "Land Cruiser HDJ 80/81",
  "Land Cruiser KDJ95/KZJ95/KZJ78",
  "Land Cruiser KDJ120 GKMEYN  GX TYPE STD",
  "Land Cruiser KDJ120 GKMEYN  GX TYPE FULLY LOADED",
  "Land Cruiser KDJ125W AUTO TURBO",
  "Land Cruiser KDJ150-GKAEY VX",
  "Land Cruiser KDJ150-GKAEY AT VX-L",
  "Land Cruiser KDJ150-GKAEY AT TX-L",
  "Land Cruiser KDJ150-GKAFY MT TX-L",
  "Land Cruiser KDJ150-GKMEE MT LJ",
  "Land Cruiser KZJ120R-GKMETQ TD Manual",
  "Land Cruiser KZJ120R-GKPETQ TD Auto (GX)",
  "Land Cruiser VZJ",
  "Land Cruiser RZJ",
  "Land Cruiser GRJ79/76K-DKMNK",
  "Land Cruiser 1HZ 4 Door Hardtop-  HZJ76R-RKMRS  ",
  "Landcruiser Pick up 1HZ  HZJ76R-RKMRS MT",
  "Land Cruiser HZJ 78R - RJMRS (TRAVERSE) Hardtop",
  "Land Cruiser 1HZ (TROOP CARRIER)   HZJ 78R-RJMRS Hardrop",
  "Land Cruiser HZJ 79R-TJMRS 4X4 Safari cruiser (without Conversion) ",
  "Landcruiser Pick up 1HZ  HZJ79R-DKMRS MT",
  "Land Cruiser HZJ 79R-TJMRS 4X4 Pick up",
  "Land Cruiser HZJ 105R - GNMNS",
  "Land Cruiser HZJ 80R - GNMNS",
  "Land Cruiser (HZJ 105R-GCMRS)",
  "Land Cruiser LJ78",
  "Land Cruiser LJ95",
  "Land Cruiser LJ120R-GKMEE(STD) 3.0L L/cruiser prado  STD spec ",
  "Land Cruiser LJ120R-GKMEE L/cruiser prado (fully loaded)",
  "Land Cruiser LJ150R-GKMEE(STD) 3.0L L/cruiser prado TX",
  "Land Cruiser LJ150R-GKMEE MT 3.0L L/cruiser prado LJ",
  "Land Cruiser TRJ120R-GKMEK(A) 2.7L L/cruiser prado STD",
  "Land Cruiser TRJ120R-GKMEK(A) 2.7L L/cruiser prado spec B(fully loaded)",
  "Land Cruiser TRJ125",
  "Land Cruiser TRJ150R-GKMEE(A) 2.7L L/cruiser prado TX-L",
  "Land Cruiser URJ201/202-(FABRIC SEATS) UR-FE/GX ",
  "Land Cruiser URJ201/202-GNZGKQ  ",
  "Lancruiser Cruiser URJ202R-GNTEKQ   AX",
  "Lancruiser Cruiser URJ202R-GNTEKQ   VX",
  "Lancruiser Cruiser URJ202R-GNTEKQ ZX",
  "Lancruiser Cruiser URJ202R-SAHARA",
  "Land Cruiser Prado (GX) GRJ120",
  "Land Cruiser Prado (GX) GRJ120",
  "Land Cruiser Prado (TX) GRJ150",
  "Land Cruiser Prado (TX) GRJ151",
  "Land Cruiser VDJ 76 LX",
  "Land Cruiser VDJ200R-KDMRZ-MANUAL STD",
  "Land Cruiser VDJ79R Mnual",
  "Land Cruiser VDJ 76 LX . VDJ76R-RKMNYQ",
  "Land Cruiser VDJ200R-GNMNZ GX MANUAL",
  "Land Cruiser VDJ200R-GNTNZ  GX AUTO",
  "Land Cruiser VDJ200R-GNTEZ-VX AT",
  "Land Cruiser VDJ200R-GNTEZ-VX MANUAL",
  "Landcruiser 1VD VDJ200R-GNTAZ GXR  AT",
  "Lancruiser Cruiser VDJ200R-GNTVZ VXR AT ",
  "Landcruiser 1UR URJ200R-GNTEKQ VX AT",
  "LANDRUISER FJ62/GSJ15W",
  "Marino",
  "Mark II 1.8",
  "Mark II 2.0",
  "Mark II BLIT",
  "Mark II ZIO",
  "Mark X 2WD AUTO",
  "Mark X 4WD AUTO",
  "Mark X 4WD AUTO",
  "Mark X ZIO 2WD AUTO",
  "Mark X ZIO 4WD AUTO",
  "Mark X ZIO 2WD AUTO",
  "Mirage 2.0",
  "MR2/ MR-S Convertible 1.8",
  "NADIA",
  "Noah /Voxy",
  "Noah /Voxy",
  "Opa",
  "PREVIA",
  "Rush 1.5G AUTO 2WD",
  "Rush 1.5G MANUAL 4WD",
  "Rush 1.5S AUTO 4WD",
  "Rush 1.5M Dual VVTI 4A/T F800RE-GQMF ",
  "Rush 1.5M Dual VVTI 4A/T F800RE-GQGF ",
  "Rav4/Vanguard ACA21 Manual",
  "Rav4/Vanguard ACA21 Auto",
  "Rav4/Vanguard ACA30/31/36 Manual",
  "Rav4/Vanguard ACA30/31/36 Auto",
  "Rav4/Vanguard  ACA30/31/36 (Auto)",
  "Rav4/Vanguard  ACA30/31/36(Manual)",
  "Rav4/Vanguard  ZSA42R-ANXXKQ CVT Low grade (Fabric)",
  "Rav4/Vanguard  ZSA42R-ANXGKQ CVT High grade (Leather)",
  "Rav4/Vanguard  ASA44R - ANFGKQ MT (Leather)",
  "Rav4/Vanguard  ASA44R - ANTGKQ AUTO (Leather)",
  "Rav4/Vanguard  ZSA42R-ANYXK CVT STD",
  "Rav4/Vanguard  ZSA42R-ANYGK CVT DLX",
  "Rav4/Vanguard  ZSA44R-ANxgpw CVT DLX",
  "Rav4/Vanguard  ZSA42R-ANYMK CVT MID",
  "Rav4/Vanguard  ZSA42R-ANYGK CVT DLX",
  "Rav4/Vanguard  ALA49",
  "Rav4/Vanguard  GSA33",
  "rav4/vanguard cvt std MXXXA52R-ANXXB",
  "rav4/vanguard cvt MID+ MXXXA54R-ANXMB",
  "rav4/vanguard cvt DLX ADVENTURE AXAA54R-ANZVB",
  "Sienta",
  "spade",
  "SPADE DBA-NSP140",
  "Liteace",
  "Liteace",
  "Liteace",
  "Liteace",
  "Town Ace 1.8",
  "Town Ace 2.0",
  "Town Ace 2.0",
  "Town Ace 2.2",
  "Town Ace 2.2",
  "Toyoace",
  "Toyoace",
  "Toyoace TRUCK",
  "Pixis Toyoace",
  "Spacio 1.5",
  "Spacio 1.6",
  "Spacio 1.9",
  "Dyna 3.7",
  "Dyna 4.0",
  "Dyna 2.0",
  "Passo",
  "Passo",
  "Platz 1.0",
  "Platz 1.3",
  "Porte",
  "Prius Hybrid",
  "Prius Hybrid",
  "Prius Hybrid",
  "Probox 1.5",
  "Probox 1.4",
  "Probox 1.3",
  "Allion/Premio T240 1.5L",
  "Allion/Premio T240 1.8L",
  "Allion/Premio T240 2.0L",
  "Allion/Premio T260 1.5L",
  "Allion/Premio T260 1.8L",
  "Allion/Premio T260 1.8L",
  "Allion/Premio T260 2.0L",
  "Allion/Premio T261 2.0L",
  "Allion/Premio T265 1.8L",
  "Ractis 1.0",
  "Ractis 1.3",
  "Ractis 1.5",
  "RAUM 1.3",
  "RAUM 1.5",
  "RUNX 1.5",
  "Scion",
  "Scion",
  "Scion xB/  Toyota bB",
  "Sprinter",
  "Sprinter",
  "Sprinter",
  "Succeed 2.0",
  "Succeed 1.5",
  "Verso",
  "Vios",
  "VISTA 2.0",
  "VISTA 2.0",
  "Verossa",
  "VITZ DBA-KSP90",
  "VITZ DBA-KSP90",
  "VITZ DBA‐NCP91",
  "VITZ DBA-KSP130",
  "VITZ DBA-KSP130",
  "VITZ DBA-NSP135",
  "Voltz",
  "Wish ZGE22W 1.8",
  "Wish ZGE22W 2.0",
  "Wish ZGE25W 1.8",
  "Will VI",
  "Will CYPHA",
  "Yaris",
  "SAI - Hybrid",
];

const bodyTypes = [
  "Coupe",
  "AMB",
  "BUS",
  "Convertible",
  "COUPE",
  "DOUBLE  CAB",
  "ESTATE",
  "EXTENDED CABIN",
  "HATCHBACK",
  "Mini Bus",
  "MIXER",
  "MPV",
  "P/MOVER",
  "PICK UP",
  "PM",
  "Rigid",
  "S/WAGON",
  "SALOON",
  "SINGLE CABIN",
  "SPORT",
  "SUV",
  "TIPPER",
  "TRACK/MIXER",
  "TRUCK",
  "VAN",
];

const fuels = [
  "CNG gas",
  "Diesel",
  "Electric",
  "Petrol",
  "Hybrid Diesel",
  "Hybrid Petrol"
];

const YearMonthPicker = ({form, formData, setFormData }) => {
  const handleInputChange = useCallback((value, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month() + 1; 

  const disabledDate = (current) => {
    const year = current.year();
    const month = current.month() + 2;

    if (year < 1990 || year > currentYear) {
      return true;
    }

    if (year === currentYear && month > currentMonth) {
      return true;
    }

    return false;
  };

  return (
    <Form.Item label="When was your vehicle manufactured?" name="dateOfManufacture">
      <MonthPicker
        className="w-full custom-input"
        picker="month"
        format="MMMM YYYY"
        value={formData.dateOfManufacture ? dayjs(formData.dateOfManufacture , 'YYYY-MM') : null}
        onChange={(date) => handleInputChange(date, 'dateOfManufacture')}
        disabledDate={disabledDate}
      />
    </Form.Item>
  );
};

const VehicleDetails = ({ form, formData, setFormData }) => {
  const handleInputChange = useCallback((value, field) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  }, [setFormData]);

  const YearMonthPicker = () => {  
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1; 
  
    const disabledDate = (current) => {
      const year = current.year();
      const month = current.month() + 2;
  
      if (year < 1990 || year > currentYear) {
        return true;
      }
  
      if (year === currentYear && month > currentMonth) {
        return true;
      }
  
      return false;
    };
  
    return (
      <Form.Item label="When was your vehicle manufactured?" name="dateOfManufacture">
        <MonthPicker
          className="w-full custom-input"
          picker="month"
          format="MMMM YYYY"
          value={formData.dateOfManufacture ? dayjs(formData.dateOfManufacture , 'YYYY-MM') : null}
          onChange={(date) => handleInputChange(date, 'dateOfManufacture')}
          disabledDate={disabledDate}
        />
      </Form.Item>
    );
  };

  return (
    <Form form={form} layout="vertical" initialValues={formData}>
      <Row gutter={16} style={{ marginBottom: '25px' }}>
        <Col span={24}>
          <Title level={5} >Please enter vehicle details</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }}>
        <Col span={12}>
          <Form.Item
            label="What is your vehicle registration number?"
            name="vehicleRegistrationNumber"
            rules={[{ required: true, message: "Please enter vehicle registration number!" }]}
          >
            <Input
              placeholder='Enter vehicle registration number'
              value={formData.vehicleRegistrationNumber}
              onChange={(e) => handleInputChange(e.target.value, 'vehicleRegistrationNumber')}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="What is the transmission of your vehicle?"
            name="transmission"
            rules={[{ required: true, message: "Please select the transmission of your vehicle!" }]}
          >
            <Select
              placeholder='Enter transmission'
              value={formData.transmission}
              onChange={value => handleInputChange(value, "transmission")}
            >
              <Option value="Automatic">Automatic</Option>
              <Option value="Manual">Manual</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }}>
        <Col span={12}>
          <Form.Item
            label="What is the make of your vehicle?"
            name="make"
            rules={[{ required: true, message: "Please select the make of your vehicle!" }]}
          >
            <Select
              placeholder='Enter make'
              value={formData.make}
              onChange={value => handleInputChange(value, "make")}
            >
              {carMakes.map(make => (
                <Option key={make} value={make}>
                  {make}
                </Option>
              ))}

            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="What is the model of your vehicle?"
            name="model"
            rules={[{ required: true, message: "Please select the model of your vehicle!" }]}
          >
            <Select
              placeholder='Enter model'
              value={formData.model}
              onChange={value => handleInputChange(value, "model")}
            >
              {toyotaModels.map(model => (
                <Option key={model} value={model}>
                  {model}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }}>
        <Col span={12}>
          <Form.Item
            label="What is the body type of your vehicle?"
            name="bodyType"
            rules={[{ required: true, message: "Please select body type of your vehicle!" }]}
          >
            <Select
              placeholder='Enter body type'
              value={formData.bodyType}
              onChange={value => handleInputChange(value, "bodyType")}
            >
              {bodyTypes.map(bodyType => (
                <Option key={bodyType} value={bodyType}>
                  {bodyType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <YearMonthPicker name="dateOfManufacture" value={formData.dateOfManufacture} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '25px' }}>

        <Col span={12}>
          <Form.Item
            label="Fuel"
            name="fuel"
            rules={[{ required: true, message: "Please enter select fuel!" }]}
          >
            <Select
              placeholder='Enter fuel'
              value={formData.fuel}
              onChange={value => handleInputChange(value, "fuel")}
            >
              {fuels.map(fuel => (
                <Option key={fuel} value={fuel}>
                  {fuel}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="What is the performance of your vehicle in cubic capacity?"
            name="performanceCC"
            rules={[{ required: true, message: "Please enter vehicle performance!" }]}
          >
            <InputNumber
              className="w-full custom-input-number"
              placeholder='Enter performance'
              addonAfter="cc"
              value={formData.performanceCC}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/(,*)/g, "")}
              onChange={value => handleInputChange(value, "performanceCC")}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>

  );
};

export default VehicleDetails;
