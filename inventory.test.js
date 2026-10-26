import { test, expect } from "vitest";
import app from "./app.js";
import request from "supertest";

test("GET /api/inventory return all items", async () => {
  const response = await request(app).get("/api/inventory");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
