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


const getBoxes = (elements, classes, data) => {
    const boxes = []
    elements.forEach((element, idx) => {
        boxes.push(
            <Grid key={idx} item xs={12} sm={6} md={4}>
                <Paper className={classes.paper}>
                    <h2>Machine {idx + 1}</h2>
                    <MyResponsivePie data={data}/>
                </Paper>
            </Grid>
        )
    });

    return boxes
}

export default function MainGrid(props) {
    const classes = useStyles()
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [data, setData] = React.useState([
        {
            "id": "reject",
            "label": "reject",
            "value": 493,
            "color": "hsl(97, 70%, 50%)",
            "backgroundColor": "#F47560"
        },
        {
            "id": "good",
            "label": "good",
            "value": 140,
            "color": "hsl(38, 70%, 50%)",
            "backgroundColor": "#61CDBB"
        }
    ])
    const boxes = getBoxes(elements, classes, data)

    React.useEffect(() => {
        setTimeout(() => {
           setData((data) => {
                const newData = [...data]
                newData[1].value += 500
                return newData;
        })
        }, 3000)
    }, [])

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                {boxes}
            </Grid>
        </div>
    )
}