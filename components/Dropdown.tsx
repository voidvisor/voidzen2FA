/**
 * @format
 */

import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { Menu, TextInput, TouchableRipple } from "react-native-paper";
import { TextInputLabelProp } from "react-native-paper/lib/typescript/components/TextInput/types";

interface listItem {
    label: string,
    value: any,
}

interface dropdownProps {
    value: any,
    setValue: Function,
    mode?: 'flat' | 'outlined',
    left?: React.ReactNode,
    disabled?: boolean,
    label?: TextInputLabelProp,
    placeholder?: string,
    error?: boolean,
    underlineColor?: string,
    outlineColor?: string,
    style?: StyleProp<TextStyle>,
    list: Array<listItem>,
}

const Dropdown = (props: dropdownProps) => {
    const {value, setValue, mode, left, disabled, label, placeholder, error, underlineColor, outlineColor, list, style} = props;
    const [menu, setMenu] = React.useState(false);
    const [icon, setIcon] = React.useState('menu-down');
    const [layout, setLayout] = React.useState({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
    })

    const menuOptions = list.map((item) => 
        <Menu.Item key={item.value} title={item.label} onPress={() => {setValue(item.value);setMenu(false);setIcon('menu-down')}} />
    )

    const getLabel = (val) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].value === val) {
                return list[i].label
            }
        }
    }

    return (
        <Menu visible={menu} onDismiss={() => {setMenu(false);setIcon('menu-down')}} anchor={<TouchableRipple rippleColor="transparent" onLayout={(event) => setLayout(event.nativeEvent.layout)} onPress={() => {setMenu(true);setIcon('menu-up')}}>
                <TextInput label={label} mode={mode} value={getLabel(value)} editable={false} left={left} right={<TextInput.Icon name={icon} onPress={() => {setMenu(true);setIcon('menu-up')}} />} disabled={disabled} placeholder={placeholder} error={error} underlineColor={underlineColor} outlineColor={outlineColor} />
            </TouchableRipple>} style={{
                marginTop: layout.height,
                width: layout.width,
                left: layout.x,
                ...style as Object,
            }}>
            {menuOptions}
        </Menu>
    )
}

export default Dropdown;