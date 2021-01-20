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
    const query = `SELECT * FROM ${this.name} WHERE _id =${id}`;
    const response = await this.run(query);
    return response;
  }
  async findById(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `SELECT * FROM ${this.name} WHERE _id =${id}`;
    const response = await this.run(query);
    return response;
  }
  async findByIdArticle(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `SELECT json_build_object('_id',a._id, 'headline',a.headline,  'subline',a.subhead, 'content',a.content, 'cover',a.cover, 'createdat',a.createdat, 'lastupdated',a.lastupdated,
    'author', json_build_object(
    '_id',u._id,
      'name',u.name,
      'surname', u.surname,
      'img', u.img),
    'category',json_build_object(
      '_id',c._id, 
      'img',c.img,
      'name',c.name))
  from articles AS a
  INNER JOIN authors AS u ON u._id=a.author_id 
  INNER JOIN categories AS c ON c._id=a.category_id
  WHERE a._id=${id} ;
   `;
    const response = await this.run(query);
    return response;
  }
  async findByIdArticleReviews(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `SELECT  json_build_object('_id',r._id, 'text',r.text, 'created_at',r.created_at, 'last_updated',r.last_updated,
  'author',json_build_object('_id',u._id ,'name',u.name, 'surname',u.surname, 'img',u.img))
  from ${this.name} AS r
  INNER JOIN authors AS u ON u._id=r.author_id 
  WHERE r.article_id=${id} `;
    const response = await this.run(query);
    return response;
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("Please provide an id!");
    }
    const query = `DELETE FROM ${this.name} WHERE _id=${id}`;
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
      const whereClause = `${entries.map(([key, value]) => (key.includes("id") ? `${key}='${parseInt(value)}'` : `${key} LIKE '%${value}%'`)).join(" AND ")}`;
      const query = `SELECT * FROM ${this.name} WHERE ${whereClause};`;
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
      const query = `SELECT * FROM ${this.name} WHERE ${whereClause};`;
      const { rows } = await this.run(query);
      if (rows.length !== 1) {
        throw new Error("The query parameters are not sufficent to identify a unique element");
      } else {
        const entries = Object.entries(updates);
        const query = `UPDATE ${this.name} SET ${entries.map(([column, value]) => `${column}='${value}'`).join(",")} WHERE _id=${rows[0]._id} RETURNING *;`;
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
