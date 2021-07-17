const Intern = require("../lib/Intern");

test("Can instantiate Intern instance", () => {
  const e = new Intern();
  expect(typeof(e)).toBe("object");
});

test("Can store school name via constructor initialization",()=>{
    const school = "school";
    const e = new Intern("Foo",2,"bar",school);
    expect(e.school).toBe(school);
})

test("getRole() should return \"Employee\"", () => {
    const testValue = "Intern";
    const e = new Intern("Jimmy", 2, "jimmy@gmail.com","school");
    expect(e.getRole()).toBe(testValue);
  });