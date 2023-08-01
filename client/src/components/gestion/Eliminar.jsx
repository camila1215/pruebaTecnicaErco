import React, { useState } from "react";
import {Button, Grid, Typography} from '@mui/material';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Axios from 'axios';

export default function Eliminar(props){

 
    let datos = {...props.datos}

    const noti = withReactContent(Swal);

    const [formData, setFormData] = useState({
        system_id: datos.system_id, system_name:datos.system_name, location:datos.location, inverter_brand:datos.inverter_brand, panel_brand:datos.panel_brand, panel_power:datos.panel_power, panel_quantity:datos.panel_quantity, installed_power:datos.installed_power, current_generation:datos.current_generation, total_generation:datos.total_generation
    })

const handleSubmit = () => {
    console.log(formData);
    Axios.delete(`http://localhost:3001/eliminar/${formData.system_id}`)
    .then((response) => {
        if (response.data.success) {
            noti.fire({
                title: "<strong>Proceso exitoso!</strong>",
                html: `<i>El item <strong>"${formData.system_name}" </strong> fue eliminado correctamente!</i>`,
                icon: 'success',
                timer: 3000
            });
            props.reload();
        } else {
            noti.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.data.message,
                footer: "Intente más tarde"
            });
        }
    }).catch(function(error) {
        console.log(error);
        noti.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el item!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        });
    });
};


return(
    <div className="App">
           
            <Grid container spacing={2}  justifyContent={"center"}>
                <Grid item xs={12} md={12} xl={12}>
                    <Typography style={{textAlign: 'center'}}>¿Desea Eliminar el item?</Typography>
                    <Typography style={{textAlign: 'center'}}><b>{ formData.system_name }</b></Typography>
                </Grid>

                <Button sx={{border:'2px solid #AAD130', backgroundColor:'white', color:'black', marginRight: '10px', '&:hover': {background: "#AAD130"}}} color=               {"secondary"} variant={"contained"} onClick={()=>{props.reload()}}>Cancelar</Button>
                <Button sx={{backgroundColor:'#AAD130','&:hover': {background: "#AAD150"}}} type={'submit'} onClick={handleSubmit} variant={"contained"}>Eliminar</Button>
            </Grid>
    </div >
);
}