import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const { Pool } = pg;

const pool = new Pool({
  host: "localhost",
  database: "inventory_management",
  password: "123456",
  port: "5432",
  user: "postgres",
});

app.post("/api/inventory", async (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || !price) {
    return res.status(400).status({
      message: "Name or price required!",
    });
  }

  try {
    const result = await pool.query(
      `
            INSERT INTO inventory (
            name,
            price,
            quantity
            ) VALUES (
            $1, $2, $3 RETURNING *
            )
            `,
      [name, price, quantity],
    );

    res.status(201).json({
      message: "Item added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Couldn't process the inventory", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.get("/api/inventory", async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT * FROM inventory
        ORDER BY name
        `);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Items not found",
      });
    }

    res.status(200).json({
      message: "Fetch data successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Can't process the inventory", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.patch("/api/inventory", async (req, res) => {
  try {
    const { id } = req.params;
    const { price, quantity } = req.params;

    const result = await pool.query(
      `
            UPDATE inventory
            SET price = $1, quantity = $2
            WHERE id = $3 RETURNING *;
            `,
      [price, quantity, id],
    );

    if ((!price, !quantity)) {
      return res.status(400).json({
        message: "Price and quantity required",
      });
    }

    res.status(201).json({
      message: "Update inventory successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Couldn't process the inventory", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.delete("/api/inventory", async (req, res) => {
  try {
    const { id } = id;
    const result = await query.pool(
      `
            DELETE FROM inventory
            WHERE id=$1
            RETURNING *;
            `,
      [id],
    );

    res.status(200).json({
      message: "Delete the item successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Couldn't delete the item", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default app;
