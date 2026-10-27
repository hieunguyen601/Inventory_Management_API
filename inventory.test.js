import { test, expect } from "vitest";
import app from "./app.js";
import request from "supertest";

test("GET /api/inventory return all inventory", async () => {
  const response = await request(app).get("/api/inventory");
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);

  if (response.body.length > 0) {
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("price");
    expect(response.body[0]).toHaveProperty("quantity");
  }
});

test("POST /api/inventory create a new item", async () => {
  const newItem = {
    name: "laptop",
    price: "700",
    quantity: "8",
  };

  const response = await request(app).post("/api/inventory").send(newItem);
  expect(response.status).toBe(201);
});
