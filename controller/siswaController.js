const conn = require('../config/connection')

exports.getSiswa = async(req,res) =>{
    let result = []
    try{
        let sql = `select * from tbl_siswa`
        conn.query(sql,(err,data)=>{
            if(err) throw err
            res.json({
                status:true,
                msg : 'Successfull',
                result : data
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Failed load data'
            }
        )
    }
}

exports.insertSiswa = async (req, res) => {
    try {
      const { nama, umur, alamat } = req.body;
  
      if (!nama || !umur || !alamat) {
        return res.status(400).json({
          status: false,
          msg: 'Invalid input. All fields are required.',
        });
      }
  
      const sql = 'INSERT INTO tbl_siswa (nama, umur, alamat) VALUES (?, ?, ?)';
      const values = [nama, umur, alamat];
  
      const result = await new Promise((resolve) => {
        conn.query(sql, values, (err, data) => {
          if (err) throw err;
          resolve(data);
        });
      });
  
      if (result.affectedRows > 0) {
        res.json({
          status: true,
          msg: 'Successful Insert',
        });
      } else {
        res.json({
          status: false,
          msg: 'Failed to insert data',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({
        status: false,
        msg: 'Internal Server Error',
      });
    }
  };
  

exports.updateSiswa = async(req,res) =>{
    
    try{
        let id = req.params.id
        let nama = req.body.nama
        let umur = req.body.umur
        let alamat = req.body.alamat

        let sql = `update tbl_siswa set nama=?,umur=?,alamat=? where id=?`
        let values = [nama,umur,alamat,id]
        conn.query(sql,values,(err,data)=>{
            if(err) throw err
            if(data.affectedRows > 0)
            res.json({
                status:true,
                msg : 'Successfull Updated'
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Failed load data'
            }
        )
    }
}

exports.deleteSiswa = async(req,res) =>{
    
    try{
        let id = req.params.id
        let sql = `delete from tbl_siswa where id=?`
        let values = [id]
        conn.query(sql,values,(err,data)=>{
            if(err) throw err
            
            res.json({
                status:true,
                msg : 'Delete Successfull'
            })
        })
    }
    catch(err){
        return res.json(
            {
                status:false,
                msg : 'Delete Failed'
            }
        )
    }
}