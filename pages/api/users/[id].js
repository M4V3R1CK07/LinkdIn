import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { name } = req.body;
    try {
      const client = await clientPromise;
      const db = client.db();

      const result = await db
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: { name } });

      if (result.modifiedCount === 1) {
        res.status(200).json({ message: "Name updated successfully" });
      } else {
        res.status(404).json({ message: "User not found or name is the same" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
