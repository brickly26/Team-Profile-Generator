const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("Get School", () => {
    it("Should return the interns school.", () => {
      const school = "NYU";

      const obj = new Intern("joe", 1, "joe@gmail.com", school);

      expect(obj.getSchool()).toEqual(school);
    });
  });

  describe("Get Role", () => {
    it("Should return Intern.", () => {
      const role = "Intern";

      const obj = new Intern("joe", 1, "joe@gmail.com", "NYU")
      
      expect(obj.getRole()).toEqual(role);
    });
  });
});