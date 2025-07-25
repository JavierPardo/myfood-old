import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { eventHttp } from '../../../services/http';

export default function Payment() {

    const { orderId } = useParams();
    

    useEffect(() => {
        eventHttp.refreshEventPayment(orderId)
            .then(function () {
                if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
                    window.ReactNativeWebView.postMessage("mensaje a react native");
                }

            });
        return () => {
        }
    }, [])


    return (
        <div>
            Payment
        </div>
    )
}
