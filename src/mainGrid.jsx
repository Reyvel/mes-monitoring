import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MyResponsivePie from './pie';
import useInterval from './utils';


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
        boxes.push(
            <Grid key={element.id} item xs={12} sm={6} md={4}>
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
    const {syncUrl} = props;
    console.log(syncUrl)
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
    useInterval(() => {
        axios.get(syncUrl).then((resp) => {
            const payload = resp.data;
            const newData = [...elements];
            payload.forEach((datum, idx) => {
                newData[datum.id] = [...newData[datum.id]];
                if (datum.reject > 0 || datum.good > 0){
                    newData[datum.id][0].value = datum.reject;
                    newData[datum.id][1].value = datum.good;
                }else{
                    newData[datum.id][0].value = 100;
                    newData[datum.id][1].value = 100;
                }
            })
            setElements(newData);
        })
    }, 250)

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {boxes}
            </Grid>
        </div>
    )
}