import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class CreateAddress extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Button variant="contained" color='secondary'>
                    CREATE ADDRESS
                </Button>
            </div>
        );
    }
}

export default CreateAddress;