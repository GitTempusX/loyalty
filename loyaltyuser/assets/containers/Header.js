import React from 'react';
import {Text, View, Image} from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle} = styles;
    return (
        <View style={viewStyle}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    style={{width: 50, height: 50}}
                    source={require('../images/logo.png')}
                />
            </View>
            <View style={styles.leftView}>
                <Image style={{width: 20, height: 22, zIndex: 2, left: 15}} source={require('../images/coin.png')}/>
                <View style={styles.textView}>
                    <Text style={styles.textStyle}>100</Text>                
                </View>
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        flexDirection: 'row',
        backgroundColor: '#ab2d31',
        justifyContent: 'center',
        alignItems: 'center',
        height: '12%',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        color: 'white',
        fontFamily: 'Arial'
    },
    leftView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(20,20,20,0.3)',
        width: '60%',
        padding: 5
    }
};

export default Header;