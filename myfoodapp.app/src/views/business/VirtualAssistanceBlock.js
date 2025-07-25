import React, {useState, useEffect} from "react";
import {ScrollView, View}           from "react-native";
import {Button, TextInput}          from "react-native-paper";
import useApi                       from "../../hooks/useApi";
import {eventCreate}                from "../../api/event";
import {useDispatch, useSelector}   from "react-redux";
import {startAssistant}             from "../../store/cartReducer";

export default () => {
    let eventApi                                      = useApi(eventCreate)
    const {businessPicked: business, eventType: type} = useSelector(store => store.business);
    const [table, setTable]                           = useState('');
    const [calling, setCalling]                       = useState(false);
    const dispatch                                    = useDispatch();
    const startEvent                                  = async () => {
        await setCalling(true)
        await eventApi.request(business.id, {
            typeId     : type,
            tableNumber: table
        })
    };

    const startVirtualAssistant                       = async () => {
        if (table.length > 0) {
            await startEvent()
        }
    };

    useEffect(() => {
        if (calling && !eventApi.error) {
            console.log('eventID', eventApi.data);
            dispatch(startAssistant({businessPicked: business, eventType: type, eventId: eventApi.data}));
            setCalling(false)
        }
    }, [eventApi.data])

    return (
        <View>
            <ScrollView>
                <View style={{padding: 16}}>
                    <TextInput
                        label="En que mesa se encuentra?"
                        mode='outlined'
                        placeholder="A 12"
                        keyboardType='number-pad'
                        value={table}
                        onChangeText={text => setTable(text)}
                        style={{marginBottom: 16}}
                    />
                    <Button mode='outlined'
                            icon='camera'
                            style={{marginBottom: 16}}
                    >
                        Escanear QR Code
                    </Button>
                    <Button mode='contained'
                            labelStyle={{color: 'white'}}
                            onPress={startVirtualAssistant}
                            loading={eventApi.loading}
                            disabled={eventApi.loading}
                    >
                        Iniciar ordenes
                    </Button>
                </View>
            </ScrollView>
        </View>
    )
};
