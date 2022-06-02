import getProjectClientNameAndEmployeeNames from "./getProjectClientNameAndEmployeeNames";

test("function puts the relevant names in place of the ids for employees and adds client name", () => {
  expect(
    getProjectClientNameAndEmployeeNames(
      inputProjectData,
      inputClientData,
      inputEmployeeData
    )
  ).toStrictEqual(expectedOutput);
});

const inputProjectData = [
  {
    id: "f0b83d3a0b77da97ec7eefc4",
    clientId: "clientid1",
    employeeIds: ["id1", "id2", "id3"],
    contract: {
      startDate: "Thu Jun 20 2019",
      endDate: "Thu Dec 30 2021",
      size: "47362.95",
    },
  },
  {
    id: "3c8a1083d6befcfbbb1cca37",
    clientId: "clientid2",
    employeeIds: ["id4", "id5"],
    contract: {
      startDate: "Sat Jan 02 2021",
      endDate: "Mon Jun 21 2021",
      size: "29267.84",
    },
  },
  {
    id: "a6854a347b16abfa4b455aa4",
    clientId: "clientid3",
    employeeIds: ["id1", "id3", "id5"],
    contract: {
      startDate: "Fri Apr 01 2022",
      endDate: "Mon Apr 11 2022",
      size: "9497.91",
    },
  },
];

const inputClientData = [
  { id: "clientid1", name: "clientName1" },
  { id: "clientid2", name: "clientName2" },
  { id: "clientid3", name: "clientName3" },
];

const inputEmployeeData = [
  { id: "id1", name: "name1", avatar: "", role: "" },
  { id: "id2", name: "name2", avatar: "", role: "" },
  { id: "id3", name: "name3", avatar: "", role: "" },
  { id: "id4", name: "name4", avatar: "", role: "" },
  { id: "id5", name: "name5", avatar: "", role: "" },
];

const expectedOutput = [
  {
    id: "f0b83d3a0b77da97ec7eefc4",
    clientId: "clientid1",
    client: "clientName1",
    employeeIds: ["id1/name1", "id2/name2", "id3/name3"],
    contract: {
      startDate: "Thu Jun 20 2019",
      endDate: "Thu Dec 30 2021",
      size: "47362.95",
    },
  },
  {
    id: "3c8a1083d6befcfbbb1cca37",
    clientId: "clientid2",
    client: "clientName2",
    employeeIds: ["id4/name4", "id5/name5"],
    contract: {
      startDate: "Sat Jan 02 2021",
      endDate: "Mon Jun 21 2021",
      size: "29267.84",
    },
  },
  {
    id: "a6854a347b16abfa4b455aa4",
    clientId: "clientid3",
    client: "clientName3",
    employeeIds: ["id1/name1", "id3/name3", "id5/name5"],
    contract: {
      startDate: "Fri Apr 01 2022",
      endDate: "Mon Apr 11 2022",
      size: "9497.91",
    },
  },
];
