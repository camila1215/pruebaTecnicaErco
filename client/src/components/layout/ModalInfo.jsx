import React, {useState , useEffect} from 'react';
import { Box, Modal, Paper } from '@mui/material';


export function ModalInfo({title,content ,close ,  tam , abrir, subtitle}){
    const [open , setOpen] = useState(abrir);
    useEffect(() => {
        setOpen(abrir);
    }, [abrir]);
    return (
        <Modal open={open} onClose={() => {close()}} className={"modalCenter"} >
            <Paper className= {tam} >
                <div className={"modalHeader"} >
                    <div className={"iconLateral"}><div></div></div>
                    <h3>{title}</h3>
                    <h4 className={"subtituloModal"}>{subtitle}</h4>
                </div>
                <Box className={"modalContent"}>
                    {content}
                </Box>
            </Paper>
        </Modal>
    );
}