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
    id: 1,
    name: "Terdekat",
    value: "TERDEKAT"
  },
  {
    id: 2,
    name: "< 10 km",
    value: "KURANGDARI10KM"
  },
  {
    id: 3,
    name: "> 10 km",
    value: "LEBIHDARI10KM"
  }
]

export const filterBySpeciality = [
  {
    id: 1,
    name: "Semua",
    value: "ALL"
  },
  {
    id: 2,
    name: "Umum",
    value: "Umum"
  },
  {
    id: 3,
    name: "Spesialis Penyakit dalam",
    value: "Spesialis Penyakit dalam"
  },
  {
    id: 4,
    name: "Spesialis Anak",
    value: "Spesialis Anak"
  },
  {
    id: 5,
    name: "Spesialis Saraf",
    value: "Spesialis Saraf"
  },
  {
    id: 6,
    name: "Spesialis - Kandungan dan Ginekologi",
    value: "Spesialis - Kandungan dan Ginekologi"
  },
  {
    id: 7,
    name: "Spesialis Bedah",
    value: "Spesialis Bedah"
  },
  {
    id: 8,
    name: "Spesialis Kulit dan Kelamin",
    value: "Spesialis Kulit dan Kelamin"
  },
  {
    id: 9,
    name: "Spesialis THT",
    value: "Spesialis THT"
  },
  {
    id: 10,
    name: "Spesialis Mata",
    value: "Spesialis Mata"
  },
  {
    id: 11,
    name: "Psikiater",
    value: "Psikiater"
  },
  {
    id: 12,
    name: "Dokter Gigi",
    value: "Dokter Gigi"
  },
  {
    id: 13,
    name: "Spesialis Kedokteran Forensik dan Rehabilitasi",
    value: "Spesialis Kedokteran Forensik dan Rehabilitasi"
  }
];

export const filterByPrice = [
  {
    id: 1,
    name: "< Rp50.000",
    value: "KURANGDARI50K"
  },
  {
    id: 2,
    name: "> Rp50.000",
    value: "LEBIHDARI50K"
  },
  {
    id: 3,
    name: "Rp50.000-Rp100.000",
    value: "LEBIHDARI50KKURANGDARI100K"
  }
]