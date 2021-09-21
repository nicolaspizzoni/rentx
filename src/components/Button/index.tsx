import React from 'react';
import { ActivityIndicator } from 'react-native';
import {useTheme} from 'styled-components';

import {
   Container,
   Title,
} from './styles';

interface Props {
    title: string;
    color?: string;
    onPress: () => void;
    enabled?: boolean;
    loading?: boolean;
}

export function Button({
    title, 
    color, 
    onPress, 
    enabled = true,
    loading = false
}:Props) {

    const theme = useTheme()

   return (
        <Container 
            enabled={enabled}
            onPress={onPress}
            color={color ? color : theme.colors.main}
            style={{ opacity: (enabled === false || loading === true) ? .5 : 1}}
        >
            {
                loading
                ? <ActivityIndicator size={20} color={theme.colors.shape}/>
                : <Title>{title}</Title>
            }
        </Container>
   );
}