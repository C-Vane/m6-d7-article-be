const db = require("../db/pgDB");

class Model {
  constructor(name) {
    this.name = name;
  }
  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findById(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `SELECT * FROM ${this.name} WHERE _id=${id}`;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `DELETE  FROM ${this.name} WHERE _id=${id}`;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndUpdate(id, fields) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const entries = Object.entries(fields);
    const query = `UPDATE ${this.name} SET ${entries.map(([column, value]) => `${column}='${value}'`).join(",")} WHERE _id=${id} RETURNING *;`;
    const { rows } = await this.run(query);
    return rows;
  }

  async findOne(fields) {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const { rows } = await this.run(query);
      return rows;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries.map(([key, value]) => (!key.includes("id") ? `${key} LIKE '%${value}%'` : `${key}='${parseInt(value)}'`)).join(" AND ")}`;
      console.log(whereClause);
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const { rows } = await this.run(query);
      return rows;
    }
  }
  async findOneAndUpdate(fields, updates) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("Please add query parameters");
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries.map(([key, value]) => `${key}='${value}'`).join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE  ${whereClause};`;
      const { rows } = await this.run(query);
      if (rows.length !== 1) {
        throw new Error("The query parameters are not sufficent to identify a unique element");
      } else {
        const entries = Object.entries(updates);
        const query = `UPDATE ${this.name} SET ${entries.map(([column, value]) => `${column}='${value}'`).join(",")} WHERE _id=${id} RETURNING *;`;
        const { rows } = await this.run(query);
        return rows;
      }
    }
  }
  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("Please add the required values in the request body");
    }
    const columns = Object.keys(fields);
    const values = Object.values(fields);
    const query = `INSERT INTO  ${this.name} (${columns.join(",")}) VALUES (${values.map((v) => `'${v}'`).join(",")}) RETURNING *`;
    const { rows } = await this.run(query);
    return rows;
  }
}

module.exports = Model;
