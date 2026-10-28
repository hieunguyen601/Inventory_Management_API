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
    price: 685.20,
    quantity: 8,
  };

  const response = await request(app).post("/api/inventory").send(newItem);
  expect(response.status).toBe(201);
});

test("PATCH /api/inventory:id updates an item", async () => {
  const updatedQuantity = {
    quantity: 30,
  };

  const response = await request(app)
    .patch("/api/inventory/9")
    .send(updatedQuantity);
  expect(response.status).toBe(200);
});

test("DELETE /api/inventory:id deletes an item", async () => {
  const createResponse = await request(app).post("/api/inventory").send({
    name: "Keyboard",
    price: 89,
    quantity: 45,
  });

  expect(createResponse.status).toBe(201);

  const itemId = createResponse.body.data.id;

  const deleteResponse = await request(app).delete(`/api/inventory/${itemId}`);
  expect(deleteResponse.status).toBe(200);

  const getResponse = await request(app).get(`/api/inventory/${itemId}`);
  expect(getResponse.status).toBe(404);
});

test("DELETE returns 404 for nonexistent item", async () => {
    const response = await request(app).delete("/api.inventory/99999")
    expect(response.status).toBe(404);
});

test("POST /api/signup to sign up new account", async () => {
    const signupUser = await request(app).post("/api/signup").send({
        email: "hotboylatao601@gmail.com",
        password: "123456"
    });

    expect(signupUser.status).toBe(201);
})