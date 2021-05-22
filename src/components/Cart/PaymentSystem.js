import React, { useState } from 'react';
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout";
import SnackBar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const PaymentSystem = ({ totalPrice, user, hidden, onHidden, createLetter }) => {

    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');

    async function handleToken(token, addresses) {
        const response = await axios.post(
            "https://gfsxm.sse.codesandbox.io/checkout",
            { token, totalPrice }
        );
        const { status } = response.data;
        if (status === "success") {
            setMessage('Оплата прошла успешно');
            setOpen(!open);
            setSeverity('success');
            onHidden(hidden);
            createLetter();
        } else {
            setMessage('Ошибка оплаты');
            setOpen(!open);
            setSeverity('warning');
        }
    }
    return (
        <div>
            <SnackBar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <MuiAlert onClose={() => setOpen(false)} severity={severity} variant="filled">
                    <b className='snackBar-label'>{message}</b>
                </MuiAlert>
            </SnackBar>
            <StripeCheckout
                stripeKey="pk_test_51IlK3DDEwzHpeHPpKgpOx67nqnnU2Gay7CPHccuXX6vdGfgUlD24UrOIW72xkfl1rt62GcfqEMxE7ZGRnnY7spMz00gRF2Kh4C"
                token={handleToken}
                amount={totalPrice * 100}
                name="i-Bozh"
                email={user.email}
                image='../../My logo/logo_transparent.png'
                panelLabel={`Оплатить ${totalPrice} BYN`}>
                <button className="btn btn-light mr-2" hidden={hidden}>
                    Оплатить сейчас
                </button>
            </StripeCheckout>
        </div>
    );
}

export default PaymentSystem;