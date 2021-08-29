const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("Get Github", () => {
    it("Should return the engineers github.", () => {
      const github = "joey27";

      const obj = new Engineer("joe", 1, "joe@gmail.com", github);

      expect(obj.getGithub()).toEqual(github);
    });
  });

  describe("Get Role", () => {
    it("Should return Engineer.", () => {
      const role = "Engineer";

      const obj = new Engineer("joe", 1, "joe@gmail.com", "joey27")
      
      expect(obj.getRole()).toEqual(role);
    });
  });
});