const manager = require("../lib/manager");

test("Can instantiate manager instance", () => {
  const e = new manager();
  expect(typeof(e)).toBe("object");
});

test("Can store office number via constructor initialization",()=>{
    const number = "123456";
    const e = new manager("Foo",2,"bar",number);
    expect(e.getOfficeNumber()).toBe(number);
})

test("getRole() should return \"Employee\"", () => {
    const testValue = "Manager";
    const e = new manager("Jimmy", 2, "jimmy@gmail.com","123456");
    expect(e.getRole()).toBe(testValue);
  });