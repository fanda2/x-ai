export const personMap = {
  // clients
  DeveloperSectorA: {
    name: "Developer Sector A",
    icon: "black",
    tag: "#c7bcff",
  },
  DeveloperSectorB: {
    name: "Developer Sector B",
    icon: "blue-black",
    tag: "#add8e6",
  },
  BuildingOwner: { name: "Building Owner", icon: "blue", tag: "#25c5ff" },

  // construction
  BuilderSectorA: { name: "Builder Sector A", icon: "gray", tag: "#d3d3d3" },
  BuilderSectorB: { name: "Builder Sector B", icon: "green", tag: "#43da4b" },
  SupplierA: { name: "Supplier A", icon: "orange", tag: "#ffa803" },

  // society
  LocalAuthority: {
    name: "Local Authority",
    icon: "red-light",
    tag: "#f67abb",
  },
  CitizenA: { name: "Citizen A", icon: "red", tag: "#ff6666" },
  CitizenB: { name: "Citizen B", icon: "yellow", tag: "#f6ff20" },

  // designer
  Designer: { name: "Designer", icon: "green-light", tag: "wheat" },
};

/**
 * 级联选择器
 */
export const personOptions = [
  {
    value: "clients",
    label: "Clients and Users",
    children: [
      {
        label: personMap.DeveloperSectorA.name,
        value: personMap.DeveloperSectorA.name,
      },
      {
        label: personMap.DeveloperSectorB.name,
        value: personMap.DeveloperSectorB.name,
      },
      {
        label: personMap.BuildingOwner.name,
        value: personMap.BuildingOwner.name,
      },
    ],
  },
  {
    value: "construction",
    label: "Construction Sector",
    children: [
      {
        label: personMap.BuilderSectorA.name,
        value: personMap.BuilderSectorA.name,
      },
      {
        label: personMap.BuilderSectorB.name,
        value: personMap.BuilderSectorB.name,
      },
      {
        label: personMap.SupplierA.name,
        value: personMap.SupplierA.name,
      },
    ],
  },
  {
    value: "society",
    label: "Society and Citizens",
    children: [
      {
        label: personMap.LocalAuthority.name,
        value: personMap.LocalAuthority.name,
      },
      {
        label: personMap.CitizenA.name,
        value: personMap.CitizenA.name,
      },
      {
        label: personMap.CitizenB.name,
        value: personMap.CitizenB.name,
      },
    ],
  },
];
