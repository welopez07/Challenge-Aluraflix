import * as React from 'react';
import { useContext } from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { VideoContext } from '../Context/VideoContext';

export default function EliminarVideo({ video, onDelete }) {
    const [open, setOpen] = React.useState(false);
    const { deleteVideo } = useContext(VideoContext);

    const handleDelete = () => {
        deleteVideo(video.id);
        setOpen(false);
        if (onDelete) {
            onDelete();
        }
    };

    return (
        <React.Fragment>
            <Button
                sx={{
                    color: "#FFF",
                    border: "none",
                    '&:hover': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }
                }}
                variant="outlined"
                endDecorator={<DeleteForever />}
                onClick={() => setOpen(true)}
            >
                BORRAR
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle >
                        ¡CUIDADO!
                        <WarningRoundedIcon sx={{ color: "red" }} />
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        ¿Estás seguro que quieres eliminar este video?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" onClick={handleDelete}>
                            Si
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}