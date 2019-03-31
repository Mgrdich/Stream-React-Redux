import * as React from 'react';
import { MaskedInputProps } from 'react-text-mask';
export interface CustomMaskedInputProps extends MaskedInputProps {
    mask?: any;
    inputRef: React.Ref<any>;
}
export default class Input extends React.PureComponent<CustomMaskedInputProps> {
    static propTypes: any;
    static defaultProps: {
        mask: undefined;
    };
    render(): JSX.Element;
}
