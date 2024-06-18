export const genderList = [
  { label: "Pria", value: "male" },
  { label: "Wanita", value: "female" },
];

export const servicesList = [
  {
    id: 1,
    name: "Dokter",
    image: require("@/assets/images/Dokter-Icon.png"),
    service: "doctor",
  },
  {
    id: 2,
    name: "Perawat",
    image: require("@/assets/images/Perawat-Icon.png"),
    service: "nurse",
  },
  {
    id: 3,
    name: "Bidan",
    image: require("@/assets/images/Bidan-Icon.png"),
    service: "midwife",
  },
  {
    id: 4,
    name: "Fisioterapis",
    image: require("@/assets/images/Fisioterapis-Icon.png"),
    service: "physiotheraphy",
  },
  {
    id: 5,
    name: "Homecare",
    image: require("@/assets/images/Homecare-Icon.png"),
    service: "homecare",
  },
  {
    id: 6,
    name: "Caregiver",
    image: require("@/assets/images/Caregiver-Icon.png"),
    service: "caregiver",
  }
]

export const filterByLocation = [
  {
    name: "Terdekat",
    value: "TERDEKAT"
  },
  {
    name: "< 10 km",
    value: "KURANGDARI10KM"
  },
  {
    name: "> 10 km",
    value: "LEBIHDARI10KM"
  }
]

export const filterBySpeciality = [
  {
    name: "Semua",
    value: "ALL"
  },
  {
    name: "Umum",
    value: "Umum"
  },
  {
    name: "Spesialis Penyakit dalam",
    value: "Spesialis Penyakit dalam"
  },
  {
    name: "Spesialis Anak",
    value: "Spesialis Anak"
  },
  {
    name: "Spesialis Saraf",
    value: "Spesialis Saraf"
  },
  {
    name: "Spesialis Kandungan dan Ginekologi",
    value: "Spesialis - Kandungan dan Ginekologi"
  },
  {
    name: "Spesialis Bedah",
    value: "Spesialis Bedah"
  },
  {
    name: "Spesialis Kulit dan Kelamin",
    value: "Spesialis Kulit dan Kelamin"
  },
  {
    name: "Spesialis THT",
    value: "Spesialis THT"
  },
  {
    name: "Spesialis Mata",
    value: "Spesialis Mata"
  },
  {
    name: "Psikiater",
    value: "Psikiater"
  },
  {
    name: "Dokter Gigi",
    value: "Dokter Gigi"
  },
  {
    name: "Spesialis Kedokteran Forensik dan Rehabilitasi",
    value: "Spesialis Kedokteran Forensik dan Rehabilitasi"
  }
];

export const filterByPrice = [
  {
    name: "< Rp50.000",
    value: "KURANGDARI50K"
  },
  {
    name: "Rp50.000-Rp100.000",
    value: "LEBIHDARI50KKURANGDARI100K"
  },
  {
    name: "> Rp50.000",
    value: "LEBIHDARI50K"
  }
]