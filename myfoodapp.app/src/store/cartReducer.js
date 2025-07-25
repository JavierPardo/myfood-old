import {createSlice} from '@reduxjs/toolkit';

const slice    = createSlice(
    {
        name        : 'auth',
        initialState: {
            business  : {},
            type      : false,
            items     : [],
            assistance: {
                eventId: 0,
                enabled: false,
                orders : []
            }
        },
        reducers    : {
            addCartItem    : (state, action) => {
                const {
                          businessPicked,
                          eventType,
                          food,
                          quantity,
                          sides, options, totalAmount, note
                      } = action.payload;
                if (state.business.id !== businessPicked.id || state.type !== eventType) {
                    //	different branch or event, start new cart
                    state.business = businessPicked;
                    state.type     = eventType;
                    state.items    = [
                        {
                            food       : food,
                            quantity   : quantity,
                            sides      : sides,
                            options    : options,
                            totalAmount: totalAmount,
                            note       : note
                        }
                    ];
                }
                else {
                    state.items.push({
                                         food       : food,
                                         quantity   : quantity,
                                         sides      : sides,
                                         options    : options,
                                         totalAmount: totalAmount,
                                         note       : note
                                     });
                }
            },
            removeCartItem : (state, action) => {
                state.items = state.items.filter((item, index) => index !== action.payload);
            },
            clearCart      : (state) => {
                state.items = [];
            },
            startAssistant : (state, action) => {
                const {
                          businessPicked,
                          eventType,
                          eventId,
                      }                  = action.payload;
                state.assistance.enabled = true;
                state.assistance.eventId = eventId;
                state.business           = businessPicked;
                state.type               = eventType;
            },
            stopAssistant  : (state) => {
                state.assistance.enabled = false;
                state.assistance.orders  = [];
            },
            processNewOrder: (state) => {
                if (state.assistance.enabled)
                    state.assistance.orders.push(state.items);
                state.items = [];
            }
        }
    }
);
export const {
                 addCartItem,
                 removeCartItem,
                 clearCart,
                 startAssistant,
                 stopAssistant,
                 processNewOrder,
             } = slice.actions;
export default slice.reducer;
