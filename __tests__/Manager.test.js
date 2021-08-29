const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("Get Office Number", () => {
    it("Should return the managers office number.", () => {
      const officeNum = 102;

      const obj = new Manager("joe", 1, "joe@gmail.com", officeNum);

      expect(obj.getOfficeNumber()).toEqual(officeNum);
    });
  });

  describe("Get Role", () => {
    it("Should return Intern.", () => {
      const role = "Manager";

      const obj = new Manager("joe", 1, "joe@gmail.com", 102)
      
      expect(obj.getRole()).toEqual(role);
    });
  });
});