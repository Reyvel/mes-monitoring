import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MyResponsivePie from './pie';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const getBoxes = (elements, classes) => {
    const boxes = []
    elements.forEach((element, idx) => {
        console.log(element)
        boxes.push(
            <Grid key={idx} item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                    <h2>Machine {idx + 1}</h2>
                    <MyResponsivePie data={element}/>
                </Paper>
            </Grid>
        )
    });

    return boxes
}

export default function MainGrid(props) {
    const classes = useStyles()
    const data = []

    for (let i = 0; i <= 10; i++){
        data.push(
            [
                {
                    "id": "reject",
                    "label": "reject",
                    "value": 100,
                    "color": "hsl(97, 70%, 50%)",
                    "backgroundColor": "#F47560"
                },
                {
                    "id": "good",
                    "label": "good",
                    "value": 100,
                    "color": "hsl(38, 70%, 50%)",
                    "backgroundColor": "#61CDBB"
                }
            ]
        )
    }

    const [elements, setElements] = React.useState(data)
    const boxes = getBoxes(elements, classes)
    const websocket = new WebSocket('ws://10.252.175.121:5123')
    websocket.onmessage = event => {
        const payload = JSON.parse(event.data)
        const newData = {...data}
        newData[payload.id - 1][0].value = payload.good;
        newData[payload.id - 1][1].value = payload.reject;
        setElements(newData);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {boxes}
            </Grid>
        </div>
    )
}