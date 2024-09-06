import { Response, FormData } from "./types";
import { users } from "./users";

export const mockRequest = (payload: FormData): Promise<Response> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = users?.find((user) => user.email === payload.email);

      if (user && user?.password === payload.password) {
        resolve({
          ok: true,
          status: 200,
          json: JSON.stringify("succesful"),
        });
      } else if (user && user?.password !== payload.password) {
        resolve({
          ok: false,
          status: 200,
          json: JSON.stringify("wrong password"),
        });
      } else {
        resolve({
          ok: false,
          status: 404,
          json: JSON.stringify("user does not exist"),
        });
      }
    }, 3000)
  );
