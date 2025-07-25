import React, {useState, useEffect}          from "react";
import {ScrollView, View}                    from "react-native";
import {Button, Paragraph, TextInput}        from "react-native-paper";
import DateTimePickerModal                   from "react-native-modal-datetime-picker";
import useApi                                from "../../hooks/useApi";
import {eventCreate, eventReservationCreate} from "../../api/event";
import {useSelector}                         from "react-redux";

export default () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode]                                = useState('date')
    const [date, setDate]                                = useState(new Date())
    const [quantity, setQuantity]                        = useState(0)
    const [message, setMessage]                          = useState('')
    const {businessPicked: business, eventType: type}    = useSelector(store => store.business);
    let eventApi                                         = useApi(eventCreate)
    const reservationApi                                 = useApi(eventReservationCreate)

    useEffect(() => {
        console.log('event', eventApi.data)
        console.log('reservation', reservationApi.data)
    }, [eventApi.data, reservationApi.data])

    const showDatePicker = () => {
        setMode('date')
        setDatePickerVisibility(true);
    };

    const showTimePicker = () => {
        setMode('time')
        setDatePickerVisibility(true);
    };
    const hidePicker     = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm   = (date) => {
        setDate(date);
        hidePicker();
    };
    const saveEvent       = async () => {
        await eventApi.request(business.id, {typeId: type});
        console.log('saving event');
    };
    const saveReservation = async () => {
        await reservationApi.request({
                                         eventId: eventApi.data, numberOfGuests: quantity, reservationDateTime: date
                                     })
        console.log('saving reservation');
    }
    const handleSend      = async () => {
        if (quantity > 0) {
            await saveEvent();
            await saveReservation();
            if (!eventApi.error && !reservationApi.error) {
                setMessage('Error al guardar la reservación');
            }
            else {
                setMessage('Reservacion guardada');
            }
        }
    }

    return (
        <View>
            <ScrollView>
                <View style={{padding: 16}}>
                    <TextInput
                        label="Cantidad de personas"
                        mode='outlined'
                        placeholder="para cuantas personas es la reserva?"
                        keyboardType='number-pad'
                        onChangeText={text => setQuantity(text)}
                        style={{marginBottom: 16}}
                    />
                    <Button mode='outlined'
                            icon='calendar'
                            style={{marginBottom: 16}}
                            onPress={showDatePicker}
                    >
                        Elige el dia ( {date.getFullYear()} - {date.getMonth() + 1} - {date.getDate()} )
                    </Button>
                    <Button mode='outlined'
                            icon='clock'
                            style={{marginBottom: 16}}
                            onPress={showTimePicker}
                    >
                        Elige la hora ( {date.getHours()} : {date.getMinutes()} )
                    </Button>
                    <Button mode='contained'
                            labelStyle={{color: 'white'}}
                            onPress={handleSend}
                            loading={eventApi.loading || reservationApi.loading}
                            disabled={eventApi.loading || reservationApi.loading}
                    >
                        Reservar
                    </Button>

                    {message.length > 0 && <Paragraph>
                        {message}
                    </Paragraph>}

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        date={date}
                        mode={mode}
                        onConfirm={handleConfirm}
                        onCancel={hidePicker}
                    />
                </View>
            </ScrollView>
        </View>
    )
};
