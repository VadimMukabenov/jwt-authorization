import { setupDB } from './utils';
import usersService from "../server/services/users.service";

// setupDB();


describe("test usersService function", () => {

  it("works", async () => {
    const input = {
        email: 'example@mail.com',
        password: 'somepassword'
    }

    const result = await usersService.signup(input);

    expect(result).toMatchObject({
        user: {
            email: input.email,
            id: expect.toBeNumber()
        },
        tokens: {
            accessToken: expect.toBeString(),
            refreshToken: expect.toBeString(),
        }
    });
  });
});
