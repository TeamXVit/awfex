import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {FUNCTIONS, engine} from "./awfex.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'))

app.get("/functions", (req, res)=>{
  try {
    res.json(Object.keys(FUNCTIONS));
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.post("/run", (req, res) => {
  try {
    const result = engine(req.body);
    res.json({ success: true, result });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => console.log("awfex running on port 5000"));
