import { signup } from './services';


describe("test usersService function", () => {

    it("works", async () => {
        const input = {
            email: 'john@mail.com',
            password: 'somepassword'
        }
  
        const result = await signup(input);
    
        expect(result).toMatchObject({
            user: {
                email: input.email,
                id: expect.toBeNumber(),
            },
            tokens: {
                accessToken: expect.toBeString(),
                refreshToken: expect.toBeString(),
            }
        });
    });
});
