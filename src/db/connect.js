
/*
author: Paul Kim
date: February 22, 2024
version: 1.0
description: mongoose connnect db for CapyNext
 */

import mongoose from "mongoose";

const db = mongoose.connect(process.env.MONGO_URI);

export default db;