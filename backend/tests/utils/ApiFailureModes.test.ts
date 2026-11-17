/// <reference types="jest" />

import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import request from "supertest";
import { RegisterRoutes } from "../../src/routes";

const helloHandlers = {
  getHello: jest.fn(async () => ({ message: "ok", lang: "en" })),
  getLanguage: jest.fn(async () => "en"),
  postHello: jest.fn(async () => undefined),
  putHello: jest.fn(async () => undefined),
  patchHello: jest.fn(async () => undefined),
  delHello: jest.fn(async () => undefined),
};


jest.mock("../../src/controllers/HelloController", () => ({
  HelloController: class {
    public async getHello() {
      return helloHandlers.getHello();
    }
    public async getLanguage() {
      return helloHandlers.getLanguage();
    }
    public async postHello() {
      return helloHandlers.postHello();
    }
    public async putHello() {
      return helloHandlers.putHello();
    }
    public async patchHello() {
      return helloHandlers.patchHello();
    }
    public async delHello() {
      return helloHandlers.delHello();
    }
  },
}));

describe("API failure modes", () => {
  const app = express();
  app.use(express.json());
  RegisterRoutes(app);
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res
      .status(err?.status || 500)
      .json({ message: err?.message || "Internal Server Error" });
  });

  beforeEach(() => {
    Object.values(helloHandlers).forEach((fn) => fn.mockReset());

    helloHandlers.getHello.mockResolvedValue({ message: "ok", lang: "en" });
    helloHandlers.getLanguage.mockResolvedValue("en");
    helloHandlers.postHello.mockResolvedValue(undefined);
    helloHandlers.putHello.mockResolvedValue(undefined);
    helloHandlers.patchHello.mockResolvedValue(undefined);
    helloHandlers.delHello.mockResolvedValue(undefined);
  });

  it("returns 404 on unknown route", async () => {
    await request(app).get("/api/not-existing").expect(404);
  });

  it("returns 400 for malformed JSON payload", async () => {
    await request(app)
      .post("/api/hello")
      .set("Content-Type", "application/json")
      .send('{"broken":')
      .expect(400);
  });

  it("returns 500 when controller throws", async () => {
    helloHandlers.getHello.mockRejectedValue(new Error("boom"));

    const res = await request(app).get("/api/hello").expect(500);
    expect(res.body).toEqual(expect.objectContaining({ message: "boom" }));
  });
});
