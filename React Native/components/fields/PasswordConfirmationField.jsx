import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import bookWaterStyles from "../../styles/BookWater";
import TextField from "./TextField";

export default function PasswordConfirmationField(props) {
  const [prevSaveTrigger, setPrevSaveTrigger] = useState(props?.saveTrigger);
  const [runValidations, setRunValidations] = useState(true);
  const [showPrimaryValidation, setShowPrimaryValidation] = useState();
  const [triggeredSave, setTriggeredSave] = useState(false);

  const middleValidation = (e) => {
    if (e?.confirm_password) {
      setShowPrimaryValidation(true);
    } else {
      setShowPrimaryValidation(false);
    }
    props?.setValidStatus(e);
  };

  useEffect(() => {
    if (props?.saveTrigger !== prevSaveTrigger) {
      setPrevSaveTrigger(props?.saveTrigger);
      setTriggeredSave(true);
      setRunValidations(true);
    }
  }, [props?.saveTrigger]);

  useEffect(() => {
    if (runValidations) {
      if (props?.password === props?.confirm_password) {
        props?.setValidStatus((data) => ({
          ...data,
          confirmation_password: true,
        }));
      } else {
        props?.setValidStatus((data) => ({
          ...data,
          confirmation_password: false,
        }));
      }
    }
  }, [props?.password, props?.confirm_password, runValidations]);

  return (
    <View>
      <View style={bookWaterStyles.form_item}>
        <Text style={bookWaterStyles.label}>Password</Text>
        <TextField
          placeholder="Password"
          name="password"
          type="password"
          current_value={props?.password}
          onChange={props?.onChange}
          saveTrigger={props?.saveTrigger} // required
          validStatus={props?.validStatus} // required
          setValidStatus={middleValidation} // required
          min={8}
          required
        />
      </View>

      <View style={bookWaterStyles.form_item}>
        <Text style={bookWaterStyles.label}>Confirm Password</Text>
        <TextField
          placeholder="Confirm Password"
          name="confirm_password"
          type="password"
          current_value={props?.confirm_password}
          onChange={props?.onChange}
          saveTrigger={props?.saveTrigger} // required
          validStatus={props?.validStatus} // required
          setValidStatus={middleValidation} // required
          min={8}
          required
        />
      </View>

      {props?.validStatus?.confirmation_password === false &&
        showPrimaryValidation &&
        triggeredSave && (
          <Text
            style={{
              color: "red",
            }}
          >
            Password & Confirm password are not same
          </Text>
        )}
    </View>
  );
}
