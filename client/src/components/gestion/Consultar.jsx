import React, {useState, useEffect} from 'react';
import Axios from "axios";
import Registrar from "./Registrar";
import Actualizar from './Actualizar';
import Eliminar from './Eliminar';
import TablaDatos from '../layout/TablaDatos';
import {ModalInfo} from "../layout/ModalInfo";
import { Typography } from '@mui/material';


export default function Consultar(){
    const [data, setData] = useState([])
    const [modal, setModal] = useState({open: false, vista: 2, data: {}, titulo: {}, tamano: 'bigFlot'});
    const modales = [<Registrar datos={modal.data} tipo ={'C'} reload={()=>{cerrar();getDatos()}}/>,
                     <Actualizar datos={modal.data} tipo ={'U'} reload={()=>{cerrar(); getDatos()}}/>,
                     <Registrar tipo ={'I'} reload={()=>{cerrar();getDatos()}}/>,
                     <Eliminar datos={modal.data} reload={()=>{cerrar(); getDatos()}}/>,
                    ]

    const vistas = (data, tipo) => {
        setModal({ open: true, vista: tipo, data: data, titulo: '', tamano: tipo===3? 'smallFlot' : 'bigFlot' });
    }
    
    const cerrar = ()=>{
        setModal({open: false});
    }


    const getDatos = () =>{
        Axios.get('http://localhost:3001/getDatos').then((response)=>{
            setData(response.data);
        })
    }

    useEffect(()=>{
        getDatos();
    }, []);

    return(
      <div>
               <Typography variant="h4" gutterBottom>Gestión de proyectos de energía solar</Typography>
              <TablaDatos
                  datos={data}
                  ver={["system_name", "installed_power", "current_generation", "total_generation"
                  ]}
                  titulo={["Nombre", "Potencia instalada", "Generación actual", "Generación total", "Consultar","Editar", "Eliminar"]}
                  accion={[
                      {tipo:'B', icono:'visibility', color:'blue', funcion: (data) => {vistas(data, 0)}},
                      {tipo:'B', icono:'edit', color:'orange', funcion: (data) => {vistas(data, 1)}},
                      {tipo:'T', icono:'add', color:'green', funcion: (data) => {vistas(data, 2)}},
                      {tipo:'B', icono:'delete', color:'red', funcion:(data) => {vistas(data, 3)}},
                  ]}
                  style={{width:'60%'}}
                  funciones={{
                      search:true,
                  }}
              />
            
              <ModalInfo
                      title={modal.titulo}
                      subtitle={''}
                      content={modales[modal.vista]}
                      close={()=>{setModal({open: false, vista: 2, data: '', titulo: '', tamano: ''});getDatos()}}
                      tam={modal.tamano}
                      abrir={modal.open}
              />
      </div>
    );
}
