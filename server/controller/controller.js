const controlador = {};
const db = require('../db/db');


    controlador.getDatos = async (req, resp)=>{
        db.query('SELECT * FROM pruebatecnica.proyecto', 
            (err, result)=>{
                if(err){
                    console.log(err);
                }else{
                    resp.send(result);
                }
            }
        )
    }

    controlador.registrar = async (req, res)=>{
        const {system_id, system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation} = req.body.formData;

        try {
            await db.query('INSERT INTO pruebatecnica.proyecto (system_id, system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation) VALUES (?,?,?,?,?,?,?,?,?,?)', [system_id, system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation])
            res.json({ success: true, message: 'Registro exitoso' });
        }catch(err){
            console.log(err);
            res.status(500).json({success: false, mensaje: 'Error al insertar el registro en la base de datos'});
        }
    };

    controlador.actualizar = async (req, res) =>{
        console.log(req.body.formData);
        const {system_id, system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation} = req.body.formData;

        try{
            await db.query('UPDATE pruebatecnica.proyecto set system_name=?, location=?, inverter_brand=?, panel_brand=?,panel_power=?, panel_quantity=?, installed_power=?, current_generation=?, total_generation=? WHERE  system_id=?', [system_name, location, inverter_brand, panel_brand, panel_power, panel_quantity, installed_power, current_generation, total_generation, system_id]);
            res.json({ success: true, message: 'Proceso exitoso' });

        }catch(err){
            console.log(err);
            res.status(500).json({success: false, mensaje: 'Error al actualizar el registro en la base de datos'});
        }
    }
    controlador.eliminar = async (req, res) => {
        const id = req.params.id;
      
        try {
          await db.query('DELETE from pruebatecnica.proyecto WHERE system_id=?', [id]);
          res.json({ success: true, message: 'Proceso exitoso' });
        } catch (err) {
          res.status(500).json({ success: false, mensaje: 'Error al intentar eliminar el registro de la base de datos' });
        }
      };

module.exports = controlador;