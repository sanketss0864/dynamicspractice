import * as React from 'react';
import { IDataProps } from './App';
import { Label } from '@fluentui/react';
import App from './App';
export interface IHelloWorldProps {
  name?: string;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (<>
      <App name={this.props.name}></App>
      {/* <Label>
        {this.props.name}
      </Label> */}
      </>
    )
  }
}
