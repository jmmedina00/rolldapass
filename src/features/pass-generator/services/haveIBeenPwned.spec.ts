/* import fetchMock from "fetch-mock-jest"; */
import { rest } from "msw";
import { setupServer } from "msw/node";
import { checkPassword } from "./haveIBeenPwned";

describe("HaveIBeenPwned service", () => {
  const apiResults: { [key: string]: string[] } = {
    "7c4a8": [
      // Hashed password: 123456
      "D09CA3762AF61E59520943DC26494F8941B:37509543", // Remainder of "123456" hash
      "D0A4AA2E841C50022BB2EA424E43F8FC403:23",
      "D10B1F9D5901978256CE5B2AD832F292D5A:2",
      "D15BAADFD6D69CE574DE7BDA9B0B8D0004F:1",
      "D1618FACC3854462B7A0EF41914D22C41B6:3",
      "D21307CAE168387A4C8E7559BC65382D1DB:78",
    ],
    b1b37: [
      // Hashed password: qwerty - no remainders should match
      "AD71DF492652CBFE1E6ECAC648185F83C54:2",
      "ADD77A474621166496041D680F11B6D93EC:1",
      "AEB548D6DFBBA289D045147F1009E003614:1",
      "AEB5EBECA4DEF9ADB287B041B3B1D4C1693:3",
      "AF08054022BD6A46372B6B5AE35ED8321BB:1",
      "AF78CC8FF0E16872B3D7CD3503B1F663DC1:1",
    ],
    "91dfd": [
      // Hashed password: mypassword
      "C6F38D9F847A47D5C30FC2C0F5D183E8416:6",
      "C7488CC2B4D86F0FCABDEC93E41181EAFDF:1",
      "C7AF6AD921D0FEA20B1A513548C80B7085D:1",
      "C822A16E7F5C112A9DFF7BCB4A2B8174F48:1",
      "C84A4D14B3BA946253212E386FB00D3ECFF:1",
      "C8B9B65D792DE039F5ADFB6AC379DB5A228:1",
      "9DDB4198AFFC5C194CD8CE6D338FDE470E2:0", // Remainder of "mypassword" hash as filler
    ],
  };

  const server = setupServer(
    rest.get(
      "https://api.pwnedpasswords.com/range/:hashStart",
      (req, res, ctx) => {
        const { hashStart } = req.params;
        return res(
          ctx.body((apiResults[hashStart as string] || []).join("\r\n"))
        ); // HIBP terminates lines DOS-style
      }
    )
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.printHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should return true when hashed password has 1+ occurrences", async () => {
    expect(await checkPassword("123456")).toBeTruthy();
  });

  it("should return false when hashed password is not found in query", async () => {
    expect(await checkPassword("qwerty")).toBeFalsy();
  });

  it("should return false when hashed password has 0 occurrences (filler)", async () => {
    expect(await checkPassword("mypassword")).toBeFalsy();
  });
});
