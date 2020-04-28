import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function CustomizedSelects(props) {
    const {type, setType} = props;
    const classes = useStyles();
    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
        <div style={{ width: "100%" }}>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="demo-customized-select-native">Monitoring</InputLabel>
                    <NativeSelect
                        id="demo-customized-select-native"
                        value={type}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        {/* <option aria-label="None" value="" /> */}
                        <option value={"accumulation"}>Accumulation</option>
                        <option value={"availability"}>Availability</option>
                        <option value={"performance"}>Performance</option>
                        <option value={"quality"}>Quality</option>
                        <option value={"oee"}>OEE</option>
                    </NativeSelect>
                </FormControl>
            </Box>
        </div>
    );
}