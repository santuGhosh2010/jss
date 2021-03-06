import React from 'react';
import PropTypes from 'prop-types';
import { ComponentFactory } from './sharedTypes';

export interface SitecoreContextProps {
  componentFactory: ComponentFactory;
  context?: any;
}

export interface SitecoreContextState {
  setContext: (value: any) => void;
  context: any;
}

export const SitecoreContextReactContext = React.createContext<SitecoreContextState>({} as SitecoreContextState);
export const ComponentFactoryReactContext = React.createContext<ComponentFactory>({} as ComponentFactory);

export class SitecoreContext extends React.Component<SitecoreContextProps, SitecoreContextState> {
  static propTypes = {
    children: PropTypes.any.isRequired,
    componentFactory: PropTypes.func,
    context: PropTypes.any
  };

  static displayName = 'SitecoreContext';

  constructor(props: SitecoreContextProps) {
    super(props);

    let context: any = {
      pageEditing: false,
    }

    if (props.context) {
      context = props.context;
    }

    if (props.context === null) {
      context = null;
    }

    this.state = {
      context,
      setContext: this.setContext
    };
  }

  setContext = (value: any) => {
    this.setState({
      context: value
    });
  }

  render() {
    return (
      <ComponentFactoryReactContext.Provider value={this.props.componentFactory}>
        <SitecoreContextReactContext.Provider value={this.state}>
          {this.props.children}
        </SitecoreContextReactContext.Provider>
      </ComponentFactoryReactContext.Provider>
    );
  }
}
