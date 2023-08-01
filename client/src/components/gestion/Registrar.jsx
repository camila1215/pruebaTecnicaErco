import React, { useState } from "react";
import {Button, Card, CardContent, CardHeader, Grid, InputAdornment} from '@mui/material';
import { TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Axios from 'axios';
import iconos from '../layout/IconosMaterial'

export default function Registrar(props){

    let proceso ={
        'I': 'registrar',
        'C': 'consultar',
        'D': 'eliminar'
    }

    let datos = {...props.datos}

    const noti = withReactContent(Swal);

    const [formData, setFormData] = useState(props.tipo === 'I' ?{
        system_name:'', location:'', inverter_brand:'', panel_brand:'', panel_power:'', panel_quantity:'', installed_power:'', current_generation:'', total_generation:'',
    }:{
        system_id: datos.system_id, system_name:datos.system_name, location:datos.location, inverter_brand:datos.inverter_brand, panel_brand:datos.panel_brand, panel_power:datos.panel_power, panel_quantity:datos.panel_quantity, installed_power:datos.installed_power, current_generation:datos.current_generation, total_generation:datos.total_generation
    })


const handleChange = (e) =>{
    setFormData(prev =>({...prev, [e.target.name]:e.target.value}));
}

const handleSubmit = () => {
    console.log(proceso[props.tipo]);
    Axios.post("http://localhost:3001/" + proceso[props.tipo], {
        formData
    }).then((response) => {
        if (response.data.success) {
            noti.fire({
                title: "<strong>Proceso exitoso!</strong>",
                html: `<i>El item <strong>"${formData.system_name}" </strong> fue registrado correctamente!</i>`,
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
            text: 'No se logró registrar el item!',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        });
    });
};


return(
    <div className="App">
        <Card >
            <CardHeader
                title={`Formulario para ${(proceso[props.tipo]).toLowerCase()} items`}/>
            <CardContent>
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6} xl={4}>
                            <TextValidator
                                name="system_name"
                                id="system_name"
                                value={formData.system_name}
                                label="System name"
                                className="input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.TextFormatIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                            <TextValidator
                                name="location"
                                id="location"
                                value={formData.location }
                                label="Location"
                                className="input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.LocationOnIcon/>
                                        </InputAdornment>
                                    )
                                }}                                  
                                onChange={handleChange}
                            />
                        </Grid>   
                        <Grid item xs={12} md={6} xl={2}>
                            <TextValidator
                                name="inverter_brand"
                                id="inverter_brand"
                                value={formData.inverter_brand  }
                                label="Inverter_brand"
                                className="input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.TextFormatIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid>   
                        <Grid item xs={12} md={6} xl={2}>
                            <TextValidator
                                name="panel_brand"
                                id="panel_brand"
                                value={formData.panel_brand}
                                label="Panel_brand "
                                className="input"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.TextFormatIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid> 
                        <Grid item xs={12} md={6} xl={1}>
                            <TextValidator
                                name="panel_power"
                                id="panel_power"
                                value={formData.panel_power }
                                label="Panel_power"
                                className="input"
                                type={'number'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.BoltIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid> 
                        <Grid item xs={12} md={6} xl={3}>
                            <TextValidator
                                name="panel_quantity"
                                id="panel_quantity"
                                value={formData.panel_quantity}
                                label="Panel_quantity"
                                className="input"
                                type={'number'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.NumbersIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid> 
                        <Grid item xs={12} md={6} xl={3}>
                            <TextValidator
                                name="installed_power"
                                id="installed_power"
                                value={formData.installed_power   }
                                label="Installed_power"
                                className="input"
                                type={'number'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.BoltIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid>   
                        <Grid item xs={12} md={6} xl={3}>
                            <TextValidator
                                name="current_generation"
                                id="current_generation"
                                value={formData.current_generation}
                                label="Current_generation"
                                className="input"
                                type={'number'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.BatteryChargingFullIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} xl={3}>
                            <TextValidator
                                name="total_generation"
                                id="total_generation"
                                value={formData.total_generation     }
                                label="Total_generation"
                                className="input"
                                type={'number'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <iconos.SolarPowerIcon/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={handleChange}
                            />
                        </Grid>  
                        
                            <Grid item xs={12} md={12} xl={12}>
                                <div style={{display:'flex', justifyContent:'flex-end'}}>

                                {props.tipo !== 'C'?
                                    <>
                                        <Button sx={{border:'2px solid #AAD130', backgroundColor:'white', color:'black', marginRight: '10px', '&:hover': {background: "#AAD130"}}} color={"secondary"} variant={"contained"} onClick={()=>{props.reload()}}>Cancelar</Button>
                                        <Button sx={{backgroundColor:'#AAD130','&:hover': {background: "#AAD150"}}} type={'submit'}  variant={"contained"}>{proceso[props.tipo]}</Button>
                                    </>
                                    : 
                                    <Button sx={{border:'2px solid #AAD130', backgroundColor:'white', color:'black', marginRight: '10px', '&:hover': {background: "#AAD130"}}} color={"secondary"} variant={"contained"} onClick={()=>{props.reload()}}>Cancelar</Button> 
                                    }    
                                </div>
                            </Grid>
                                     
                    </Grid>
                </ValidatorForm>
            </CardContent>
        </Card>
    </div >
);

}