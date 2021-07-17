const Engineer = require("../lib/Engineer");

test("Can instantiate Engineer instance", () => {
  const e = new Engineer();
  expect(typeof(e)).toBe("object");
});

test("Can store github username via constructor initialization",()=>{
    const github = "Jimmy";
    const e = new Engineer("Foo",2,"bar",github);
    expect(e.github).toBe(github);
})

test("getRole() should return \"Employee\"", () => {
    const testValue = "Engineer";
    const e = new Engineer("Jimmy", 2, "jimmy@gmail.com","github");
    expect(e.getRole()).toBe(testValue);
  });