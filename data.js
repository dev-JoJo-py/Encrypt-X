const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Code = require("../models/code.js");
const Key = Buffer.from(process.env.Key, 'hex');

exports.getEncryptedData = async(req,res)=>{
    const {code,data,time} = req.body;
    try{
    const hashed_code = await bcrypt.hash(code,10);
    const createdAt = new Date();
    const expiresInMinutes = time || 60; 
    const expiresAt = new Date(createdAt.getTime() + expiresInMinutes * 60000);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-256-cbc",Key,iv);
        
        let encrypted_text = cipher.update(data,"utf8","hex");
        encrypted_text+=cipher.final("hex")

        await Code.create({
            code:hashed_code,
            iv:iv.toString("hex"),
            encrypted_data : encrypted_text,
            expiresAt:expiresAt,
            
        })

        res.render("home.ejs" , {
            sec_code : code,
        })

    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.getInfo = async (req, res) => {
  const enteredCode = req.body.code;

  try {
    const allCodes = await Code.find();

    for (const entry of allCodes) {
      const match = await bcrypt.compare(enteredCode, entry.code);
      if (match) {
        const iv = Buffer.from(entry.iv, "hex");
        const decipher = crypto.createDecipheriv("aes-256-cbc", Key, iv);

        let decrypted = decipher.update(entry.encrypted_data, "hex", "utf-8");
        decrypted += decipher.final("utf-8");

        return res.status(200).send(decrypted);
      }
    }

    // No match found
    res.render("home.ejs",{
        code:enteredCode,
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.showInfo = (req,res)=>{
    res.render("info.ejs")
}

exports.showForm = (req,res)=>{
    res.render("form.ejs")
}



 