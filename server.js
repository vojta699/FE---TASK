import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs";

const app = express();
app.use(express.json());

app.use(cors({
    origin: "*"
}));

const file = "public/example-data.json";
if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
}

const adapter = new JSONFile(file);
const db = new Low(adapter, []);

async function loadData() {
    await db.read();
    db.data ||= [];
}

// GET
app.get("/tree", async (req, res) => {
    await loadData();
    res.json(db.data);
});

// DELETE
app.delete("/tree/:id", async (req, res) => {
    await loadData();
    const id = req.params.id;

    function removeRecursively(nodes, idToRemove) {
        return nodes
            .filter(node => node.data.ID !== idToRemove)
            .map(node => ({
                ...node,
                children: Object.fromEntries(
                    Object.entries(node.children || {}).map(([key, group]) => [
                        key,
                        { records: removeRecursively(group.records || [], idToRemove) }
                    ])
                )
            }));
    }

    db.data = removeRecursively(db.data, id);
    await db.write();
    res.sendStatus(200);
});

app.listen(3001, () => {
    console.log("Mock server running on http://localhost:3001");
});
