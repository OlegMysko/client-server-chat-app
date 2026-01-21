'use strict';
import 'dotenv/config';
import { createServer } from "./createServer.js";
import { client } from './utils/bd.js';


const PORT = process.env.PORT || 3005
async function start() {
  try {
    await client.authenticate();
    console.log('database conected');
    await client.sync();
    console.log('tables created')
    const  {httpServer}=createServer()
    httpServer.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`)
    })
  } catch{
console.log('server error start')
  }

}
start()
