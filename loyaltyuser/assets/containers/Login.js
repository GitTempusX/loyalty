import React from 'react';
import { View, Keyboard } from 'react-native';
import firebase from 'firebase';
import { Header , Button, Container, Text} from 'native-base';
import Input from './Input';  
import Spinner from './Spinner';
import { Actions } from 'react-native-router-flux';

export default class Login extends React.Component {

   componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({loggedIn: true });
        } else {
            this.setState({ loggedIn: false });
        }
    });
   }
    
    state = { email: '', password: '', error: '', loading: false}

    onButtonPress(){

        const { email, password } = this.state;
        this.setState({error: '', loading: true})

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSucces.bind(this), this.onLoginFail.bind(this))
            /* 
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email , password)
                    .then(this.onLoginSucces.bind(this))
                    .catch(this.onLoginFail.bind(this));
            }); */
    }

    onLoginSucces() {
        this.setState({email: '', password: '', loading: false, error: ''});
        Keyboard.dismiss()
        Actions.Logout();
    }

    onLoginFail(){
        this.setState({ loading: false, error: 'Intentalo otra vez'});  
        Keyboard.dismiss()
    }

    async loginWithFacebook(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync
            ('210427583036372', { permissions: ['public_profile'] })

            if (type == 'success') {
                const credential = firebase.auth.FacebookAuthProvider.credential(token)

                firebase.auth().signInWithCredential(credential).catch((error) => {
                    console.log(error)
                })
                Actions.Logout();
            }
    }

    renderButton(){
        if (this.state.loading){
            return <Spinner size="small" />
        }

        return (
            <View>
            <Button bordered style={styles.boton} onPress={this.onButtonPress.bind(this)}>
                <Text style={{ fontSize: 20, color: 'black' }}> Iniciar Sesion </Text>
            </Button>

            <Button bordered style={styles.boton} onPress={() => Actions.SignIn()}>
                <Text style={{ fontSize: 20, color: 'black' }}> Registrarse </Text>
            </Button>

            <Button bordered style={styles.botonFb} onPress={() => this.loginWithFacebook()}>
                <Text style={{ fontSize: 20, color: 'white' }}> Iniciar Sesion con Facebook </Text>
            </Button>

            </View>
        )
    }

    render(){
        const { contendor, boton , cuadros, error} = styles;
        return(
            <View style={contendor}>
                <View style={{marginTop: '50%'}}>
                <View style={cuadros}>
                <Input
                    secureText={false}
                    placeholder="usuario@gmail.com"
                    label="Email "
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                </View>
                <View style={cuadros}>
                    <Input
                        secureText={true}
                        placeholder="********"
                        label="Contraseña "
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <Text style={error}>
                    {this.state.error}
                </Text>
                <View style={cuadros}>
                    {this.renderButton()}
                </View>

                </View>
            </View>
        );
    }
}

const styles = {
    contendor: {
        backgroundColor: '#CEF6F5',
        height: '100%',
        width: '100%',
    },
    cuadros: {
        marginTop: '1%',
        height: '20%',
        width: '100%',
        borderRadius: 7,
        borderColor: '#071418'
    },
    boton: {
        marginTop: '6%',
        alignSelf: 'center',
        backgroundColor: '#CEF6F5',
        height: '30%',
        width: '65%',
        borderRadius: 10,
        borderColor: '#04B4AE',
        justifyContent: 'center'
    },
    error: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    botonFb: {
        marginTop: '6%',
        alignSelf: 'center',
        backgroundColor: '#4267B2',
        height: '30%',
        width: '65%',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#4267B2',
    }

};