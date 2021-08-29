const Employee = require("../lib/Employee");

describe('Employee', () => {
  describe('Get Name', () => {
    it("Should return the name of the employee.", () => {
      const name = "joe";

      const obj = new Employee(name, 1, "joe@gmail.com");

      expect(obj.getName()).toEqual(name);
    });
  });

  describe("Get ID", () => {
    it("Should return the ID of the employee.", () => {
      const ID = 3;

      const obj = new Employee("Joe", ID, "joe@gmail.com");

      expect(obj.getID()).toEqual(ID);
    });
  });

  describe("Get Email", () => {
    it("Should Return the email of the employee.", () => {
      const email = "joe@gmail.com";

      const obj = new Employee("joe", 1, email);

      expect(obj.getEmail()).toEqual(email);
    });
  });

  describe("Get Role", () => {
    it("Should return the email of the employee.", () => {
      const role = "Employee";

      const obj = new Employee("Joe", 1, "joe@gmail.com");

      expect(obj.getRole()).toEqual(role);
    })
  })
})