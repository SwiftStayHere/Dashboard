const values = {};

// values.url = "http://localhost:5001";
// values.url = "https://marco-dashboard-backend.vercel.app";
values.url = "https://swiftstay-backend.vercel.app";

values.profileMenu = [
  {
    name: "Logout",
    url: "/",
  },
];
values.notific = [
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "profile",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
  {
    name: "notification 1",
    url: "/",
  },
];

values.filterData = [
  {
    name: "Trasporto",
    items: ["Treno", "Bus", "Aereo", "Nave", "Nessuna"],
  },
  {
    name: "Fonte",
    count: 1,
    items: [
      "infoischia",
    ],
  },
];

values.requestTH = [
  "ID",
  "User Details",
  "Date",
  "Source",
  "City",
  "Transport",
  "Room Types",
  "Period of Stay ",
  "Price",
  "Status",
];

values.userTH = [
  "ID",
  "Name",
  "Surname",
  "Email",
  "Telephone number",
  "Last quote requested",
  "Number of requests",
];



values.displayData = [
  {
    label: "Nome",
    value: "Connie",
  },
  {
    label: "Cognome",
    value: "Murray",
  },
  {
    label: "email",
    value: "patrizgasalci.arni61@gmail.com",
  },
  {
    label: "Numero di Telefono",
    value: " (+39) 567 - 567 - 891",
    country: true,
  },
];

values.generateUniqueString = () => {
  const array = new Uint32Array(2);

  window.crypto.getRandomValues(array);

  return (
    // "#" +
    Array.from(array, (dec) => dec.toString(36))
      .join("")
      .slice(0, 16)
  );
};

export default values;
