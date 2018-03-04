import React,{Component} from 'react';
import {Text, View, Image} from 'react-native';
import {Button} from 'native-base';
import Card from './Card';
import QRScreen from './QRScreen';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ProductDetail extends Component {

    constructor(props){
        super(props);
    }
    render(){
        const {Id, image, Points, Provider, Title} = this.props.product;
        const {TitleStyle, ImageStyle, TopViewStyle, BottomViewStyle, PointsStyle, ButtonStyle, ButtonTextStyle} = styles;
        return(
            <Card>
                <View style={TopViewStyle}>
                    <View style = {{flex: 3}}>
                        <Text style={TitleStyle}>{Title}</Text>
                        <Text>{Provider}</Text>
                    </View>
                    <View style = {{flex: 1}}>
                        <Image style={ImageStyle} source={{uri: image}}/>
                    </View>
                </View>
            <View style={BottomViewStyle}>
                <Text style={PointsStyle}>{Points} Points</Text>
                <Button danger onPress={() => {this.props.selectProduct(this.props.product); Actions.QRCode()}} style={ButtonStyle}>
                    <Text style={ButtonTextStyle}>Obtener</Text>
                </Button>
            </View>
            </Card>
        );
    }
}

const styles = {
    TitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5
    },
    ImageStyle: {
        height: 75,
        width: 75,
        borderRadius: 5,
        marginTop: '2%'
    },
    TopViewStyle: {
        flexDirection: 'row',
        paddingTop: 7,
        marginLeft: 10
    },
    BottomViewStyle: {
        flexDirection: 'row',
        marginTop: 15
    },
    PointsStyle: {
        color : '#6d6',
        fontSize: 20,
        marginLeft: 30,
        marginTop: '2%'
    },
    ButtonStyle: {
        height: 40,
        width: 100,
        justifyContent: 'center',
        marginLeft: '30%',
        marginBottom: '2%'
    },
    ButtonTextStyle: {
        fontSize: 16,
        color: "#fff"
    }
};

export default connect(null, actions)(ProductDetail);