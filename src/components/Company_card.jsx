import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper } from '@mui/material';
import Draggable from 'react-draggable';
import Image from 'next/image';


function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function MediaCard({ company }) {

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "16px", bgcolor: "#bbdefb", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white'
        }}>
          <img
            style={{ height: '140px', objectFit: 'fill' }}
            src={company.logoPath}
            alt={'hello'}
            title="green iguana"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {company.organization}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.description.split(' ').slice(0, 15).join(' ') + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setDialogOpen(true)}>Read More</Button>
        </CardActions>
      </Card>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {company.organization}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {company.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
