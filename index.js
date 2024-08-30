import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './database.js';
import signupModel from './Signup.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Problems from './ProblemTable.js';
import ProblemDetails from './ProblemDetails.js';
import { exec } from 'child_process';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import csvWriter from 'csv-write-stream';
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/signup', async (req, res) => {
   try { 
      const user = await signupModel.findOne({ email: req.body.email });
      if (!user) {
         const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const obj = {
         'username': req.body.username,
         'email': req.body.email,
         'password': hashPassword
      };
      const model = new signupModel(obj);
      await model.save();
      res.status(200).send({ message: 'User created successfully' });
   }
   else {
      res.status(400).send({ message: 'User Already exists' });
   }
 }
 catch(error) {
   res.status(400).send('Some Error occurred');
 }
});
app.post('/login', async (req, res) => {
   try {
      const { email, password } = req.body;
      const adminEmail = "kushalbharadwaj68@gmail.com";
      const adminPassword = "bunny123"; 
         const user = await signupModel.findOne({ email });
         if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (user.email === adminEmail) {
               if (!isValidPassword) {
                  res.status(401).send({ message: 'Invalid email or password' });
               }
               else {
                  const token = jwt.sign({ id: user._id }, 'kushal bharadwaj estari');
                  res.status(200).send({ data: token, message: 'Logged in successfully', admin: true, name: user.username});
               }
            }
            else {
               if (!isValidPassword) {
                  res.status(401).send({ message: 'Invalid email or password' });
               }
               else {
                  const token = jwt.sign({ id: user._id }, 'kushal bharadwaj estari');
                  res.status(200).send({ data: token, message: 'Logged in successfully', admin: false, name: user.username});
               }
            }
         }
         else {
            res.status(401).send({ message: 'Invalid email or password' });
         }
   }
   catch(error) {
      res.status(400).send('Some Error occurred');
   }
});
app.get('/problems', async (req, res) => {
   try {
      const data = await Problems.find({});
      res.status(200).json(data);
   }
   catch(error) {
      res.status(400).send("Some Error occurred");
   }
});
let problemId;
app.get('/problem/:id', async (req, res) => {
   const data = await ProblemDetails.findOne({ id: req.params.id });
   problemId = req.params.id;
   res.status(200).json(data);
});
app.post('/runcode', async (req, res) => {
   try {
      const { code } = req.body;
      const fileName = 'Main.java';
      const filePath = fileURLToPath(import.meta.url);
      const dirPath = dirname(filePath);
      const javaCode = `
            ${code}
            `;
    fs.writeFileSync(`${dirPath}/${fileName}`, javaCode);
   exec(`javac ${fileName} && java Main`, { cwd: dirPath }, (error, stdout, stderr) => {
      if (error) {
          /* console.error(`Compilation or execution error: ${error.message}`);*/
          console.log(`Java program output: ${stderr}`);
          return res.status(200).json({ output: stderr });
      }
      else {
          console.log(`Java program output: ${stdout}`);
          return res.status(200).json({ output: stdout, problemId });
      }
   });
}
catch (error) {
   console.log(error);
}
});
app.post('/submit-code', async (req, res) => {
   const { name, javaCode, status } = req.body;
   const writer = csvWriter({ sendHeaders: true });
   writer.pipe(fs.createWriteStream('codes.csv', { flags: 'a' }));
   if (!fs.existsSync('codes.csv')) {
      writer.write({Name: 'name', Code: 'code', Status: 'status'});
   }
   writer.write({Name: name, Code: javaCode, Status: status});
   writer.end();
});
app.get('/get-scores', async (req, res) => {
    exec(`python code.py`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error executing Python script');
      }
      res.json(`${stdout}`);
    });
});
app.listen(PORT, () => {
   console.log("Server Running");
});