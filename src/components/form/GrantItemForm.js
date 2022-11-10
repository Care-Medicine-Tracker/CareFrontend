import React from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default class GrantItemForm extends React.Component
{
    state = {
        id: '',
        userId: uuidv4(),
        measurementType: '',
        doseAmount: 0,
        intakeHour: 0,
        intakeMinute: 0,
        alertVisible: false,
        validated: false
    }

    componentDidMount()
    {
        if (this.props.item)
        {
            const { id } = this.props.item
            this.setState({ id });
        }
    }
    onChange = e =>
    {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitGrant = (e) =>
    {
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false)
        {
            e.stopPropagation();
        }
        else
        {
            this.grantItem();
        }

        this.setState({ validated: true });
    }

    async grantItem()
    {
        fetch(`${window.USER_MEDICINE_INVENTORY_ITEMS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.userId,
                MedicineId: this.state.id,
                MeasurementType: this.measurementType,
                DoseAmount: parseFloat(this.state.doseAmount),
                IntakeHour: parseInt(this.state.intakeHour),
                IntakeMinute: parseInt(this.state.intakeMinute),
            })
        })
            .then(async response =>
            {
                if (!response.ok)
                {
                    const errorData = await response.json();
                    console.error(errorData);
                    throw new Error(`Could not grant the item: ${errorData.title}`);
                }

                this.props.toggle();
            })
            .catch(err => 
            {
                this.showAlert(err.message);
            });
    }

    showAlert = (message) =>
    {
        this.setState({
            alertMessage: message,
            alertColor: "danger",
            alertVisible: true
        });
    }

    render()
    {
        return <Form noValidate validated={this.state.validated} onSubmit={this.submitGrant}>
            <Form.Group>
                <Form.Label htmlFor="userId">User Id:</Form.Label>
                <Form.Control type="text" name="userId" onChange={this.onChange} value={this.state.userId} required />
                <Form.Control.Feedback type="invalid">The User Id field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="measurementType">Measurement Type:</Form.Label>
                <Form.Control type="text" name="measurementType" onChange={this.onChange} value={this.state.measurementType} required />
                <Form.Control.Feedback type="invalid">The Measurement Type field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="doseAmount">Dose Amount:</Form.Label>
                <Form.Control type="number" name="doseAmount" onChange={this.onChange} value={this.state.doseAmount} required />
                <Form.Control.Feedback type="invalid">The Dose Amount field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="intakeHour">Intake Hour:</Form.Label>
                <Form.Control type="number" name="intakeHour" onChange={this.onChange} value={this.state.intakeHour} required />
                <Form.Control.Feedback type="invalid">The Intake Hour field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="intakeMinute">Intake Minute:</Form.Label>
                <Form.Control type="number" name="intakeMinute" onChange={this.onChange} value={this.state.intakeMinute} required />
                <Form.Control.Feedback type="invalid">The Intake Minute field is required</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Grant</Button>

            <Alert style={{ marginTop: "10px" }} variant={this.state.alertColor} show={this.state.alertVisible}>
                {this.state.alertMessage}
            </Alert>
        </Form>;
    }
}