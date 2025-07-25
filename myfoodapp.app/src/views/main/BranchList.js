import React, {useEffect, useRef, useState}                                   from "react";
import {ScrollView, View}                                                     from "react-native";
import {Searchbar}                                                            from "react-native-paper";
import {useDispatch, useSelector}                                             from "react-redux";
import {Fade, Placeholder, PlaceholderLine, PlaceholderMedia}                 from "rn-placeholder";
import {branchGetBusinesses}                                                  from "../../api/branch";
import BusinessItem                                                           from "../../components/BusinessItem";
import Header                                                                 from "../../components/Header";
import useApi                                                                 from "../../hooks/useApi";
import {setBusinessPicked}                                                    from "../../store/businessReducer";
import {TYPE_DELIVERY, TYPE_PICKUP, TYPE_RESERVATION, TYPE_VIRTUAL_ASSISTANT} from "../../utils/constants";
import CartBar                                                                from "../../components/CartBar";
import CartButton                                                             from "../../components/CartButton";
import Space                                                                  from "../../components/Space";

export default ({route, navigation}) => {
    const dispatch                      = useDispatch();
    const {query, type, title}          = route.params;
    const [searchQuery, setSearchQuery] = useState(query);
    const searchInput                   = useRef();
    const branchApi                     = useApi(branchGetBusinesses);
    const {items}                       = useSelector(store => store.cart)
    console.log(items)

    const getBranches = async () => {
        await branchApi.request(type, searchQuery);
    };

    const branchClickHandler = async (business) => {
        await dispatch(setBusinessPicked({
                                             searchQuery: searchQuery, business: business, eventType: type,
                                         }));
        switch (type) {
            case TYPE_PICKUP.code:
                navigation.navigate('BusinessDetail');
                break;
            case TYPE_DELIVERY.code:
                navigation.navigate('LocationPicker');
                break;
            case TYPE_RESERVATION.code:
                navigation.navigate('BusinessDetail');
                break;
            case TYPE_VIRTUAL_ASSISTANT.code:
                navigation.navigate('BusinessDetail');
                break;
        }
    };

    // calling first time
    useEffect(() => {
        getBranches();
    }, []);

    // calling when empty
    useEffect(() => {
        if (searchQuery === '') getBranches();
    }, [searchQuery]);

    return (
        <View style={{flexDirection: 'column', flex: 1}}>
            <Header title={title}
                    onBackClick={() => navigation.goBack()}
            />
            <View style={{paddingHorizontal: 16}}>
                <Searchbar
                    ref={searchInput}
                    placeholder="Empresa, tipo de comida, plato"
                    placeholderTextColor="#efefef"
                    onChangeText={(text) => setSearchQuery(text)}
                    onBlur={() => {
                        getBranches();
                    }}
                    value={searchQuery}
                    style={{backgroundColor: '#cccccc', elevation: 0, marginVertical: 8}}
                    inputStyle={{color: 'white',}}
                    iconColor='white'
                />
            </View>

            {branchApi.loading ? <View style={{padding: 16}}>
                {[1, 2, 3].map((item) => (
                    <Placeholder key={item}
                                 Animation={Fade}
                                 Left={PlaceholderMedia}
                                 style={{marginBottom: 16}}
                    >
                        <PlaceholderLine width={80}/>
                        <PlaceholderLine/>
                        <PlaceholderLine width={30}/>
                    </Placeholder>
                ))}
            </View> : <ScrollView style={{flex: 1}}>
                 {
                     branchApi.loading
                     ? (
                         <View style={{padding: 16}}>
                             {[1, 2, 3].map((item) => (
                                 <Placeholder
                                     key={item}
                                     Animation={Fade}
                                     Left={PlaceholderMedia}
                                     style={{marginBottom: 16}}
                                 >
                                     <PlaceholderLine width={80}/>
                                     <PlaceholderLine/>
                                     <PlaceholderLine width={30}/>
                                 </Placeholder>
                             ))}
                         </View>
                     )
                     : branchApi.data && branchApi.data.map((business, index) => {
                         return <BusinessItem
                             key={index}
                             name={business.name}
                             address={business.address}
                             bannerUrl={business.bannerUrl}
                             logoUrl={business.logoUrl}
                             gallery={[]}
                             schedule={business.schedule}
                             tags={[]}
                             onBusinessClick={() => branchClickHandler(business)}
                         />;
                     })}
                 {!branchApi.loading && <Space height={48}/>}
             </ScrollView>}
            {!branchApi.loading && <CartButton/>}
        </View>
    );
}
