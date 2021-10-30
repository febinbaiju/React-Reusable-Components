import React, { Fragment } from "react";
import { useEffect, useMemo, useState } from "react";
import TextField from "../components/fields/TextField";
import DropDown from "../components/fields/DropDown";
import { Text, View } from "react-native";
import orderDetailStyles from "../styles/OrderDetailStyles";
import bookWaterStyles from "../styles/BookWater";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function useAssignTruck(props) {
  console.log(props?.UserDetailsValue)
  const [validStatus, setValidStatus] = useState();

  const [selectedTruckType, setSelectedTruckType] = useState({});
  const [selectedAgentType, setSelectedAgentType] = useState({});

  useEffect(() => {
    let trucks = [];
    let validity = [];

    for (let i = 0; i < props?.count; i++) {
      trucks.push({
        id: i,
        quantity: props?.value?.[i]?.quantity || "",
        tanker_id: props?.value?.[i]?.tanker_id || null,
        agent_id: props?.value?.[i]?.agent_id || null,
      });
      validity.push({});
    }
    props?.setValue(trucks);
    setValidStatus(validity);
    props?.setValidStatus(validity);
  }, [props?.count]);

  const onChange = (field_name = null, field_value, key) => {
    let trucks = [...props?.value];
    let truckObj = { ...trucks[key] };
    let modified_truckObj = {
      ...truckObj,
      [field_name]: field_value,
    };
    trucks[key] = modified_truckObj;

    if (field_name === "agent_id") {
      setSelectedAgentType((data) => ({
        ...data,
        [key]: field_value,
      }));
    }

    if (field_name === "tanker_id") {
      setSelectedTruckType((data) => ({
        ...data,
        [key]: field_value,
      }));
    }

    props?.setValue(trucks);
  };

  const setMiddleValidStatus = (field_name, key, validated) => {
    if (field_name && key !== undefined) {
      setValidStatus((datas) => ({
        ...datas,
        [key]: {
          ...datas[key],
          [field_name]: validated,
        },
      }));

      props?.setValidStatus((datas) => ({
        ...datas,
        [key]: {
          ...datas[key],
          [field_name]: validated,
        },
      }));
    }
  };

  const removeField = (key) => {
    const trucks = [...props?.value];
    trucks.splice(key, 1);
    props?.setValue(trucks);
    // setValue(trucks);

    const validity = Object.values(validStatus);
    validity.splice(key, 1);
    let newObj = Object.assign({}, validity);
    setValidStatus(newObj);
    props?.setValidStatus(newObj);

    const removeSelectedAgentType = { ...selectedAgentType };
    delete removeSelectedAgentType[key];
    const refreshObj = Object.values(removeSelectedAgentType);
    setSelectedAgentType(Object.assign({}, refreshObj));

    const removeSelectedTruckType = { ...selectedTruckType };
    delete removeSelectedTruckType[key];
    const refreshObj2 = Object.values(removeSelectedTruckType);
    setSelectedTruckType(Object.assign({}, refreshObj2));

    props?.setCount(props?.count - 1);
  };

  const truckLayout = useMemo(() => {
    return props?.value?.map((truckObj, key) => {
      return (
        <Fragment key={key}>
          <View
            style={[
              orderDetailStyles?.cardbody,
              {
                marginTop: 20,
              },
            ]}
          >
            <View style={bookWaterStyles.form_item}>
              <Text style={bookWaterStyles.label}>Assign Truck</Text>
              <DropDown
                index={key}
                name="tanker_id"
                current_value={props?.value?.[key]?.tanker_id}
                placeholder="Select Truck"
                data={props?.trucks?.filter((item) => {
                  let selected = Object.keys(selectedTruckType)
                    .filter((sel_key) => {
                      return sel_key != key;
                    })
                    .map((sel_key) => {
                      return selectedTruckType[sel_key];
                    });
                  return !selected.includes(item?.value);
                })}
                setData={props?.setTrucks}
                onChange={(e) => onChange("tanker_id", e.value, key)}
                saveTrigger={props?.saveTrigger}
                validStatus={validStatus}
                setValidStatus={setMiddleValidStatus}
                required
              />
            </View>

            <View style={bookWaterStyles.form_item}>
              <Text style={bookWaterStyles.label}>Quantity</Text>
              <TextField
                index={key}
                name="quantity"
                type="number"
                max="50"
                current_value={truckObj?.quantity}
                onChange={(e) => onChange("quantity", e.value, key)}
                saveTrigger={props?.saveTrigger}
                validStatus={validStatus}
                setValidStatus={setMiddleValidStatus}
                setValue={props?.setValue}
                required
              />
            </View>
           {props?.UserDetailsValue?.role_id == props?.constants?.USER_ROLES?.AGENT_WITH_TANKER ?
           <View></View>:
            <View style={bookWaterStyles.form_item}>
              <Text style={bookWaterStyles.label}>Agent</Text>
              <DropDown
                index={key}
                name="agent_id"
                current_value={props?.value?.[key]?.agent_id}
                placeholder="Select Agent"
                data={props?.agents?.filter((item) => {
                  let selected = Object.keys(selectedAgentType)
                    .filter((sel_key) => {
                      return sel_key != key;
                    })
                    .map((sel_key) => {
                      return selectedAgentType[sel_key];
                    });
                  return !selected.includes(item?.value);
                })}
                setData={props?.setAgents}
                onChange={(e) => onChange("agent_id", e.value, key)}
                saveTrigger={props?.saveTrigger}
                validStatus={validStatus}
                setValidStatus={setMiddleValidStatus}
                required
              />
            </View>
    }
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <TouchableOpacity onPress={() => removeField(key)}>
                <FontAwesome5
                  name="window-close"
                  color="#ff0e0e"
                  size={16}
                  solid
                />
              </TouchableOpacity>
            </View>
          </View>
        </Fragment>
      );
    });
  }, [props?.value, props?.saveTrigger, props?.agents, props?.trucks]);

  return [truckLayout];
}
