import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import FloatingInput from "../../components/common/FloatingInput";
import ArrowButton from "../../components/common/ArrowButton";
import SafeView from "../../components/common/SafeView";
import constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import { push, registerUser } from "../../actions";
import Common from "../../helpers/Common";
import Regex from "../../helpers/Regex";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: ""
    };
  }

  onSignUpPress = () => {
    let { name, email, password } = this.state;
    let { role } = this.props;
    if (!name.length) {
      return Common.Dialog("Please Enter Name");
    }
    if (!email.length) {
      return Common.Dialog("Please Enter Email");
    }
    if (!Regex.validateEmail(email)) {
      return Common.Dialog("Please Enter Valid Email");
    }
    if (!password.length) {
      return Common.Dialog("Please Enter Password");
    }
    if (!Regex.validatePassword(password)) {
      return Common.Dialog(
        "Password must be between 8-15 characters and having minimum 1 special character, 1 upper case latter , 1 lower case latter and 1 numeric value!"
      );
    }
    this.props.registerUser(
      {
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[this.state.name.split(" ").length - 1] || "",
        email,
        password,
        role,
        type: 1
      },
      this.props.componentId
    );
  };

  render() {
    let { email, password, name } = this.state;
    return (
      <SafeView title="Sign Up" componentId={this.props.componentId}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: moderateScale(70)
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.props.push(this.props.componentId, "Login", {
                role: this.props.role
              })
            }
            style={{
              borderBottomColor: constants.Colors.Turquoise,
              borderBottomWidth: 1,
              flex: 0.1,
              justifyContent: "flex-end",
              paddingVertical: moderateScale(5)
            }}
          >
            <Text
              style={{
                color: constants.Colors.Turquoise,
                fontSize: moderateScale(30)
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: constants.Colors.Turquoise,
              flex: 0.1,
              justifyContent: "flex-end",
              paddingVertical: moderateScale(5)
            }}
          >
            <Text
              style={{
                color: constants.Colors.White,
                fontSize: moderateScale(30)
              }}
            >
              Sign up now
            </Text>
          </View>
          <View style={{ flex: 0.4 }}>
            <FloatingInput
              label={"Name"}
              value={name}
              onChangeText={name => this.setState({ name })}
            />
            <FloatingInput
              label={"Email"}
              value={email}
              onChangeText={email => this.setState({ email })}
            />
            <FloatingInput
              label={"Password"}
              value={password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
            <ArrowButton
              name={"Submit"}
              image={constants.Images.ArrowRightWhite}
              onPress={this.onSignUpPress}
            />
          </View>
        </View>
      </SafeView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { push, registerUser }
)(Signup);