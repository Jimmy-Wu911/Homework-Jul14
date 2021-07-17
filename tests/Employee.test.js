const Employee = require("../lib/Employee");

test("Can instantiate Employee instance", () => {
  const e = new Employee();
  expect(typeof(e)).toBe("object");
});

test("Can set attributes via constructor arguments", () => {
  const name = "Jimmy";
  const id = 2;
  const email = "jimmy@gmail.com";
  const e = new Employee(name,id,email);
  expect(e.name).toBe(name);
  expect(e.id).toBe(id);
  expect(e.email).toBe(email);
});


test("getRole() should return \"Employee\"", () => {
  const testValue = "Employee";
  const e = new Employee("Jimmy", 2, "jimmy@gmail.com");
  expect(e.getRole()).toBe(testValue);
});